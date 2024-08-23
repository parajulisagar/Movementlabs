import { Currency, Token, NativeCurrency } from '@pancakeswap/swap-sdk-core';
/**
 *
 * Native is the main usage of a 'native' currency, i.e. for BSC mainnet and all testnets
 */
export declare class Native extends NativeCurrency {
    protected constructor({ chainId, decimals, name, symbol, }: {
        chainId: number;
        decimals: number;
        symbol: string;
        name: string;
    });
    get wrapped(): Token;
    private static cache;
    static onChain(chainId: number): Native;
    equals(other: Currency): boolean;
}
//# sourceMappingURL=native.d.ts.map