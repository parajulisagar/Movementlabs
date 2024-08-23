export declare const v3StakerABI: readonly [{
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
    }];
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
//# sourceMappingURL=V3Staker.d.ts.map