export declare const masterChefV3ABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "_CAKE";
        readonly type: "address";
    }, {
        readonly internalType: "contract INonfungiblePositionManager";
        readonly name: "_nonfungiblePositionManager";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "_WETH";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }];
    readonly name: "DuplicatedPool";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InconsistentAmount";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InsufficientAmount";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidNFT";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPeriodDuration";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidPid";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NoBalance";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NoLMPool";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NoLiquidity";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NotEmpty";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NotOwner";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NotOwnerOrOperator";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NotPancakeNFT";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "WrongReceiver";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ZeroAddress";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "allocPoint";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "contract IPancakeV3Pool";
        readonly name: "v3Pool";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "contract ILMPool";
        readonly name: "lmPool";
        readonly type: "address";
    }];
    readonly name: "AddPool";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "liquidity";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "int24";
        readonly name: "tickLower";
        readonly type: "int24";
    }, {
        readonly indexed: false;
        readonly internalType: "int24";
        readonly name: "tickUpper";
        readonly type: "int24";
    }];
    readonly name: "Deposit";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "sender";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "reward";
        readonly type: "uint256";
    }];
    readonly name: "Harvest";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "deployer";
        readonly type: "address";
    }];
    readonly name: "NewLMPoolDeployerAddress";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }];
    readonly name: "NewOperatorAddress";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "periodDuration";
        readonly type: "uint256";
    }];
    readonly name: "NewPeriodDuration";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "receiver";
        readonly type: "address";
    }];
    readonly name: "NewReceiver";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "periodNumber";
        readonly type: "uint256";
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
        readonly internalType: "uint256";
        readonly name: "cakePerSecond";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "cakeAmount";
        readonly type: "uint256";
    }];
    readonly name: "NewUpkeepPeriod";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bool";
        readonly name: "emergency";
        readonly type: "bool";
    }];
    readonly name: "SetEmergency";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "allocPoint";
        readonly type: "uint256";
    }];
    readonly name: "SetPool";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "farmBoostContract";
        readonly type: "address";
    }];
    readonly name: "UpdateFarmBoostContract";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "int128";
        readonly name: "liquidity";
        readonly type: "int128";
    }, {
        readonly indexed: false;
        readonly internalType: "int24";
        readonly name: "tickLower";
        readonly type: "int24";
    }, {
        readonly indexed: false;
        readonly internalType: "int24";
        readonly name: "tickUpper";
        readonly type: "int24";
    }];
    readonly name: "UpdateLiquidity";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "periodNumber";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "oldEndTime";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newEndTime";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "remainingCake";
        readonly type: "uint256";
    }];
    readonly name: "UpdateUpkeepPeriod";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "Withdraw";
    readonly type: "event";
}, {
    readonly inputs: readonly [];
    readonly name: "BOOST_PRECISION";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "CAKE";
    readonly outputs: readonly [{
        readonly internalType: "contract IERC20";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "FARM_BOOSTER";
    readonly outputs: readonly [{
        readonly internalType: "contract IFarmBooster";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "LMPoolDeployer";
    readonly outputs: readonly [{
        readonly internalType: "contract ILMPoolDeployer";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MAX_BOOST_PRECISION";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MAX_DURATION";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "MIN_DURATION";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "PERIOD_DURATION";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "PRECISION";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "WETH";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_allocPoint";
        readonly type: "uint256";
    }, {
        readonly internalType: "contract IPancakeV3Pool";
        readonly name: "_v3Pool";
        readonly type: "address";
    }, {
        readonly internalType: "bool";
        readonly name: "_withUpdate";
        readonly type: "bool";
    }];
    readonly name: "add";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "burn";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "cakeAmountBelongToMC";
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
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "amount0Max";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "amount1Max";
            readonly type: "uint128";
        }];
        readonly internalType: "struct INonfungiblePositionManagerStruct.CollectParams";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly name: "collect";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amount0";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount1";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint128";
            readonly name: "amount0Max";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint128";
            readonly name: "amount1Max";
            readonly type: "uint128";
        }];
        readonly internalType: "struct INonfungiblePositionManagerStruct.CollectParams";
        readonly name: "params";
        readonly type: "tuple";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }];
    readonly name: "collectTo";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amount0";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount1";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint128";
            readonly name: "liquidity";
            readonly type: "uint128";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount0Min";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount1Min";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }];
        readonly internalType: "struct INonfungiblePositionManagerStruct.DecreaseLiquidityParams";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly name: "decreaseLiquidity";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amount0";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount1";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "emergency";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_v3Pool";
        readonly type: "address";
    }];
    readonly name: "getLatestPeriodInfo";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "cakePerSecond";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "endTime";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_pid";
        readonly type: "uint256";
    }];
    readonly name: "getLatestPeriodInfoByPid";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "cakePerSecond";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "endTime";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }];
    readonly name: "harvest";
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
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount0Desired";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount1Desired";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount0Min";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount1Min";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "deadline";
            readonly type: "uint256";
        }];
        readonly internalType: "struct INonfungiblePositionManagerStruct.IncreaseLiquidityParams";
        readonly name: "params";
        readonly type: "tuple";
    }];
    readonly name: "increaseLiquidity";
    readonly outputs: readonly [{
        readonly internalType: "uint128";
        readonly name: "liquidity";
        readonly type: "uint128";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount0";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount1";
        readonly type: "uint256";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestPeriodCakePerSecond";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestPeriodEndTime";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestPeriodNumber";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "latestPeriodStartTime";
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
        readonly name: "_from";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "";
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
    readonly inputs: readonly [];
    readonly name: "operatorAddress";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "pendingCake";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "reward";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "poolInfo";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "allocPoint";
        readonly type: "uint256";
    }, {
        readonly internalType: "contract IPancakeV3Pool";
        readonly name: "v3Pool";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "token0";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "token1";
        readonly type: "address";
    }, {
        readonly internalType: "uint24";
        readonly name: "fee";
        readonly type: "uint24";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalLiquidity";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalBoostLiquidity";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "poolLength";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "receiver";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_pid";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_allocPoint";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_withUpdate";
        readonly type: "bool";
    }];
    readonly name: "set";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bool";
        readonly name: "_emergency";
        readonly type: "bool";
    }];
    readonly name: "setEmergency";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "contract ILMPoolDeployer";
        readonly name: "_LMPoolDeployer";
        readonly type: "address";
    }];
    readonly name: "setLMPoolDeployer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_operatorAddress";
        readonly type: "address";
    }];
    readonly name: "setOperator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_periodDuration";
        readonly type: "uint256";
    }];
    readonly name: "setPeriodDuration";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_receiver";
        readonly type: "address";
    }];
    readonly name: "setReceiver";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amountMinimum";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }];
    readonly name: "sweepToken";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "index";
        readonly type: "uint256";
    }];
    readonly name: "tokenOfOwnerByIndex";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "totalAllocPoint";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amountMinimum";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }];
    readonly name: "unwrapWETH9";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_newMultiplier";
        readonly type: "uint256";
    }];
    readonly name: "updateBoostMultiplier";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "_newFarmBoostContract";
        readonly type: "address";
    }];
    readonly name: "updateFarmBoostContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "updateLiquidity";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "pids";
        readonly type: "uint256[]";
    }];
    readonly name: "updatePools";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "_duration";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "_withUpdate";
        readonly type: "bool";
    }];
    readonly name: "upkeep";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "userPositionInfos";
    readonly outputs: readonly [{
        readonly internalType: "uint128";
        readonly name: "liquidity";
        readonly type: "uint128";
    }, {
        readonly internalType: "uint128";
        readonly name: "boostLiquidity";
        readonly type: "uint128";
    }, {
        readonly internalType: "int24";
        readonly name: "tickLower";
        readonly type: "int24";
    }, {
        readonly internalType: "int24";
        readonly name: "tickUpper";
        readonly type: "int24";
    }, {
        readonly internalType: "uint256";
        readonly name: "rewardGrowthInside";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "reward";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "pid";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "boostMultiplier";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "v3PoolAddressPid";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "_tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "_to";
        readonly type: "address";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "reward";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=MasterChefV3.d.ts.map