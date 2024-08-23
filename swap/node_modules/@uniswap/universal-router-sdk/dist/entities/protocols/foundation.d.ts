import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber, BigNumberish } from 'ethers';
export declare type FoundationData = {
    recipient: string;
    tokenAddress: string;
    tokenId: BigNumberish;
    price: BigNumberish;
    referrer: string;
};
export declare class FoundationTrade extends NFTTrade<FoundationData> {
    static INTERFACE: Interface;
    constructor(orders: FoundationData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
}
