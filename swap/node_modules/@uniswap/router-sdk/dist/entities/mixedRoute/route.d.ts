import { Currency, Price, Token } from '@uniswap/sdk-core';
import { Pool } from '@uniswap/v3-sdk';
import { Pair } from '@uniswap/v2-sdk';
declare type TPool = Pair | Pool;
/**
 * Represents a list of pools or pairs through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */
export declare class MixedRouteSDK<TInput extends Currency, TOutput extends Currency> {
    readonly pools: TPool[];
    readonly path: Token[];
    readonly input: TInput;
    readonly output: TOutput;
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
