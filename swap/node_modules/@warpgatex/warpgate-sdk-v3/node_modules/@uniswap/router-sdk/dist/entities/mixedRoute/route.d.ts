import { Currency, Price } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import { Pool as V3Pool } from '@uniswap/v3-sdk';
import { Pool as V4Pool } from '@uniswap/v4-sdk';
declare type TPool = Pair | V3Pool | V4Pool;
/**
 * Represents a list of pools or pairs through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */
export declare class MixedRouteSDK<TInput extends Currency, TOutput extends Currency> {
    readonly pools: TPool[];
    readonly path: Currency[];
    readonly input: TInput;
    readonly output: TOutput;
    readonly adjustedInput: Currency;
    private _midPrice;
    /**
     * Creates an instance of route.
     * @param pools An array of `TPool` objects (pools or pairs), ordered by the route the swap will take
     * @param input The input token
     * @param output The output token
     */
    constructor(pools: TPool[], input: TInput, output: TOutput);
    get chainId(): number;
    /**
     * Returns the mid price of the route
     */
    get midPrice(): Price<TInput, TOutput>;
}
export {};
