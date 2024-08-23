import { BigNumber } from '@ethersproject/bignumber';
import _ from 'lodash';
import { log } from '../util/log';
import { IGasPriceProvider } from './gas-price-provider';
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
export class EIP1559GasPriceProvider extends IGasPriceProvider {
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
            BigNumber.from(this.blocksToConsider).toHexString().replace('0x0', '0x'),
            // If the block number is not specified, we have to send hardcoded 'latest' to infura RPC
            // because Infura node pool is eventually consistent and may not have the latest block from our block number.
            // See https://uniswapteam.slack.com/archives/C023A7JDTJP/p1702485038251449?thread_ts=1702471203.519869&cid=C023A7JDTJP
            requestBlockNumber ? BigNumber.from(requestBlockNumber).toHexString().replace('0x0', '0x') : 'latest',
            [this.priorityFeePercentile],
        ]));
        const feeHistory = {
            baseFeePerGas: _.map(feeHistoryRaw.baseFeePerGas, (b) => BigNumber.from(b)),
            gasUsedRatio: feeHistoryRaw.gasUsedRatio,
            oldestBlock: BigNumber.from(feeHistoryRaw.oldestBlock),
            reward: _.map(feeHistoryRaw.reward, (b) => BigNumber.from(b[0])),
        };
        const nextBlockBaseFeePerGas = feeHistory.baseFeePerGas[feeHistory.baseFeePerGas.length - 1];
        const averagePriorityFeePerGas = _.reduce(feeHistory.reward, (sum, cur) => sum.add(cur), BigNumber.from(0)).div(feeHistory.reward.length);
        log.info({
            feeHistory,
            feeHistoryReadable: {
                baseFeePerGas: _.map(feeHistory.baseFeePerGas, (f) => f.toString()),
                oldestBlock: feeHistory.oldestBlock.toString(),
                reward: _.map(feeHistory.reward, (r) => r.toString()),
            },
            nextBlockBaseFeePerGas: nextBlockBaseFeePerGas.toString(),
            averagePriorityFeePerGas: averagePriorityFeePerGas.toString(),
        }, 'Got fee history from provider and computed gas estimate');
        const gasPriceWei = nextBlockBaseFeePerGas.add(averagePriorityFeePerGas);
        const blockNumber = feeHistory.oldestBlock.add(this.blocksToConsider);
        log.info(`Estimated gas price in wei: ${gasPriceWei} as of block ${blockNumber.toString()}`);
        return { gasPriceWei: gasPriceWei };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWlwLTE1NTktZ2FzLXByaWNlLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9laXAtMTU1OS1nYXMtcHJpY2UtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUV2QixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWxDLE9BQU8sRUFBWSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBZ0JuRSx3R0FBd0c7QUFDeEcsTUFBTSwrQkFBK0IsR0FBRyxFQUFFLENBQUM7QUFDM0MsMEhBQTBIO0FBQzFILE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO0FBRXRDOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLGlCQUFpQjtJQUM1RCxZQUNZLFFBQXlCLEVBQzNCLHdCQUFnQywrQkFBK0IsRUFDL0QsbUJBQTJCLDJCQUEyQjtRQUU5RCxLQUFLLEVBQUUsQ0FBQztRQUpFLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQzNCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBMEM7UUFDL0QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFzQztJQUdoRSxDQUFDO0lBRWUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBMEIsRUFBRSxrQkFBMkI7UUFDdkYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ2hFOzs7ZUFHRztZQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7WUFDeEUseUZBQXlGO1lBQ3pGLDZHQUE2RztZQUM3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