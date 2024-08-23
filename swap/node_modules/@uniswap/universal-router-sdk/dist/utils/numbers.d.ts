import { BigNumber } from 'ethers';
import JSBI from 'jsbi';
import { Percent } from '@uniswap/sdk-core';
export declare function expandTo18DecimalsBN(n: number): BigNumber;
export declare function expandTo18Decimals(n: number): JSBI;
export declare function encodeFeeBips(fee: Percent): string;
