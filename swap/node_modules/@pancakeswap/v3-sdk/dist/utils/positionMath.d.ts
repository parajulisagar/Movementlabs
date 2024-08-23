declare function getToken0Amount(tickCurrent: number, tickLower: number, tickUpper: number, sqrtRatioX96: bigint, liquidity: bigint): bigint;
declare function getToken1Amount(tickCurrent: number, tickLower: number, tickUpper: number, sqrtRatioX96: bigint, liquidity: bigint): bigint;
export declare const PositionMath: {
    getToken0Amount: typeof getToken0Amount;
    getToken1Amount: typeof getToken1Amount;
};
export {};
//# sourceMappingURL=positionMath.d.ts.map