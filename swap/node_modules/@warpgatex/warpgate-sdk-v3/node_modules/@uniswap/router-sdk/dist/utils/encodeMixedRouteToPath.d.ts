import { Currency } from '@uniswap/sdk-core';
import { MixedRouteSDK } from '../entities/mixedRoute/route';
/**
 * Converts a route to a hex encoded path
 * @notice only supports exactIn route encodings
 * @param route the mixed path to convert to an encoded path
 * @returns the exactIn encoded path
 */
export declare function encodeMixedRouteToPath(route: MixedRouteSDK<Currency, Currency>): string;
