import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade, TokenType } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber, BigNumberish } from 'ethers';
declare type X2Y2PartialData = {
    signedInput: string;
    recipient: string;
    tokenAddress: string;
    tokenId: BigNumberish;
    price: BigNumberish;
};
export declare type X2Y2_721_Data = X2Y2PartialData & {
    tokenType: TokenType.ERC721;
};
export declare type X2Y2_1155_Data = X2Y2PartialData & {
    tokenType: TokenType.ERC1155;
    tokenAmount: BigNumberish;
};
export declare type X2Y2Data = X2Y2_721_Data | X2Y2_1155_Data;
export declare class X2Y2Trade extends NFTTrade<X2Y2Data> {
    static INTERFACE: Interface;
    constructor(orders: X2Y2Data[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
}
export {};
