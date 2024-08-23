import { Route as V2RouteSDK, Pair } from '@uniswap/v2-sdk';
import { Route as V3RouteSDK, Pool as V3Pool } from '@uniswap/v3-sdk';
import { Route as V4RouteSDK, Pool as V4Pool } from '@uniswap/v4-sdk';
import { Protocol } from './protocol';
import { Currency, Price, Token } from '@uniswap/sdk-core';
import { MixedRouteSDK } from './mixedRoute/route';
export interface IRoute<TInput extends Currency, TOutput extends Currency, TPool extends Pair | V3Pool | V4Pool> {
    protocol: Protocol;
    pools: TPool[];
    path: Currency[];
    midPrice: Price<TInput, TOutput>;
    input: TInput;
    output: TOutput;
}
export declare class RouteV2<TInput extends Currency, TOutput extends Currency> extends V2RouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, Pair> {
    readonly protocol: Protocol;
    readonly pools: Pair[];
    constructor(v2Route: V2RouteSDK<TInput, TOutput>);
}
export declare class RouteV3<TInput extends Currency, TOutput extends Currency> extends V3RouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, V3Pool> {
    readonly protocol: Protocol;
    readonly path: Token[];
    constructor(v3Route: V3RouteSDK<TInput, TOutput>);
}
export declare class RouteV4<TInput extends Currency, TOutput extends Currency> extends V4RouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, V4Pool> {
    readonly protocol: Protocol;
    readonly path: Currency[];
    constructor(v4Route: V4RouteSDK<TInput, TOutput>);
}
export declare class MixedRoute<TInput extends Currency, TOutput extends Currency> extends MixedRouteSDK<TInput, TOutput> implements IRoute<TInput, TOutput, Pair | V3Pool | V4Pool> {
    readonly protocol: Protocol;
    constructor(mixedRoute: MixedRouteSDK<TInput, TOutput>);
}
