import { BigNumber, BigNumberish } from 'ethers';
import { SeaportData } from './protocols/seaport';
import { FoundationData } from './protocols/foundation';
import { NFTXData } from './protocols/nftx';
import { NFT20Data } from './protocols/nft20';
import { RoutePlanner } from '../utils/routerCommands';
import { Command, RouterTradeType, TradeConfig } from './Command';
import { SudoswapData } from './protocols/sudoswap';
import { CryptopunkData } from './protocols/cryptopunk';
import { X2Y2Data } from './protocols/x2y2';
import { ElementData } from './protocols/element-market';
import { LooksRareV2Data } from './protocols/looksRareV2';
export declare type SupportedProtocolsData = SeaportData | FoundationData | NFTXData | LooksRareV2Data | X2Y2Data | CryptopunkData | NFT20Data | SudoswapData | ElementData;
export declare abstract class NFTTrade<T> implements Command {
    readonly tradeType: RouterTradeType;
    readonly orders: T[];
    readonly market: Market;
    constructor(market: Market, orders: T[]);
    abstract encode(planner: RoutePlanner, config: TradeConfig): void;
    abstract getBuyItems(): BuyItem[];
    abstract getTotalPrice(token?: string): BigNumber;
}
export declare type BuyItem = {
    tokenAddress: string;
    tokenId: BigNumberish;
    tokenType: TokenType;
    amount?: BigNumberish;
};
export declare enum Market {
    Foundation = "foundation",
    LooksRareV2 = "looksrareV2",
    NFT20 = "nft20",
    NFTX = "nftx",
    Seaport = "seaport",
    Sudoswap = "Sudoswap",
    Cryptopunks = "cryptopunks",
    X2Y2 = "x2y2",
    Element = "element"
}
export declare enum TokenType {
    ERC721 = "ERC721",
    ERC1155 = "ERC1155",
    Cryptopunk = "Cryptopunk"
}
