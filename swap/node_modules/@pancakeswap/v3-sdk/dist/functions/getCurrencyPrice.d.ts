import { BigintIsh, Price } from '@pancakeswap/sdk';
import { Currency } from '@pancakeswap/swap-sdk-core';
/**
 * Returns the current price of the given tokens
 */
export declare const getCurrency0Price: ([currency0, currency1]: [Currency, Currency], currentSqrtRatioX96: BigintIsh) => Price<Currency, Currency>;
/**
 * Returns the current price of the given tokens
 */
export declare const getCurrency1Price: ([currency0, currency1]: [Currency, Currency], currentSqrtRatioX96: BigintIsh) => Price<Currency, Currency>;
//# sourceMappingURL=getCurrencyPrice.d.ts.map