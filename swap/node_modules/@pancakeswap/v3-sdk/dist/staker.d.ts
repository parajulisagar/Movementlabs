import { BigintIsh, Token } from '@pancakeswap/sdk';
import { MethodParameters } from './utils/calldata';
import { Pool } from './entities';
export type FullWithdrawOptions = ClaimOptions & WithdrawOptions;
/**
 * Represents a unique staking program.
 */
export interface IncentiveKey {
    /**
     * The token rewarded for participating in the staking program.
     */
    rewardToken: Token;
    /**
     * The pool that the staked positions must provide in.
     */
    pool: Pool;
    /**
     * The time when the incentive program begins.
     */
    startTime: BigintIsh;
    /**
     * The time that the incentive program ends.
     */
    endTime: BigintIsh;
    /**
     * The address which receives any remaining reward tokens at `endTime`.
     */
    refundee: string;
}
/**
 * Options to specify when claiming rewards.
 */
export interface ClaimOptions {
    /**
     * The id of the NFT
     */
    tokenId: BigintIsh;
    /**
     * Address to send rewards to.
     */
    recipient: string;
    /**
     * The amount of `rewardToken` to claim. 0 claims all.
     */
    amount?: BigintIsh;
}
/**
 * Options to specify when withdrawing a position.
 */
export interface WithdrawOptions {
    /**
     * Set when withdrawing. The position will be sent to `owner` on withdraw.
     */
    owner: string;
    /**
     * Set when withdrawing. `data` is passed to `safeTransferFrom` when transferring the position from contract back to owner.
     */
    data?: string;
}
export declare abstract class Staker {
    static ABI: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "contract IUniswapV3Factory";
            readonly name: "_factory";
            readonly type: "address";
        }, {
            readonly internalType: "contract INonfungiblePositionManager";
            readonly name: "_nonfungiblePositionManager";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "_maxIncentiveStartLeadTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "_maxIncentiveDuration";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "oldOwner";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "newOwner";
            readonly type: "address";
        }]; /**
         * The id of the NFT
         */
        readonly name: "DepositTransferred";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "contract IERC20Minimal";
            readonly name: "rewardToken";
            readonly type: "address";
        }, {
            readonly indexed: true;
            readonly internalType: "contract IUniswapV3Pool";
            readonly name: "pool";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly indexed: false;
            readonly internalType: "address";
            readonly name: "refundee";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "reward";
            readonly type: "uint256";
        }];
        readonly name: "IncentiveCreated";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "incentiveId";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "refund";
            readonly type: "uint256";
        }];
        readonly name: "IncentiveEnded";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly indexed: false;
            readonly internalType: "uint256";
            readonly name: "reward";
            readonly type: "uint256";
        }];
        readonly name: "RewardClaimed";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "incentiveId";
            readonly type: "bytes32";
        }, {
            readonly indexed: false;
            readonly internalType: "uint128";
            readonly name: "liquidity";
            readonly type: "uint128";
        }];
        readonly name: "TokenStaked";
        readonly type: "event";
    }, {
        readonly anonymous: false;
        readonly inputs: readonly [{
            readonly indexed: true;
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly indexed: true;
            readonly internalType: "bytes32";
            readonly name: "incentiveId";
            readonly type: "bytes32";
        }];
        readonly name: "TokenUnstaked";
        readonly type: "event";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20Minimal";
            readonly name: "rewardToken";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountRequested";
            readonly type: "uint256";
        }];
        readonly name: "claimReward";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "reward";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IERC20Minimal";
                readonly name: "rewardToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IUniswapV3Pool";
                readonly name: "pool";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "refundee";
                readonly type: "address";
            }];
            readonly internalType: "struct IUniswapV3Staker.IncentiveKey";
            readonly name: "key";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint256";
            readonly name: "reward";
            readonly type: "uint256";
        }];
        readonly name: "createIncentive";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly name: "deposits";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly internalType: "uint48";
            readonly name: "numberOfStakes";
            readonly type: "uint48";
        }, {
            readonly internalType: "int24";
            readonly name: "tickLower";
            readonly type: "int24";
        }, {
            readonly internalType: "int24";
            readonly name: "tickUpper";
            readonly type: "int24";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IERC20Minimal";
                readonly name: "rewardToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IUniswapV3Pool";
                readonly name: "pool";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "refundee";
                readonly type: "address";
            }];
            readonly internalType: "struct IUniswapV3Staker.IncentiveKey";
            readonly name: "key";
            readonly type: "tuple";
        }];
        readonly name: "endIncentive";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "refund";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "factory";
        readonly outputs: readonly [{
            readonly internalType: "contract IUniswapV3Factory";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IERC20Minimal";
                readonly name: "rewardToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IUniswapV3Pool";
                readonly name: "pool";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "refundee";
                readonly type: "address";
            }];
            readonly internalType: "struct IUniswapV3Staker.IncentiveKey";
            readonly name: "key";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "getRewardInfo";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "reward";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160";
            readonly name: "secondsInsideX128";
            readonly type: "uint160";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes32";
            readonly name: "";
            readonly type: "bytes32";
        }];
        readonly name: "incentives";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "totalRewardUnclaimed";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160";
            readonly name: "totalSecondsClaimedX128";
            readonly type: "uint160";
        }, {
            readonly internalType: "uint96";
            readonly name: "numberOfStakes";
            readonly type: "uint96";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "maxIncentiveDuration";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "maxIncentiveStartLeadTime";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "data";
            readonly type: "bytes[]";
        }];
        readonly name: "multicall";
        readonly outputs: readonly [{
            readonly internalType: "bytes[]";
            readonly name: "results";
            readonly type: "bytes[]";
        }];
        readonly stateMutability: "payable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "nonfungiblePositionManager";
        readonly outputs: readonly [{
            readonly internalType: "contract INonfungiblePositionManager";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "from";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "onERC721Received";
        readonly outputs: readonly [{
            readonly internalType: "bytes4";
            readonly name: "";
            readonly type: "bytes4";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "contract IERC20Minimal";
            readonly name: "";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly name: "rewards";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "";
            readonly type: "uint256";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IERC20Minimal";
                readonly name: "rewardToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IUniswapV3Pool";
                readonly name: "pool";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "refundee";
                readonly type: "address";
            }];
            readonly internalType: "struct IUniswapV3Staker.IncentiveKey";
            readonly name: "key";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "stakeToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "incentiveId";
            readonly type: "bytes32";
        }];
        readonly name: "stakes";
        readonly outputs: readonly [{
            readonly internalType: "uint160";
            readonly name: "secondsPerLiquidityInsideInitialX128";
            readonly type: "uint160";
        }, {
            readonly internalType: "uint128";
            readonly name: "liquidity";
            readonly type: "uint128";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }];
        readonly name: "transferDeposit";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "contract IERC20Minimal";
                readonly name: "rewardToken";
                readonly type: "address";
            }, {
                readonly internalType: "contract IUniswapV3Pool";
                readonly name: "pool";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "address";
                readonly name: "refundee";
                readonly type: "address";
            }];
            readonly internalType: "struct IUniswapV3Staker.IncentiveKey";
            readonly name: "key";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }];
        readonly name: "unstakeToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "to";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "data";
            readonly type: "bytes";
        }];
        readonly name: "withdrawToken";
        readonly outputs: readonly [];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    protected constructor();
    private static INCENTIVE_KEY_ABI;
    /**
     *  To claim rewards, must unstake and then claim.
     * @param incentiveKey The unique identifier of a staking program.
     * @param options Options for producing the calldata to claim. Can't claim unless you unstake.
     * @returns The calldatas for 'unstakeToken' and 'claimReward'.
     */
    private static encodeClaim;
    /**
     *
     * Note:  A `tokenId` can be staked in many programs but to claim rewards and continue the program you must unstake, claim, and then restake.
     * @param incentiveKeys An IncentiveKey or array of IncentiveKeys that `tokenId` is staked in.
     * Input an array of IncentiveKeys to claim rewards for each program.
     * @param options ClaimOptions to specify tokenId, recipient, and amount wanting to collect.
     * Note that you can only specify one amount and one recipient across the various programs if you are collecting from multiple programs at once.
     * @returns
     */
    static collectRewards(incentiveKeys: IncentiveKey | IncentiveKey[], options: ClaimOptions): MethodParameters;
    /**
     *
     * @param incentiveKeys A list of incentiveKeys to unstake from. Should include all incentiveKeys (unique staking programs) that `options.tokenId` is staked in.
     * @param withdrawOptions Options for producing claim calldata and withdraw calldata. Can't withdraw without unstaking all programs for `tokenId`.
     * @returns Calldata for unstaking, claiming, and withdrawing.
     */
    static withdrawToken(incentiveKeys: IncentiveKey | IncentiveKey[], withdrawOptions: FullWithdrawOptions): MethodParameters;
    /**
     *
     * @param incentiveKeys A single IncentiveKey or array of IncentiveKeys to be encoded and used in the data parameter in `safeTransferFrom`
     * @returns An IncentiveKey as a string
     */
    static encodeDeposit(incentiveKeys: IncentiveKey | IncentiveKey[]): string;
    /**
     *
     * @param incentiveKey An `IncentiveKey` which represents a unique staking program.
     * @returns An encoded IncentiveKey to be read by viem
     */
    private static _encodeIncentiveKey;
}
//# sourceMappingURL=staker.d.ts.map