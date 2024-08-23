import { Route as V2RouteSDK, Pair } from '@uniswap/v2-sdk';
import { Route as V3RouteSDK, Pool } from '@uniswap/v3-sdk';
import { Protocol } from './protocol';
import { Currency, Price, Token } from '@uniswap/sdk-core';
import { MixedRouteSDK } from './mixedRoute/route';
export interface IRoute<TInput extends Currency, TOutput extends Currency, TPool extends Pool | Pair> {
    protocol: Protocol;
    pools: TPool[];
    path: Token[];
    midPrice: Price<TInput, TOutput>;
    input: TInput;
    output: TOutput;
}
export declare class RouteV2<TInput extends Currency, TOutput extends Currency> extends V2RouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, Pair> {
    readonly protocol: Protocol;
    readonly pools: Pair[];
    constructor(v2Route: V2RouteSDK<TInput, TOutput>);
}
export declare class RouteV3<TInput extends Currency, TOutput extends Currency> extends V3RouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, Pool> {
    readonly protocol: Protocol;
    readonly path: Token[];
    constructor(v3Route: V3RouteSDK<TInput, TOutput>);
}
export declare class MixedRoute<TInput extends Currency, TOutput extends Currency> extends MixedRouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, Pool | Pair> {
    readonly protocol: Protocol;
    constructor(mixedRoute: MixedRouteSDK<TInput, TOutput>);
}
