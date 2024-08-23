import { TradeConfig } from '../Command';
import { NFTTrade, BuyItem } from '../NFTTrade';
import { RoutePlanner } from '../../utils/routerCommands';
import { BigNumber, BigNumberish } from 'ethers';
export declare type CryptopunkData = {
    tokenId: BigNumberish;
    recipient: string;
    value: BigNumberish;
};
export declare class CryptopunkTrade extends NFTTrade<CryptopunkData> {
    static CRYPTOPUNK_ADDRESS: string;
    constructor(orders: CryptopunkData[]);
    encode(planner: RoutePlanner, config: TradeConfig): void;
    getBuyItems(): BuyItem[];
    getTotalPrice(): BigNumber;
}
