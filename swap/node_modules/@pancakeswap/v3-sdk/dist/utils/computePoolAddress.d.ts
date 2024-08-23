import { Address, Hash } from 'viem';
import { Token } from '@pancakeswap/sdk';
import { FeeAmount } from '../constants';
/**
 * Computes a pool address
 * @param deployerAddress The Pancake V3 deployer address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export declare function computePoolAddress({ deployerAddress, tokenA, tokenB, fee, initCodeHashManualOverride, }: {
    deployerAddress: Address;
    tokenA: Token;
    tokenB: Token;
    fee: FeeAmount;
    initCodeHashManualOverride?: Hash;
}): Address;
//# sourceMappingURL=computePoolAddress.d.ts.map