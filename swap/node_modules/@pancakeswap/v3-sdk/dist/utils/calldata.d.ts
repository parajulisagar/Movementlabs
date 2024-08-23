import { BigintIsh } from '@pancakeswap/sdk';
import { Hex } from 'viem';
/**
 * Generated method parameters for executing a call.
 */
export interface MethodParameters {
    /**
     * The hex encoded calldata to perform the given operation
     */
    calldata: Hex;
    /**
     * The amount of ether (wei) to send in hex.
     */
    value: Hex;
}
/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
export declare function toHex(bigintIsh: BigintIsh): Hex;
//# sourceMappingURL=calldata.d.ts.map