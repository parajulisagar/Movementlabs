import { Currency, Percent, TradeType } from '@pancakeswap/swap-sdk-core';
import { Trade } from './entities';
export declare function isTradeBetter(tradeA: Trade<Currency, Currency, TradeType> | undefined | null, tradeB: Trade<Currency, Currency, TradeType> | undefined | null, minimumDelta?: Percent): boolean | undefined;
export default isTradeBetter;
//# sourceMappingURL=trade.d.ts.map