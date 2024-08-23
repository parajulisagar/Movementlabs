import { BigNumber } from '@ethersproject/bignumber';
import _ from 'lodash';
import { log, WRAPPED_NATIVE_CURRENCY } from '../../../../util';
import { CurrencyAmount } from '../../../../util/amounts';
import { IV2GasModelFactory, usdGasTokensByChain, } from '../gas-model';
// Constant cost for doing any swap regardless of pools.
export const BASE_SWAP_COST = BigNumber.from(135000); // 115000, bumped up by 20_000 @eric 7/8/2022
// Constant per extra hop in the route.
export const COST_PER_EXTRA_HOP = BigNumber.from(50000); // 20000, bumped up by 30_000 @eric 7/8/2022
/**
 * Computes a gas estimate for a V2 swap using heuristics.
 * Considers number of hops in the route and the typical base cost for a swap.
 *
 * We compute gas estimates off-chain because
 *  1/ Calling eth_estimateGas for a swaps requires the caller to have
 *     the full balance token being swapped, and approvals.
 *  2/ Tracking gas used using a wrapper contract is not accurate with Multicall
 *     due to EIP-2929. We would have to make a request for every swap we wanted to estimate.
 *  3/ For V2 we simulate all our swaps off-chain so have no way to track gas used.
 *
 * Note, certain tokens e.g. rebasing/fee-on-transfer, may incur higher gas costs than
 * what we estimate here. This is because they run extra logic on token transfer.
 *
 * @export
 * @class V2HeuristicGasModelFactory
 */
export class V2HeuristicGasModelFactory extends IV2GasModelFactory {
    constructor() {
        super();
    }
    async buildGasModel({ chainId, gasPriceWei, poolProvider, token, providerConfig, }) {
        if (token.equals(WRAPPED_NATIVE_CURRENCY[chainId])) {
            const usdPool = await this.getHighestLiquidityUSDPool(chainId, poolProvider, providerConfig);
            return {
                estimateGasCost: (routeWithValidQuote) => {
                    const { gasCostInEth, gasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId, providerConfig);
                    const ethToken0 = usdPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address;
                    const ethTokenPrice = ethToken0
                        ? usdPool.token0Price
                        : usdPool.token1Price;
                    const gasCostInTermsOfUSD = ethTokenPrice.quote(gasCostInEth);
                    return {
                        gasEstimate: gasUse,
                        gasCostInToken: gasCostInEth,
                        gasCostInUSD: gasCostInTermsOfUSD,
                    };
                },
            };
        }
        // If the quote token is not WETH, we convert the gas cost to be in terms of the quote token.
        // We do this by getting the highest liquidity <token>/ETH pool.
        const ethPoolPromise = this.getEthPool(chainId, token, poolProvider, providerConfig);
        const usdPoolPromise = this.getHighestLiquidityUSDPool(chainId, poolProvider, providerConfig);
        const [ethPool, usdPool] = await Promise.all([
            ethPoolPromise,
            usdPoolPromise,
        ]);
        if (!ethPool) {
            log.info('Unable to find ETH pool with the quote token to produce gas adjusted costs. Route will not account for gas.');
        }
        return {
            estimateGasCost: (routeWithValidQuote) => {
                const usdToken = usdPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address
                    ? usdPool.token1
                    : usdPool.token0;
                const { gasCostInEth, gasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId, {
                    ...providerConfig,
                });
                if (!ethPool) {
                    return {
                        gasEstimate: gasUse,
                        gasCostInToken: CurrencyAmount.fromRawAmount(token, 0),
                        gasCostInUSD: CurrencyAmount.fromRawAmount(usdToken, 0),
                    };
                }
                const ethToken0 = ethPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address;
                const ethTokenPrice = ethToken0
                    ? ethPool.token0Price
                    : ethPool.token1Price;
                let gasCostInTermsOfQuoteToken;
                try {
                    gasCostInTermsOfQuoteToken = ethTokenPrice.quote(gasCostInEth);
                }
                catch (err) {
                    log.error({
                        ethTokenPriceBase: ethTokenPrice.baseCurrency,
                        ethTokenPriceQuote: ethTokenPrice.quoteCurrency,
                        gasCostInEth: gasCostInEth.currency,
                    }, 'Debug eth price token issue');
                    throw err;
                }
                const ethToken0USDPool = usdPool.token0.address == WRAPPED_NATIVE_CURRENCY[chainId].address;
                const ethTokenPriceUSDPool = ethToken0USDPool
                    ? usdPool.token0Price
                    : usdPool.token1Price;
                let gasCostInTermsOfUSD;
                try {
                    gasCostInTermsOfUSD = ethTokenPriceUSDPool.quote(gasCostInEth);
                }
                catch (err) {
                    log.error({
                        usdT1: usdPool.token0.symbol,
                        usdT2: usdPool.token1.symbol,
                        gasCostInEthToken: gasCostInEth.currency.symbol,
                    }, 'Failed to compute USD gas price');
                    throw err;
                }
                return {
                    gasEstimate: gasUse,
                    gasCostInToken: gasCostInTermsOfQuoteToken,
                    gasCostInUSD: gasCostInTermsOfUSD,
                };
            },
        };
    }
    estimateGas(routeWithValidQuote, gasPriceWei, chainId, providerConfig) {
        const hops = routeWithValidQuote.route.pairs.length;
        let gasUse = BASE_SWAP_COST.add(COST_PER_EXTRA_HOP.mul(hops - 1));
        if (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.additionalGasOverhead) {
            gasUse = gasUse.add(providerConfig.additionalGasOverhead);
        }
        const totalGasCostWei = gasPriceWei.mul(gasUse);
        const weth = WRAPPED_NATIVE_CURRENCY[chainId];
        const gasCostInEth = CurrencyAmount.fromRawAmount(weth, totalGasCostWei.toString());
        return { gasCostInEth, gasUse };
    }
    async getEthPool(chainId, token, poolProvider, providerConfig) {
        const weth = WRAPPED_NATIVE_CURRENCY[chainId];
        const poolAccessor = await poolProvider.getPools([[weth, token]], providerConfig);
        const pool = poolAccessor.getPool(weth, token);
        if (!pool || pool.reserve0.equalTo(0) || pool.reserve1.equalTo(0)) {
            log.error({
                weth,
                token,
                reserve0: pool === null || pool === void 0 ? void 0 : pool.reserve0.toExact(),
                reserve1: pool === null || pool === void 0 ? void 0 : pool.reserve1.toExact(),
            }, `Could not find a valid WETH pool with ${token.symbol} for computing gas costs.`);
            return null;
        }
        return pool;
    }
    async getHighestLiquidityUSDPool(chainId, poolProvider, providerConfig) {
        const usdTokens = usdGasTokensByChain[chainId];
        if (!usdTokens) {
            throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
        }
        const usdPools = _.map(usdTokens, (usdToken) => [
            usdToken,
            WRAPPED_NATIVE_CURRENCY[chainId],
        ]);
        const poolAccessor = await poolProvider.getPools(usdPools, providerConfig);
        const poolsRaw = poolAccessor.getAllPools();
        const pools = _.filter(poolsRaw, (pool) => pool.reserve0.greaterThan(0) && pool.reserve1.greaterThan(0));
        if (pools.length == 0) {
            log.error({ pools }, `Could not find a USD/WETH pool for computing gas costs.`);
            throw new Error(`Can't find USD/WETH pool for computing gas costs.`);
        }
        const maxPool = _.maxBy(pools, (pool) => {
            if (pool.token0.equals(WRAPPED_NATIVE_CURRENCY[chainId])) {
                return parseFloat(pool.reserve0.toSignificant(2));
            }
            else {
                return parseFloat(pool.reserve1.toSignificant(2));
            }
        });
        return maxPool;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjItaGV1cmlzdGljLWdhcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2FscGhhLXJvdXRlci9nYXMtbW9kZWxzL3YyL3YyLWhldXJpc3RpYy1nYXMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBR3JELE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUl2QixPQUFPLEVBQUUsR0FBRyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTFELE9BQU8sRUFHTCxrQkFBa0IsRUFDbEIsbUJBQW1CLEdBQ3BCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLHdEQUF3RDtBQUN4RCxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLDZDQUE2QztBQUVuRyx1Q0FBdUM7QUFDdkMsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLDRDQUE0QztBQUVyRzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxrQkFBa0I7SUFDaEU7UUFDRSxLQUFLLEVBQUUsQ0FBQztJQUNWLENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQ3pCLE9BQU8sRUFDUCxXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFDTCxjQUFjLEdBQ2E7UUFDM0IsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sQ0FBRSxDQUFDLEVBQUU7WUFDbkQsTUFBTSxPQUFPLEdBQVMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLENBQ3pELE9BQU8sRUFDUCxZQUFZ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