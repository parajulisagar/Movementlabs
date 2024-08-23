import { BigNumber } from '@ethersproject/bignumber';
import retry from 'async-retry';
import axios from 'axios';
import { log } from '../util/log';
import { IGasPriceProvider } from './gas-price-provider';
export class ETHGasStationInfoProvider extends IGasPriceProvider {
    constructor(url) {
        super();
        this.url = url;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getGasPrice(_latestBlockNumber, _requestBlockNumber) {
        const response = await retry(async () => {
            return axios.get(this.url);
        }, { retries: 1 });
        const { data: gasPriceResponse, status } = response;
        if (status != 200) {
            log.error({ response }, `Unabled to get gas price from ${this.url}.`);
            throw new Error(`Unable to get gas price from ${this.url}`);
        }
        log.info({ gasPriceResponse }, 'Gas price response from API. About to parse "fast" to big number');
        // Gas prices from ethgasstation are in GweiX10.
        const gasPriceWei = BigNumber.from(gasPriceResponse.fast)
            .div(BigNumber.from(10))
            .mul(BigNumber.from(10).pow(9));
        log.info(`Gas price in wei: ${gasPriceWei} as of block ${gasPriceResponse.blockNum}`);
        return { gasPriceWei: gasPriceWei };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLWdhcy1zdGF0aW9uLWluZm8tZ2FzLXByaWNlLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9ldGgtZ2FzLXN0YXRpb24taW5mby1nYXMtcHJpY2UtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLEtBQUssTUFBTSxPQUFPLENBQUM7QUFFMUIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUVsQyxPQUFPLEVBQVksaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWlCbkUsTUFBTSxPQUFPLHlCQUEwQixTQUFRLGlCQUFpQjtJQUU5RCxZQUFZLEdBQVc7UUFDckIsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQsNkRBQTZEO0lBQzdDLEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQTBCLEVBQUUsbUJBQTRCO1FBQ3hGLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUMxQixLQUFLLElBQUksRUFBRTtZQUNULE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBd0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELENBQUMsRUFDRCxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FDZixDQUFDO1FBRUYsTUFBTSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUM7UUFFcEQsSUFBSSxNQUFNLElBQUksR0FBRyxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxpQ0FBaUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFFdEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxHQUFHLENBQUMsSUFBSSxDQUNOLEVBQUUsZ0JBQWdCLEVBQUUsRUFDcEIsa0VBQWtFLENBQ25FLENBQUM7UUFFRixnREFBZ0Q7UUFDaEQsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7YUFDdEQsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDdkIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsR0FBRyxDQUFDLElBQUksQ0FDTixxQkFBcUIsV0FBVyxnQkFBZ0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQzVFLENBQUM7UUFFRixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRiJ9