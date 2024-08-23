import { Token, Currency, Price } from '@pancakeswap/swap-sdk-core';
import { Pair } from './pair';
export declare class Route<TInput extends Currency, TOutput extends Currency> {
    readonly pairs: Pair[];
    readonly path: Token[];
    readonly input: TInput;
    readonly output: TOutput;
    constructor(pairs: Pair[], input: TInput, output: TOutput);
    private _midPrice;
    get midPrice(): Price<TInput, TOutput>;
    get chainId(): number;
}
//# sourceMappingURL=route.d.ts.map