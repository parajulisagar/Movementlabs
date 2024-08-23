import { RoutePlanner } from '../../utils/routerCommands';
import { Trade as RouterTrade, SwapOptions as RouterSwapOptions } from '@uniswap/router-sdk';
import { Permit2Permit } from '../../utils/inputTokens';
import { Currency, TradeType } from '@uniswap/sdk-core';
import { Command, RouterTradeType, TradeConfig } from '../Command';
import { BigNumberish } from 'ethers';
export declare type FlatFeeOptions = {
    amount: BigNumberish;
    recipient: string;
};
export declare type SwapOptions = Omit<RouterSwapOptions, 'inputTokenPermit'> & {
    useRouterBalance?: boolean;
    inputTokenPermit?: Permit2Permit;
    flatFee?: FlatFeeOptions;
    safeMode?: boolean;
};
export declare class UniswapTrade implements Command {
    trade: RouterTrade<Currency, Currency, TradeType>;
    options: SwapOptions;
    readonly tradeType: RouterTradeType;
    readonly payerIsUser: boolean;
    constructor(trade: RouterTrade<Currency, Currency, TradeType>, options: SwapOptions);
    get inputRequiresWrap(): boolean;
    encode(planner: RoutePlanner, _config: TradeConfig): void;
}
