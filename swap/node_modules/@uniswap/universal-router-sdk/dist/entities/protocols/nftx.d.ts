import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber, BigNumberish } from 'ethers';
export declare type NFTXData = {
    recipient: string;
    vaultId: BigNumberish;
    tokenAddress: string;
    tokenIds: BigNumberish[];
    value: BigNumber;
    swapCalldata: string;
};
export declare class NFTXTrade extends NFTTrade<NFTXData> {
    static INTERFACE: Interface;
    constructor(orders: NFTXData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
}
