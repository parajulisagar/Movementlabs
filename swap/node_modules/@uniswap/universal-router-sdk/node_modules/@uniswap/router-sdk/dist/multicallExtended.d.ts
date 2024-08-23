import { Interface } from '@ethersproject/abi';
import { BigintIsh } from '@uniswap/sdk-core';
export declare type Validation = BigintIsh | string;
export declare abstract class MulticallExtended {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodeMulticall(calldatas: string | string[], validation?: Validation): string;
}
