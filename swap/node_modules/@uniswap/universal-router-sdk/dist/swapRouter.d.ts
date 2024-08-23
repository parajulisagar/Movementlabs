import { Interface } from '@ethersproject/abi';
import { BigNumberish } from 'ethers';
import { MethodParameters } from '@uniswap/v3-sdk';
import { Trade as RouterTrade } from '@uniswap/router-sdk';
import { Currency, TradeType } from '@uniswap/sdk-core';
import { Command } from './entities/Command';
import { NFTTrade, SupportedProtocolsData } from './entities/NFTTrade';
import { SwapOptions } from './entities/protocols/uniswap';
export declare type SwapRouterConfig = {
    sender?: string;
    deadline?: BigNumberish;
};
declare type SupportedNFTTrade = NFTTrade<SupportedProtocolsData>;
export declare abstract class SwapRouter {
    static INTERFACE: Interface;
    static swapCallParameters(trades: Command[] | Command, config?: SwapRouterConfig): MethodParameters;
    /**
     * @deprecated in favor of swapCallParameters. Update before next major version 2.0.0
     * This version does not work correctly for Seaport ERC20->NFT purchases
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given swap.
     * @param trades to produce call parameters for
     */
    static swapNFTCallParameters(trades: SupportedNFTTrade[], config?: SwapRouterConfig): MethodParameters;
    /**
     * @deprecated in favor of swapCallParameters. Update before next major version 2.0.0
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trades to produce call parameters for
     * @param options options for the call parameters
     */
    static swapERC20CallParameters(trades: RouterTrade<Currency, Currency, TradeType>, options: SwapOptions): MethodParameters;
    /**
     * Encodes a planned route into a method name and parameters for the Router contract.
     * @param planner the planned route
     * @param nativeCurrencyValue the native currency value of the planned route
     * @param config the router config
     */
    private static encodePlan;
}
export {};
