import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { Pool as V4Pool } from '@uniswap/v4-sdk';
import { Pair } from '@uniswap/v2-sdk';
import { Pool as V3Pool } from '@uniswap/v3-sdk';
declare type TPool = Pair | V3Pool | V4Pool;
export declare function getOutputAmount(pool: TPool, amountIn: CurrencyAmount<Currency>): Promise<[CurrencyAmount<Currency>, TPool]>;
export {};
