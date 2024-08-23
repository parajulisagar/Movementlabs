import { Interface } from '@ethersproject/abi';
import { Currency, Percent, Token } from '@uniswap/sdk-core';
import { MintSpecificOptions, IncreaseSpecificOptions, Position } from '@uniswap/v3-sdk';
export declare type CondensedAddLiquidityOptions = Omit<MintSpecificOptions, 'createPool'> | IncreaseSpecificOptions;
export declare enum ApprovalTypes {
    NOT_REQUIRED = 0,
    MAX = 1,
    MAX_MINUS_ONE = 2,
    ZERO_THEN_MAX = 3,
    ZERO_THEN_MAX_MINUS_ONE = 4
}
export declare function isMint(options: CondensedAddLiquidityOptions): options is Omit<MintSpecificOptions, 'createPool'>;
export declare abstract class ApproveAndCall {
    static INTERFACE: Interface;
    /**
     * Cannot be constructed.
     */
    private constructor();
    static encodeApproveMax(token: Token): string;
    static encodeApproveMaxMinusOne(token: Token): string;
    static encodeApproveZeroThenMax(token: Token): string;
    static encodeApproveZeroThenMaxMinusOne(token: Token): string;
    static encodeCallPositionManager(calldatas: string[]): string;
    /**
     * Encode adding liquidity to a position in the nft manager contract
     * @param position Forcasted position with expected amount out from swap
     * @param minimalPosition Forcasted position with custom minimal token amounts
     * @param addLiquidityOptions Options for adding liquidity
     * @param slippageTolerance Defines maximum slippage
     */
    static encodeAddLiquidity(position: Position, minimalPosition: Position, addLiquidityOptions: CondensedAddLiquidityOptions, slippageTolerance: Percent): string;
    static encodeApprove(token: Currency, approvalType: ApprovalTypes): string;
}
