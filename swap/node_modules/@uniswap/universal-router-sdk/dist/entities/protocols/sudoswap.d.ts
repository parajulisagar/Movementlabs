import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber, BigNumberish } from 'ethers';
declare type PairSwap = {
    swapInfo: {
        pair: string;
        nftIds: BigNumberish[];
    };
    tokenAddress: string;
    maxCost: BigNumberish;
};
export declare type SudoswapData = {
    swaps: PairSwap[];
    nftRecipient: string;
    ethRecipient: string;
    deadline: BigNumberish;
};
export declare class SudoswapTrade extends NFTTrade<SudoswapData> {
    static INTERFACE: Interface;
    constructor(orders: SudoswapData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
}
export {};
