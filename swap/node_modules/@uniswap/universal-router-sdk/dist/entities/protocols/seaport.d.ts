import { BigNumber, BigNumberish } from 'ethers';
import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { Permit2Permit } from '../../utils/inputTokens';
export declare type SeaportData = {
    items: Order[];
    recipient: string;
    protocolAddress: string;
    inputTokenProcessing?: InputTokenProcessing[];
};
export declare type InputTokenProcessing = {
    token: string;
    permit2Permit?: Permit2Permit;
    protocolApproval: boolean;
    permit2TransferFrom: boolean;
};
export declare type FulfillmentComponent = {
    orderIndex: BigNumberish;
    itemIndex: BigNumberish;
};
export declare type OfferItem = {
    itemType: BigNumberish;
    token: string;
    identifierOrCriteria: BigNumberish;
    startAmount: BigNumberish;
    endAmount: BigNumberish;
};
export declare type ConsiderationItem = OfferItem & {
    recipient: string;
};
export declare type Order = {
    parameters: OrderParameters;
    signature: string;
};
declare type OrderParameters = {
    offerer: string;
    offer: OfferItem[];
    consideration: ConsiderationItem[];
    orderType: BigNumberish;
    startTime: BigNumberish;
    endTime: BigNumberish;
    zoneHash: string;
    zone: string;
    salt: BigNumberish;
    conduitKey: string;
    totalOriginalConsiderationItems: BigNumberish;
};
export declare type AdvancedOrder = Order & {
    numerator: BigNumber;
    denominator: BigNumber;
    extraData: string;
};
export declare class SeaportTrade extends NFTTrade<SeaportData> {
    static INTERFACE: Interface;
    static OPENSEA_CONDUIT_KEY: string;
    constructor(orders: SeaportData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getInputTokens(): Set<string>;
    getTotalOrderPrice(order: SeaportData, token?: string): BigNumber;
    getTotalPrice(token?: string): BigNumber;
    private commandMap;
    private getConsiderationFulfillments;
    private getAdvancedOrderParams;
    private calculateValue;
}
export {};
