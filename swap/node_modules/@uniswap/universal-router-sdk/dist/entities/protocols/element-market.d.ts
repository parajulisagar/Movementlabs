import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber } from 'ethers';
export interface Fee {
    recipient: string;
    amount: string;
    feeData: string;
}
declare type ElementPartialData = {
    maker: string;
    taker: string;
    expiry: string;
    nonce: string;
    erc20Token: string;
    erc20TokenAmount: string;
    fees: Fee[];
};
export declare type ERC721SellOrder = ElementPartialData & {
    nft: string;
    nftId: string;
};
export declare type OrderSignature = {
    signatureType: number;
    v: number;
    r: string;
    s: string;
};
export declare type ElementData = {
    order: ERC721SellOrder;
    signature: OrderSignature;
    recipient: string;
};
export declare class ElementTrade extends NFTTrade<ElementData> {
    private static ETH_ADDRESS;
    static INTERFACE: Interface;
    constructor(orders: ElementData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
    getOrderPriceIncludingFees(order: ERC721SellOrder): BigNumber;
}
export {};
