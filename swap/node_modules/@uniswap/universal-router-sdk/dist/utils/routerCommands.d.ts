/**
 * CommandTypes
 * @description Flags that modify a command's execution
 * @enum {number}
 */
export declare enum CommandType {
    V3_SWAP_EXACT_IN = 0,
    V3_SWAP_EXACT_OUT = 1,
    PERMIT2_TRANSFER_FROM = 2,
    PERMIT2_PERMIT_BATCH = 3,
    SWEEP = 4,
    TRANSFER = 5,
    PAY_PORTION = 6,
    V2_SWAP_EXACT_IN = 8,
    V2_SWAP_EXACT_OUT = 9,
    PERMIT2_PERMIT = 10,
    WRAP_ETH = 11,
    UNWRAP_WETH = 12,
    PERMIT2_TRANSFER_FROM_BATCH = 13,
    BALANCE_CHECK_ERC20 = 14,
    SEAPORT_V1_5 = 16,
    LOOKS_RARE_V2 = 17,
    NFTX = 18,
    CRYPTOPUNKS = 19,
    OWNER_CHECK_721 = 21,
    OWNER_CHECK_1155 = 22,
    SWEEP_ERC721 = 23,
    X2Y2_721 = 24,
    SUDOSWAP = 25,
    NFT20 = 26,
    X2Y2_1155 = 27,
    FOUNDATION = 28,
    SWEEP_ERC1155 = 29,
    ELEMENT_MARKET = 30,
    SEAPORT_V1_4 = 32,
    EXECUTE_SUB_PLAN = 33,
    APPROVE_ERC20 = 34
}
export declare class RoutePlanner {
    commands: string;
    inputs: string[];
    constructor();
    addSubPlan(subplan: RoutePlanner): void;
    addCommand(type: CommandType, parameters: any[], allowRevert?: boolean): void;
}
export declare type RouterCommand = {
    type: CommandType;
    encodedInput: string;
};
export declare function createCommand(type: CommandType, parameters: any[]): RouterCommand;
