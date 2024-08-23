"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP1559GasPriceProvider = void 0;
const bignumber_1 = require("@ethersproject/bignumber");
const lodash_1 = __importDefault(require("lodash"));
const log_1 = require("../util/log");
const gas_price_provider_1 = require("./gas-price-provider");
// We get the Xth percentile of priority fees for transactions successfully included in previous blocks.
const DEFAULT_PRIORITY_FEE_PERCENTILE = 50;
// Infura docs say only past 4 blocks guaranteed to be available: https://infura.io/docs/ethereum#operation/eth_feeHistory
const DEFAULT_BLOCKS_TO_LOOK_BACK = 4;
/**
 * Computes a gas estimate using on-chain data from the eth_feeHistory RPC endpoint.
 *
 * Takes the average priority fee from the past `blocksToConsider` blocks, and adds it
 * to the current base fee.
 *
 * @export
 * @class EIP1559GasPriceProvider
 */
class EIP1559GasPriceProvider extends gas_price_provider_1.IGasPriceProvider {
    constructor(provider, priorityFeePercentile = DEFAULT_PRIORITY_FEE_PERCENTILE, blocksToConsider = DEFAULT_BLOCKS_TO_LOOK_BACK) {
        super();
        this.provider = provider;
        this.priorityFeePercentile = priorityFeePercentile;
        this.blocksToConsider = blocksToConsider;
    }
    async getGasPrice(_latestBlockNumber, requestBlockNumber) {
        const feeHistoryRaw = (await this.provider.send('eth_feeHistory', [
            /**
             * @fix Use BigNumber.from(this.blocksToConsider).toHexString() after hardhat adds support
             * @see https://github.com/NomicFoundation/hardhat/issues/1585 .___.
             */
            bignumber_1.BigNumber.from(this.blocksToConsider).toHexString().replace('0x0', '0x'),
            // If the block number is not specified, we have to send hardcoded 'latest' to infura RPC
            // because Infura node pool is eventually consistent and may not have the latest block from our block number.
            // See https://uniswapteam.slack.com/archives/C023A7JDTJP/p1702485038251449?thread_ts=1702471203.519869&cid=C023A7JDTJP
            requestBlockNumber ? bignumber_1.BigNumber.from(requestBlockNumber).toHexString().replace('0x0', '0x') : 'latest',
            [this.priorityFeePercentile],
        ]));
        const feeHistory = {
            baseFeePerGas: lodash_1.default.map(feeHistoryRaw.baseFeePerGas, (b) => bignumber_1.BigNumber.from(b)),
            gasUsedRatio: feeHistoryRaw.gasUsedRatio,
            oldestBlock: bignumber_1.BigNumber.from(feeHistoryRaw.oldestBlock),
            reward: lodash_1.default.map(feeHistoryRaw.reward, (b) => bignumber_1.BigNumber.from(b[0])),
        };
        const nextBlockBaseFeePerGas = feeHistory.baseFeePerGas[feeHistory.baseFeePerGas.length - 1];
        const averagePriorityFeePerGas = lodash_1.default.reduce(feeHistory.reward, (sum, cur) => sum.add(cur), bignumber_1.BigNumber.from(0)).div(feeHistory.reward.length);
        log_1.log.info({
            feeHistory,
            feeHistoryReadable: {
                baseFeePerGas: lodash_1.default.map(feeHistory.baseFeePerGas, (f) => f.toString()),
                oldestBlock: feeHistory.oldestBlock.toString(),
                reward: lodash_1.default.map(feeHistory.reward, (r) => r.toString()),
            },
            nextBlockBaseFeePerGas: nextBlockBaseFeePerGas.toString(),
            averagePriorityFeePerGas: averagePriorityFeePerGas.toString(),
        }, 'Got fee history from provider and computed gas estimate');
        const gasPriceWei = nextBlockBaseFeePerGas.add(averagePriorityFeePerGas);
        const blockNumber = feeHistory.oldestBlock.add(this.blocksToConsider);
        log_1.log.info(`Estimated gas price in wei: ${gasPriceWei} as of block ${blockNumber.toString()}`);
        return { gasPriceWei: gasPriceWei };
    }
}
exports.EIP1559GasPriceProvider = EIP1559GasPriceProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWlwLTE1NTktZ2FzLXByaWNlLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9laXAtMTU1OS1nYXMtcHJpY2UtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQXFEO0FBRXJELG9EQUF1QjtBQUV2QixxQ0FBa0M7QUFFbEMsNkRBQW1FO0FBZ0JuRSx3R0FBd0c7QUFDeEcsTUFBTSwrQkFBK0IsR0FBRyxFQUFFLENBQUM7QUFDM0MsMEhBQTBIO0FBQzFILE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0FBRXRDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBYSx1QkFBd0IsU0FBUSxzQ0FBaUI7SUFDNUQsWUFDWSxRQUF5QixFQUMzQix3QkFBZ0MsK0JBQStCLEVBQy9ELG1CQUEyQiwyQkFBMkI7UUFFOUQsS0FBSyxFQUFFLENBQUM7UUFKRSxhQUFRLEdBQVIsUUFBUSxDQUFpQjtRQUMzQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQTBDO1FBQy9ELHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBc0M7SUFHaEUsQ0FBQztJQUVlLEtBQUssQ0FBQyxXQUFXLENBQUMsa0JBQTBCLEVBQUUsa0JBQTJCO1FBQ3ZGLE1BQU0sYUFBYSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUNoRTs7O2VBR0c7WUFDSCxxQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztZQUN4RSx5RkFBeUY7WUFDekYsNkdBQTZHO1lBQzdHLHVIQUF1SDtZQUN2SCxrQkFBa0IsQ0FBQyxDQUFDLENBQUMscUJBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRO1lBQ3JHLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQzdCLENBQUMsQ0FBMEIsQ0FBQztRQUU3QixNQUFNLFVBQVUsR0FBdUI7WUFDckMsYUFBYSxFQUFFLGdCQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUN0RCxxQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDbEI7WUFDRCxZQUFZLEVBQUUsYUFBYSxDQUFDLFlBQVk7WUFDeEMsV0FBVyxFQUFFLHFCQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDdEQsTUFBTSxFQUFFLGdCQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLHFCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFLENBQUM7UUFFRixNQUFNLHNCQUFzQixHQUMxQixVQUFVLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBRSxDQUFDO1FBRWpFLE1BQU0sd0JBQXdCLEdBQUcsZ0JBQUMsQ0FBQyxNQUFNLENBQ3ZDLFVBQVUsQ0FBQyxNQUFNLEVBQ2pCLENBQUMsR0FBYyxFQUFFLEdBQWMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDaEQscUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2xCLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEMsU0FBRyxDQUFDLElBQUksQ0FDTjtZQUNFLFVBQVU7WUFDVixrQkFBa0IsRUFBRTtnQkFDbEIsYUFBYSxFQUFFLGdCQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDbkUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUM5QyxNQUFNLEVBQUUsZ0JBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3REO1lBQ0Qsc0JBQXNCLEVBQUUsc0JBQXNCLENBQUMsUUFBUSxFQUFFO1lBQ3pELHdCQUF3QixFQUFFLHdCQUF3QixDQUFDLFFBQVEsRUFBRTtTQUM5RCxFQUNELHlEQUF5RCxDQUMxRCxDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFFekUsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFdEUsU0FBRyxDQUFDLElBQUksQ0FDTiwrQkFBK0IsV0FBVyxnQkFBZ0IsV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQ25GLENBQUM7UUFFRixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDRjtBQWpFRCwwREFpRUMifQ==