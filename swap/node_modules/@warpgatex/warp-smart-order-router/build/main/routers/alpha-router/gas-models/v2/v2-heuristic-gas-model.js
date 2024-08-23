"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V2HeuristicGasModelFactory = exports.COST_PER_EXTRA_HOP = exports.BASE_SWAP_COST = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const lodash_1 = __importDefault(require("lodash"));
const util_1 = require("../../../../util");
const amounts_1 = require("../../../../util/amounts");
const gas_model_1 = require("../gas-model");
// Constant cost for doing any swap regardless of pools.
exports.BASE_SWAP_COST = bignumber_1.BigNumber.from(135000); // 115000, bumped up by 20_000 @eric 7/8/2022
// Constant per extra hop in the route.
exports.COST_PER_EXTRA_HOP = bignumber_1.BigNumber.from(50000); // 20000, bumped up by 30_000 @eric 7/8/2022
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
class V2HeuristicGasModelFactory extends gas_model_1.IV2GasModelFactory {
    constructor() {
        super();
    }
    async buildGasModel({ chainId, gasPriceWei, poolProvider, token, providerConfig, }) {
        if (token.equals(util_1.WRAPPED_NATIVE_CURRENCY[chainId])) {
            const usdPool = await this.getHighestLiquidityUSDPool(chainId, poolProvider, providerConfig);
            return {
                estimateGasCost: (routeWithValidQuote) => {
                    const { gasCostInEth, gasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId, providerConfig);
                    const ethToken0 = usdPool.token0.address == util_1.WRAPPED_NATIVE_CURRENCY[chainId].address;
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
            util_1.log.info('Unable to find ETH pool with the quote token to produce gas adjusted costs. Route will not account for gas.');
        }
        return {
            estimateGasCost: (routeWithValidQuote) => {
                const usdToken = usdPool.token0.address == util_1.WRAPPED_NATIVE_CURRENCY[chainId].address
                    ? usdPool.token1
                    : usdPool.token0;
                const { gasCostInEth, gasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId, Object.assign({}, providerConfig));
                if (!ethPool) {
                    return {
                        gasEstimate: gasUse,
                        gasCostInToken: amounts_1.CurrencyAmount.fromRawAmount(token, 0),
                        gasCostInUSD: amounts_1.CurrencyAmount.fromRawAmount(usdToken, 0),
                    };
                }
                const ethToken0 = ethPool.token0.address == util_1.WRAPPED_NATIVE_CURRENCY[chainId].address;
                const ethTokenPrice = ethToken0
                    ? ethPool.token0Price
                    : ethPool.token1Price;
                let gasCostInTermsOfQuoteToken;
                try {
                    gasCostInTermsOfQuoteToken = ethTokenPrice.quote(gasCostInEth);
                }
                catch (err) {
                    util_1.log.error({
                        ethTokenPriceBase: ethTokenPrice.baseCurrency,
                        ethTokenPriceQuote: ethTokenPrice.quoteCurrency,
                        gasCostInEth: gasCostInEth.currency,
                    }, 'Debug eth price token issue');
                    throw err;
                }
                const ethToken0USDPool = usdPool.token0.address == util_1.WRAPPED_NATIVE_CURRENCY[chainId].address;
                const ethTokenPriceUSDPool = ethToken0USDPool
                    ? usdPool.token0Price
                    : usdPool.token1Price;
                let gasCostInTermsOfUSD;
                try {
                    gasCostInTermsOfUSD = ethTokenPriceUSDPool.quote(gasCostInEth);
                }
                catch (err) {
                    util_1.log.error({
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
        let gasUse = exports.BASE_SWAP_COST.add(exports.COST_PER_EXTRA_HOP.mul(hops - 1));
        if (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.additionalGasOverhead) {
            gasUse = gasUse.add(providerConfig.additionalGasOverhead);
        }
        const totalGasCostWei = gasPriceWei.mul(gasUse);
        const weth = util_1.WRAPPED_NATIVE_CURRENCY[chainId];
        const gasCostInEth = amounts_1.CurrencyAmount.fromRawAmount(weth, totalGasCostWei.toString());
        return { gasCostInEth, gasUse };
    }
    async getEthPool(chainId, token, poolProvider, providerConfig) {
        const weth = util_1.WRAPPED_NATIVE_CURRENCY[chainId];
        const poolAccessor = await poolProvider.getPools([[weth, token]], providerConfig);
        const pool = poolAccessor.getPool(weth, token);
        if (!pool || pool.reserve0.equalTo(0) || pool.reserve1.equalTo(0)) {
            util_1.log.error({
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
        const usdTokens = gas_model_1.usdGasTokensByChain[chainId];
        if (!usdTokens) {
            throw new Error(`Could not find a USD token for computing gas costs on ${chainId}`);
        }
        const usdPools = lodash_1.default.map(usdTokens, (usdToken) => [
            usdToken,
            util_1.WRAPPED_NATIVE_CURRENCY[chainId],
        ]);
        const poolAccessor = await poolProvider.getPools(usdPools, providerConfig);
        const poolsRaw = poolAccessor.getAllPools();
        const pools = lodash_1.default.filter(poolsRaw, (pool) => pool.reserve0.greaterThan(0) && pool.reserve1.greaterThan(0));
        if (pools.length == 0) {
            util_1.log.error({ pools }, `Could not find a USD/WETH pool for computing gas costs.`);
            throw new Error(`Can't find USD/WETH pool for computing gas costs.`);
        }
        const maxPool = lodash_1.default.maxBy(pools, (pool) => {
            if (pool.token0.equals(util_1.WRAPPED_NATIVE_CURRENCY[chainId])) {
                return parseFloat(pool.reserve0.toSignificant(2));
            }
            else {
                return parseFloat(pool.reserve1.toSignificant(2));
            }
        });
        return maxPool;
    }
}
exports.V2HeuristicGasModelFactory = V2HeuristicGasModelFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidjItaGV1cmlzdGljLWdhcy1tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yb3V0ZXJzL2FscGhhLXJvdXRlci9nYXMtbW9kZWxzL3YyL3YyLWhldXJpc3RpYy1nYXMtbW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQXFEO0FBR3JELG9EQUF1QjtBQUl2QiwyQ0FBZ0U7QUFDaEUsc0RBQTBEO0FBRTFELDRDQUtzQjtBQUV0Qix3REFBd0Q7QUFDM0MsUUFBQSxjQUFjLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw2Q0FBNkM7QUFFbkcsdUNBQXVDO0FBQzFCLFFBQUEsa0JBQWtCLEdBQUcscUJBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyw0Q0FBNEM7QUFFckc7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxNQUFhLDBCQUEyQixTQUFRLDhCQUFrQjtJQUNoRTtRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFDekIsT0FBTyxFQUNQLFdBQVcsRUFDWCxZQUFZLEVBQ1osS0FBSyxFQUNMLGNBQWMsR0FDYTtRQUMzQixJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsOEJBQXVCLENBQUMsT0FBTyxDQUFFLENBQUMsRUFBRTtZQUNuRCxNQUFNLE9BQU8sR0FBUyxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FDekQsT0FBTyxFQUNQLFlBQVksRUFDWixjQUFjLENBQ2YsQ0FBQztZQUVGLE9BQU87Z0JBQ0wsZUFBZSxFQUFFLENBQUMsbUJBQTBDLEVBQUUsRUFBRTtvQkFDOUQsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUMvQyxtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLE9BQU8sRUFDUCxjQUFjLENBQ2YsQ0FBQztvQkFFRixNQUFNLFNBQVMsR0FDYixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSw4QkFBdUIsQ0FBQyxPQUFPLENBQUUsQ0FBQyxPQUFPLENBQUM7b0JBRXRFLE1BQU0sYUFBYSxHQUFHLFNBQVM7d0JBQzdCLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVzt3QkFDckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7b0JBRXhCLE1BQU0sbUJBQW1CLEdBQW1CLGFBQWEsQ0FBQyxLQUFLLENBQzdELFlBQVksQ0FDSyxDQUFDO29CQUVwQixPQUFPO3dCQUNMLFdBQVcsRUFBRSxNQUFNO3dCQUNuQixjQUFjLEVBQUUsWUFBWTt3QkFDNUIsWUFBWSxFQUFFLG1CQUFtQjtxQkFDbEMsQ0FBQztnQkFDSixDQUFDO2FBQ0YsQ0FBQztTQUNIO1FBRUQsNkZBQTZGO1FBQzdGLGdFQUFnRTtRQUNoRSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUNwQyxPQUFPLEVBQ1AsS0FBSyxFQUNMLFlBQVksRUFDWixjQUFjLENBQ2YsQ0FBQztRQUVGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FDcEQsT0FBTyxFQUNQLFlBQVksRUFDWixjQUFjLENBQ2YsQ0FBQztRQUVGLE1BQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzNDLGNBQWM7WUFDZCxjQUFjO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLFVBQUcsQ0FBQyxJQUFJLENBQ04sNkdBQTZHLENBQzlHLENBQUM7U0FDSDtRQUVELE9BQU87WUFDTCxlQUFlLEVBQUUsQ0FBQyxtQkFBMEMsRUFBRSxFQUFFO2dCQUM5RCxNQUFNLFFBQVEsR0FDWixPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSw4QkFBdUIsQ0FBQyxPQUFPLENBQUUsQ0FBQyxPQUFPO29CQUNqRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU07b0JBQ2hCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUVyQixNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQy9DLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gsT0FBTyxvQkFFRixjQUFjLEVBRXBCLENBQUM7Z0JBRUYsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDWixPQUFPO3dCQUNMLFdBQVcsRUFBRSxNQUFNO3dCQUNuQixjQUFjLEVBQUUsd0JBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzt3QkFDdEQsWUFBWSxFQUFFLHdCQUFjLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7cUJBQ3hELENBQUM7aUJBQ0g7Z0JBRUQsTUFBTSxTQUFTLEdBQ2IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksOEJBQXVCLENBQUMsT0FBTyxDQUFFLENBQUMsT0FBTyxDQUFDO2dCQUV0RSxNQUFNLGFBQWEsR0FBRyxTQUFTO29CQUM3QixDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVc7b0JBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUV4QixJQUFJLDBCQUEwQyxDQUFDO2dCQUMvQyxJQUFJO29CQUNGLDBCQUEwQixHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQzlDLFlBQVksQ0FDSyxDQUFDO2lCQUNyQjtnQkFBQyxPQUFPLEdBQUcsRUFBRTtvQkFDWixVQUFHLENBQUMsS0FBSyxDQUNQO3dCQUNFLGlCQUFpQixFQUFFLGFBQWEsQ0FBQyxZQUFZO3dCQUM3QyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsYUFBYTt3QkFDL0MsWUFBWSxFQUFFLFlBQVksQ0FBQyxRQUFRO3FCQUNwQyxFQUNELDZCQUE2QixDQUM5QixDQUFDO29CQUNGLE1BQU0sR0FBRyxDQUFDO2lCQUNYO2dCQUVELE1BQU0sZ0JBQWdCLEdBQ3BCLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLDhCQUF1QixDQUFDLE9BQU8sQ0FBRSxDQUFDLE9BQU8sQ0FBQztnQkFFdEUsTUFBTSxvQkFBb0IsR0FBRyxnQkFBZ0I7b0JBQzNDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVztvQkFDckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBRXhCLElBQUksbUJBQW1DLENBQUM7Z0JBQ3hDLElBQUk7b0JBQ0YsbUJBQW1CLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUM5QyxZQUFZLENBQ0ssQ0FBQztpQkFDckI7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osVUFBRyxDQUFDLEtBQUssQ0FDUDt3QkFDRSxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO3dCQUM1QixLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNO3dCQUM1QixpQkFBaUIsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU07cUJBQ2hELEVBQ0QsaUNBQWlDLENBQ2xDLENBQUM7b0JBQ0YsTUFBTSxHQUFHLENBQUM7aUJBQ1g7Z0JBRUQsT0FBTztvQkFDTCxXQUFXLEVBQUUsTUFBTTtvQkFDbkIsY0FBYyxFQUFFLDBCQUEwQjtvQkFDMUMsWUFBWSxFQUFFLG1CQUFvQjtpQkFDbkMsQ0FBQztZQUNKLENBQUM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLFdBQVcsQ0FDakIsbUJBQTBDLEVBQzFDLFdBQXNCLEVBQ3RCLE9BQWdCLEVBQ2hCLGNBQStCO1FBRS9CLE1BQU0sSUFBSSxHQUFHLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3BELElBQUksTUFBTSxHQUFHLHNCQUFjLENBQUMsR0FBRyxDQUFDLDBCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRSxJQUFJLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxxQkFBcUIsRUFBRTtZQUN6QyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMscUJBQXFCLENBQUMsQ0FBQztTQUMzRDtRQUVELE1BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEQsTUFBTSxJQUFJLEdBQUcsOEJBQXVCLENBQUMsT0FBTyxDQUFFLENBQUM7UUFFL0MsTUFBTSxZQUFZLEdBQUcsd0JBQWMsQ0FBQyxhQUFhLENBQy9DLElBQUksRUFDSixlQUFlLENBQUMsUUFBUSxFQUFFLENBQzNCLENBQUM7UUFFRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFTyxLQUFLLENBQUMsVUFBVSxDQUN0QixPQUFnQixFQUNoQixLQUFZLEVBQ1osWUFBNkIsRUFDN0IsY0FBK0I7UUFFL0IsTUFBTSxJQUFJLEdBQUcsOEJBQXVCLENBQUMsT0FBTyxDQUFFLENBQUM7UUFFL0MsTUFBTSxZQUFZLEdBQUcsTUFBTSxZQUFZLENBQUMsUUFBUSxDQUM5QyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQ2YsY0FBYyxDQUNmLENBQUM7UUFDRixNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUvQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pFLFVBQUcsQ0FBQyxLQUFLLENBQ1A7Z0JBQ0UsSUFBSTtnQkFDSixLQUFLO2dCQUNMLFFBQVEsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDbEMsUUFBUSxFQUFFLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUMsT0FBTyxFQUFFO2FBQ25DLEVBQ0QseUNBQXlDLEtBQUssQ0FBQyxNQUFNLDJCQUEyQixDQUNqRixDQUFDO1lBRUYsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVPLEtBQUssQ0FBQywwQkFBMEIsQ0FDdEMsT0FBZ0IsRUFDaEIsWUFBNkIsRUFDN0IsY0FBK0I7UUFFL0IsTUFBTSxTQUFTLEdBQUcsK0JBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQ2IseURBQXlELE9BQU8sRUFBRSxDQUNuRSxDQUFDO1NBQ0g7UUFFRCxNQUFNLFFBQVEsR0FBRyxnQkFBQyxDQUFDLEdBQUcsQ0FBd0IsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztZQUNyRSxRQUFRO1lBQ1IsOEJBQXVCLENBQUMsT0FBTyxDQUFFO1NBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLE1BQU0sWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDM0UsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVDLE1BQU0sS0FBSyxHQUFHLGdCQUFDLENBQUMsTUFBTSxDQUNwQixRQUFRLEVBQ1IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUN2RSxDQUFDO1FBRUYsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNyQixVQUFHLENBQUMsS0FBSyxDQUNQLEVBQUUsS0FBSyxFQUFFLEVBQ1QseURBQXlELENBQzFELENBQUM7WUFDRixNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7U0FDdEU7UUFFRCxNQUFNLE9BQU8sR0FBRyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLDhCQUF1QixDQUFDLE9BQU8sQ0FBRSxDQUFDLEVBQUU7Z0JBQ3pELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7aUJBQU07Z0JBQ0wsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUMsQ0FBUyxDQUFDO1FBRVgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBN1BELGdFQTZQQyJ9