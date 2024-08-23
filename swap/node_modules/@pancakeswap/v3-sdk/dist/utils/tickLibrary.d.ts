interface FeeGrowthOutside {
    feeGrowthOutside0X128: bigint;
    feeGrowthOutside1X128: bigint;
}
export declare function subIn256(x: bigint, y: bigint): bigint;
export declare abstract class TickLibrary {
    /**
     * Cannot be constructed.
     */
    private constructor();
    static getFeeGrowthInside(feeGrowthOutsideLower: FeeGrowthOutside, feeGrowthOutsideUpper: FeeGrowthOutside, tickLower: number, tickUpper: number, tickCurrent: number, feeGrowthGlobal0X128: bigint, feeGrowthGlobal1X128: bigint): bigint[];
}
export {};
//# sourceMappingURL=tickLibrary.d.ts.map