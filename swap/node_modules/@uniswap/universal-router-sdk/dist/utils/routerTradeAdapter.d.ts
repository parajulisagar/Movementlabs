import { Trade as RouterTrade } from '@uniswap/router-sdk';
import { Currency, TradeType } from '@uniswap/sdk-core';
export declare type TokenInRoute = {
    address: string;
    chainId: number;
    symbol: string;
    decimals: string;
    name?: string;
    buyFeeBps?: string;
    sellFeeBps?: string;
};
export declare enum PoolType {
    V2Pool = "v2-pool",
    V3Pool = "v3-pool"
}
export declare type V2Reserve = {
    token: TokenInRoute;
    quotient: string;
};
export declare type V2PoolInRoute = {
    type: PoolType.V2Pool;
    address?: string;
    tokenIn: TokenInRoute;
    tokenOut: TokenInRoute;
    reserve0: V2Reserve;
    reserve1: V2Reserve;
    amountIn?: string;
    amountOut?: string;
};
export declare type V3PoolInRoute = {
    type: PoolType.V3Pool;
    address?: string;
    tokenIn: TokenInRoute;
    tokenOut: TokenInRoute;
    sqrtRatioX96: string;
    liquidity: string;
    tickCurrent: string;
    fee: string;
    amountIn?: string;
    amountOut?: string;
};
export declare type PartialClassicQuote = {
    tokenIn: string;
    tokenOut: string;
    tradeType: TradeType;
    route: Array<(V3PoolInRoute | V2PoolInRoute)[]>;
};
export declare const isNativeCurrency: (address: string) => boolean;
export declare class RouterTradeAdapter {
    static fromClassicQuote(quote: PartialClassicQuote): RouterTrade<Currency, Currency, TradeType>;
    private static toCurrency;
    private static toPoolOrPair;
    private static toToken;
    private static toPool;
    private static toPair;
    private static isVersionedRoute;
}
