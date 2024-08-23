import { BigNumberish } from 'ethers';
import { RoutePlanner } from '../../utils/routerCommands';
import { Permit2Permit } from '../../utils/inputTokens';
import { Command, RouterTradeType, TradeConfig } from '../Command';
export declare class UnwrapWETH implements Command {
    readonly tradeType: RouterTradeType;
    readonly permit2Data: Permit2Permit;
    readonly wethAddress: string;
    readonly amount: BigNumberish;
    constructor(amount: BigNumberish, chainId: number, permit2?: Permit2Permit);
    encode(planner: RoutePlanner, _: TradeConfig): void;
}
