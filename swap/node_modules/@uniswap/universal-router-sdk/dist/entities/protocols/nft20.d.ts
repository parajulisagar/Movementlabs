import { Interface } from '@ethersproject/abi';
import { TradeConfig } from '../Command';
import { NFTTrade, BuyItem } from '../NFTTrade';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber, BigNumberish } from 'ethers';
export declare type NFT20Data = {
    tokenAddress: string;
    tokenIds: BigNumberish[];
    tokenAmounts: BigNumberish[];
    recipient: string;
    fee: BigNumberish;
    isV3: boolean;
    value: BigNumberish;
};
export declare class NFT20Trade extends NFTTrade<NFT20Data> {
    static INTERFACE: Interface;
    constructor(orders: NFT20Data[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
}
