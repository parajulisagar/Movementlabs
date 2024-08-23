import _ from 'lodash';
import { metric, MetricLoggerUnit } from '../../util';
import { log } from '../../util/log';
/**
 * Provider for getting V3 pools, with functionality for caching the results.
 * Does not cache by block because we compute quotes using the on-chain quoter
 * so do not mind if the liquidity values are out of date.
 *
 * @export
 * @class CachingV3PoolProvider
 */
export class CachingV3PoolProvider {
    /**
     * Creates an instance of CachingV3PoolProvider.
     * @param chainId The chain id to use.
     * @param poolProvider The provider to use to get the pools when not in the cache.
     * @param cache Cache instance to hold cached pools.
     */
    constructor(chainId, poolProvider, cache) {
        this.chainId = chainId;
        this.poolProvider = poolProvider;
        this.cache = cache;
        this.POOL_KEY = (chainId, address, blockNumber) => blockNumber ? `pool-${chainId}-${address}-${blockNumber}` : `pool-${chainId}-${address}`;
    }
    async getPools(tokenPairs, providerConfig) {
        const poolAddressSet = new Set();
        const poolsToGetTokenPairs = [];
        const poolsToGetAddresses = [];
        const poolAddressToPool = {};
        const blockNumber = await (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber);
        for (const [tokenA, tokenB, feeAmount] of tokenPairs) {
            const { poolAddress, token0, token1 } = this.getPoolAddress(tokenA, tokenB, feeAmount);
            if (poolAddressSet.has(poolAddress)) {
                continue;
            }
            poolAddressSet.add(poolAddress);
            const cachedPool = await this.cache.get(this.POOL_KEY(this.chainId, poolAddress, blockNumber));
            if (cachedPool) {
                metric.putMetric('V3_INMEMORY_CACHING_POOL_HIT_IN_MEMORY', 1, MetricLoggerUnit.None);
                poolAddressToPool[poolAddress] = cachedPool;
                continue;
            }
            metric.putMetric('V3_INMEMORY_CACHING_POOL_MISS_NOT_IN_MEMORY', 1, MetricLoggerUnit.None);
            poolsToGetTokenPairs.push([token0, token1, feeAmount]);
            poolsToGetAddresses.push(poolAddress);
        }
        log.info({
            poolsFound: _.map(Object.values(poolAddressToPool), (p) => `${p.token0.symbol} ${p.token1.symbol} ${p.fee}`),
            poolsToGetTokenPairs: _.map(poolsToGetTokenPairs, (t) => `${t[0].symbol} ${t[1].symbol} ${t[2]}`),
        }, `Found ${Object.keys(poolAddressToPool).length} V3 pools already in local cache. About to get liquidity and slot0s for ${poolsToGetTokenPairs.length} pools.`);
        if (poolsToGetAddresses.length > 0) {
            const poolAccessor = await this.poolProvider.getPools(poolsToGetTokenPairs, providerConfig);
            for (const address of poolsToGetAddresses) {
                const pool = poolAccessor.getPoolByAddress(address);
                if (pool) {
                    poolAddressToPool[address] = pool;
                    // We don't want to wait for this caching to complete before returning the pools.
                    this.cache.set(this.POOL_KEY(this.chainId, address, blockNumber), pool);
                }
            }
        }
        return {
            getPool: (tokenA, tokenB, feeAmount) => {
                const { poolAddress } = this.getPoolAddress(tokenA, tokenB, feeAmount);
                return poolAddressToPool[poolAddress];
            },
            getPoolByAddress: (address) => poolAddressToPool[address],
            getAllPools: () => Object.values(poolAddressToPool),
        };
    }
    getPoolAddress(tokenA, tokenB, feeAmount) {
        return this.poolProvider.getPoolAddress(tokenA, tokenB, feeAmount);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy1wb29sLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy92My9jYWNoaW5nLXBvb2wtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXJDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8scUJBQXFCO0lBSWhDOzs7OztPQUtHO0lBQ0gsWUFDWSxPQUFnQixFQUNoQixZQUE2QixFQUMvQixLQUFtQjtRQUZqQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFpQjtRQUMvQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBWnJCLGFBQVEsR0FBRyxDQUFDLE9BQWdCLEVBQUUsT0FBZSxFQUFFLFdBQW9CLEVBQUUsRUFBRSxDQUM3RSxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsT0FBTyxJQUFJLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxPQUFPLElBQUksT0FBTyxFQUFFLENBQUM7SUFZeEYsQ0FBQztJQUVHLEtBQUssQ0FBQyxRQUFRLENBQ25CLFVBQXVDLEVBQ3ZDLGNBQStCO1FBRS9CLE1BQU0sY0FBYyxHQUFnQixJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ3RELE1BQU0sb0JBQW9CLEdBQXFDLEVBQUUsQ0FBQztRQUNsRSxNQUFNLG1CQUFtQixHQUFhLEVBQUUsQ0FBQztRQUN6QyxNQUFNLGlCQUFpQixHQUFvQyxFQUFFLENBQUM7UUFDOUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFBLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRSxXQUFXLENBQUEsQ0FBQTtRQUVyRCxL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