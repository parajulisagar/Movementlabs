import { Currency, CurrencyAmount, Percent, Fraction } from '@pancakeswap/swap-sdk-core';
import { Tick } from '../entities';
export declare const FeeCalculator: {
    getEstimatedLPFee: typeof getEstimatedLPFee;
    getEstimatedLPFeeByAmounts: typeof getEstimatedLPFeeByAmounts;
    getLiquidityFromTick: typeof getLiquidityFromTick;
    getLiquidityFromSqrtRatioX96: typeof getLiquidityFromSqrtRatioX96;
    getAverageLiquidity: typeof getAverageLiquidity;
    getLiquidityBySingleAmount: typeof getLiquidityBySingleAmount;
    getDependentAmount: typeof getDependentAmount;
    getLiquidityByAmountsAndPrice: typeof getLiquidityByAmountsAndPrice;
    getAmountsByLiquidityAndPrice: typeof getAmountsByLiquidityAndPrice;
    getAmountsAtNewPrice: typeof getAmountsAtNewPrice;
};
interface EstimateFeeOptions {
    amount: CurrencyAmount<Currency>;
    currency: Currency;
    tickLower: number;
    tickUpper: number;
    volume24H: number;
    sqrtRatioX96: bigint;
    mostActiveLiquidity: bigint;
    fee: number;
    insidePercentage?: Percent;
    protocolFee?: Percent;
}
export declare function getEstimatedLPFeeWithProtocolFee({ amount, currency, ...rest }: EstimateFeeOptions): Fraction;
export declare function getEstimatedLPFee({ amount, currency, ...rest }: EstimateFeeOptions): Fraction;
interface EstimateFeeByAmountsOptions extends Omit<EstimateFeeOptions, 'amount' | 'currency'> {
    amountA: CurrencyAmount<Currency>;
    amountB: CurrencyAmount<Currency>;
}
export declare function getEstimatedLPFeeByAmountsWithProtocolFee(options: EstimateFeeByAmountsOptions): Fraction;
export declare function getEstimatedLPFeeByAmounts({ protocolFee, ...rest }: EstimateFeeByAmountsOptions): Fraction;
interface GetAmountOptions {
    amount: CurrencyAmount<Currency>;
    currency: Currency;
    tickLower: number;
    tickUpper: number;
    sqrtRatioX96: bigint;
}
export declare function getDependentAmount(options: GetAmountOptions): CurrencyAmount<Currency> | undefined;
export declare function getLiquidityBySingleAmount({ amount, currency, ...rest }: GetAmountOptions): bigint | undefined;
interface GetLiquidityOptions extends Omit<GetAmountOptions, 'amount' | 'currency'> {
    amountA: CurrencyAmount<Currency>;
    amountB: CurrencyAmount<Currency>;
}
export declare function getLiquidityByAmountsAndPrice({ amountA, amountB, tickUpper, tickLower, sqrtRatioX96, }: GetLiquidityOptions): bigint | undefined;
interface GetAmountsOptions extends Omit<GetAmountOptions, 'amount' | 'currency'> {
    currencyA: Currency;
    currencyB: Currency;
    liquidity: bigint;
}
export declare function getAmountsByLiquidityAndPrice(options: GetAmountsOptions): CurrencyAmount<Currency>[];
interface GetAmountsAtNewPriceOptions extends Omit<GetAmountOptions, 'amount' | 'currency'> {
    amountA: CurrencyAmount<Currency>;
    amountB: CurrencyAmount<Currency>;
    newSqrtRatioX96: bigint;
}
export declare function getAmountsAtNewPrice({ newSqrtRatioX96, ...rest }: GetAmountsAtNewPriceOptions): CurrencyAmount<Currency>[] | undefined;
export declare function getAverageLiquidity(ticks: Tick[], tickSpacing: number, tickLower: number, tickUpper: number): bigint;
export declare function getLiquidityFromSqrtRatioX96(ticks: Tick[], sqrtRatioX96: bigint): bigint;
export declare function getLiquidityFromTick(ticks: Tick[], tick: number): bigint;
export {};
//# sourceMappingURL=feeCalculator.d.ts.map