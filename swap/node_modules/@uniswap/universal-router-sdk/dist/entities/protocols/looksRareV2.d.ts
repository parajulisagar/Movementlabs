import { Interface } from '@ethersproject/abi';
import { BuyItem, NFTTrade } from '../NFTTrade';
import { TradeConfig } from '../Command';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber } from 'ethers';
export declare type MakerOrder = {
    quoteType: number;
    globalNonce: string;
    subsetNonce: string;
    orderNonce: string;
    strategyId: number;
    collectionType: number;
    collection: string;
    currency: string;
    signer: string;
    startTime: number;
    endTime: number;
    price: string;
    itemIds: string[];
    amounts: string[];
    additionalParameters: string;
};
export declare type TakerOrder = {
    recipient: string;
    additionalParameters: string;
};
export declare type MerkleProof = {
    value: string;
    position: number;
};
export declare type MerkleTree = {
    root: string;
    proof: MerkleProof[];
};
export declare type LRV2APIOrder = MakerOrder & {
    id: string;
    hash: string;
    signature: string;
    createdAt: string;
    merkleRoot?: string;
    merkleProof?: MerkleProof[];
    status: string;
};
export declare type LooksRareV2Data = {
    apiOrder: LRV2APIOrder;
    taker: string;
};
export declare class LooksRareV2Trade extends NFTTrade<LooksRareV2Data> {
    static INTERFACE: Interface;
    private static ERC721_ORDER;
    constructor(orders: LooksRareV2Data[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
    private refactorAPIData;
}
