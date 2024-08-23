export declare abstract class SqrtPriceMath {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static getAmount0Delta(sqrtRatioAX96: bigint, sqrtRatioBX96: bigint, liquidity: bigint, roundUp: boolean): bigint;
    static getAmount1Delta(sqrtRatioAX96: bigint, sqrtRatioBX96: bigint, liquidity: bigint, roundUp: boolean): bigint;
    static getNextSqrtPriceFromInput(sqrtPX96: bigint, liquidity: bigint, amountIn: bigint, zeroForOne: boolean): bigint;
    static getNextSqrtPriceFromOutput(sqrtPX96: bigint, liquidity: bigint, amountOut: bigint, zeroForOne: boolean): bigint;
    private static getNextSqrtPriceFromAmount0RoundingUp;
    private static getNextSqrtPriceFromAmount1RoundingDown;
}
//# sourceMappingURL=sqrtPriceMath.d.ts.map