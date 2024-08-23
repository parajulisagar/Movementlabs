import { Currency, Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { Pool } from '@uniswap/v3-sdk';
import { MixedRouteSDK } from '../entities/mixedRoute/route';
/**
 * Utility function to return each consecutive section of Pools or Pairs in a MixedRoute
 * @param route
 * @returns a nested array of Pools or Pairs in the order of the route
 */
export declare const partitionMixedRouteByProtocol: (route: MixedRouteSDK<Currency, Currency>) => (Pool | Pair)[][];
/**
 * Simple utility function to get the output of an array of Pools or Pairs
 * @param pools
 * @param firstInputToken
 * @returns the output token of the last pool in the array
 */
export declare const getOutputOfPools: (pools: (Pool | Pair)[], firstInputToken: Token) => Token;
