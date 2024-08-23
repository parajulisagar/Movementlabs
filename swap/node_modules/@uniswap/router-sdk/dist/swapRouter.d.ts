import { Interface } from '@ethersproject/abi';
import { Currency, Percent, TradeType } from '@uniswap/sdk-core';
import { Trade as V2Trade } from '@uniswap/v2-sdk';
import { FeeOptions, MethodParameters, PermitOptions, Position, Trade as V3Trade } from '@uniswap/v3-sdk';
import { ApprovalTypes, CondensedAddLiquidityOptions } from './approveAndCall';
import { Trade } from './entities/trade';
import { Validation } from './multicallExtended';
import { MixedRouteTrade } from './entities/mixedRoute/trade';
/**
 * Options for producing the arguments to send calls to the router.
 */
export interface SwapOptions {
    /**
     * How much the execution price is allowed to move unfavorably from the trade execution price.
     */
    slippageTolerance: Percent;
    /**
     * The account that should receive the output. If omitted, output is sent to msg.sender.
     */
    recipient?: string;
    /**
     * Either deadline (when the transaction expires, in epoch seconds), or previousBlockhash.
     */
    deadlineOrPreviousBlockhash?: Validation;
    /**
     * The optional permit parameters for spending the input.
     */
    inputTokenPermit?: PermitOptions;
    /**
     * Optional information for taking a fee on output.
     */
    fee?: FeeOptions;
}
export interface SwapAndAddOptions extends SwapOptions {
    /**
     * The optional permit parameters for pulling in remaining output token.
     */
    outputTokenPermit?: PermitOptions;
}
declare type AnyTradeType = Trade<Currency, Currency, TradeType> | V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | MixedRouteTrade<Currency, Currency, TradeType> | (V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | MixedRouteTrade<Currency, Currency, TradeType>)[];
/**
 * Represents the Uniswap V2 + V3 SwapRouter02, and has static methods for helping execute trades.
 */
export declare abstract class SwapRouter {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * @notice Generates the calldata for a Swap with a V2 Route.
     * @param trade The V2Trade to encode.
     * @param options SwapOptions to use for the trade.
     * @param routerMustCustody Flag for whether funds should be sent to the router
     * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
     * @returns A string array of calldatas for the trade.
     */
    private static encodeV2Swap;
    /**
     * @notice Generates the calldata for a Swap with a V3 Route.
     * @param trade The V3Trade to encode.
     * @param options SwapOptions to use for the trade.
     * @param routerMustCustody Flag for whether funds should be sent to the router
     * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
     * @returns A string array of calldatas for the trade.
     */
    private static encodeV3Swap;
    /**
     * @notice Generates the calldata for a MixedRouteSwap. Since single hop routes are not MixedRoutes, we will instead generate
     *         them via the existing encodeV3Swap and encodeV2Swap methods.
     * @param trade The MixedRouteTrade to encode.
     * @param options SwapOptions to use for the trade.
     * @param routerMustCustody Flag for whether funds should be sent to the router
     * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
     * @returns A string array of calldatas for the trade.
     */
    private static encodeMixedRouteSwap;
    private static encodeSwaps;
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trades to produce call parameters for
     * @param options options for the call parameters
     */
    static swapCallParameters(trades: Trade<Currency, Currency, TradeType> | V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | MixedRouteTrade<Currency, Currency, TradeType> | (V2Trade<Currency, Currency, TradeType> | V3Trade<Currency, Currency, TradeType> | MixedRouteTrade<Currency, Currency, TradeType>)[], options: SwapOptions): MethodParameters;
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
     * @param trades to produce call parameters for
     * @param options options for the call parameters
     */
    static swapAndAddCallParameters(trades: AnyTradeType, options: SwapAndAddOptions, position: Position, addLiquidityOptions: CondensedAddLiquidityOptions, tokenInApprovalType: ApprovalTypes, tokenOutApprovalType: ApprovalTypes): MethodParameters;
    private static riskOfPartialFill;
    private static v3TradeWithHighPriceImpact;
    private static getPositionAmounts;
}
export {};
