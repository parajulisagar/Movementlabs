import { Interface } from '@ethersproject/abi';
import { Token } from '@uniswap/sdk-core';
import { FeeOptions } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';
export declare abstract class PaymentsExtended {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodeUnwrapWETH9(amountMinimum: JSBI, recipient?: string, feeOptions?: FeeOptions): string;
    static encodeSweepToken(token: Token, amountMinimum: JSBI, recipient?: string, feeOptions?: FeeOptions): string;
    static encodePull(token: Token, amount: JSBI): string;
    static encodeWrapETH(amount: JSBI): string;
}
