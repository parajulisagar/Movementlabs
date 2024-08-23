import { log } from '../util/log';
import { IGasPriceProvider } from './gas-price-provider';
/**
 * Provider for getting gas price, with functionality for caching the results.
 *
 * @export
 * @class CachingV3SubgraphProvider
 */
export class CachingGasStationProvider extends IGasPriceProvider {
    /**
     * Creates an instance of CachingGasStationProvider.
     * @param chainId The chain id to use.
     * @param gasPriceProvider The provider to use to get the gas price when not in the cache.
     * @param cache Cache instance to hold cached pools.
     */
    constructor(chainId, gasPriceProvider, cache) {
        super();
        this.chainId = chainId;
        this.gasPriceProvider = gasPriceProvider;
        this.cache = cache;
        this.GAS_KEY = (chainId, blockNumber) => `gasPrice-${chainId}-${blockNumber}`;
    }
    async getGasPrice(latestBlockNumber, requestBlockNumber) {
        // If block number is specified in the request, we have to use that block number find any potential cache hits.
        // Otherwise, we can use the latest block number.
        const targetBlockNumber = requestBlockNumber !== null && requestBlockNumber !== void 0 ? requestBlockNumber : latestBlockNumber;
        const cachedGasPrice = await this.cache.get(this.GAS_KEY(this.chainId, targetBlockNumber));
        if (cachedGasPrice) {
            log.info({ cachedGasPrice }, `Got gas station price from local cache: ${cachedGasPrice.gasPriceWei}.`);
            return cachedGasPrice;
        }
        const gasPrice = await this.gasPriceProvider.getGasPrice(latestBlockNumber, requestBlockNumber);
        await this.cache.set(this.GAS_KEY(this.chainId, targetBlockNumber), gasPrice);
        return gasPrice;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGluZy1nYXMtcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcHJvdmlkZXJzL2NhY2hpbmctZ2FzLXByb3ZpZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHbEMsT0FBTyxFQUFZLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbkU7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsaUJBQWlCO0lBRzlEOzs7OztPQUtHO0lBQ0gsWUFDWSxPQUFnQixFQUNsQixnQkFBbUMsRUFDbkMsS0FBdUI7UUFFL0IsS0FBSyxFQUFFLENBQUM7UUFKRSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2xCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBbUI7UUFDbkMsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFYekIsWUFBTyxHQUFHLENBQUMsT0FBZ0IsRUFBRSxXQUFtQixFQUFFLEVBQUUsQ0FBQyxZQUFZLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztJQWNsRyxDQUFDO0lBRWUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBeUIsRUFBRSxrQkFBMkI7UUFDdEYsK0dBQStHO1FBQy9HLGlEQUFpRDtRQUNqRCxNQUFNLGlCQUFpQixHQUFHLGtCQUFrQixhQUFsQixrQkFBa0IsY0FBbEIsa0JBQWtCLEdBQUksaUJBQWlCLENBQUM7UUFDbEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1FBRTNGLElBQUksY0FBYyxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQ04sRUFBRSxjQUFjLEVBQUUsRUFDbEIsMkNBQTJDLGNBQWMsQ0FBQyxXQUFXLEdBQUcsQ0FDekUsQ0FBQztZQUVGLE9BQU8sY0FBYyxDQUFDO1NBQ3ZCO1FBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDaEcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU5RSxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0YifQ==