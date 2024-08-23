import { BigintIsh, Rounding } from '../constants';
import { Fraction } from './fraction';
/**
 * Converts a fraction to a percent
 * @param fraction the fraction to convert
 */
declare function toPercent(fraction: Fraction): Percent;
export declare class Percent extends Fraction {
    /**
     * This boolean prevents a fraction from being interpreted as a Percent
     */
    readonly isPercent: true;
    static toPercent: typeof toPercent;
    add(other: Fraction | BigintIsh): Percent;
    subtract(other: Fraction | BigintIsh): Percent;
    multiply(other: Fraction | BigintIsh): Percent;
    divide(other: Fraction | BigintIsh): Percent;
    toSignificant(significantDigits?: number, format?: object, rounding?: Rounding): string;
    toFixed(decimalPlaces?: number, format?: object, rounding?: Rounding): string;
}
export {};
//# sourceMappingURL=percent.d.ts.map