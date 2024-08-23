import { BigintIsh, Currency, CurrencyAmount, TradeType } from '@pancakeswap/swap-sdk-core';
import { Route } from './entities';
import { MethodParameters } from './utils';
/**
 * Optional arguments to send to the quoter.
 */
export interface QuoteOptions {
    /**
     * The optional price limit for the trade.
     */
    sqrtPriceLimitX96?: BigintIsh;
    /**
     * The optional quoter interface to use
     */
    useQuoterV2?: boolean;
}
/**
 * Represents the Pancake V3 QuoterV1 contract with a method for returning the formatted
 * calldata needed to call the quoter contract.
 */
export declare abstract class SwapQuoter {
    static V1ABI: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_deployer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_factory";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_WETH9";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "WETH9";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "deployer";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "factory";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "amount0Delta";
            readonly type: "int256";
        }, {
            readonly internalType: "int256";
            readonly name: "amount1Delta";
            readonly type: "int256";
        }, {
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }];
        readonly name: "pancakeV3SwapCallback";
        readonly outputs: readonly [];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactInput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "tokenIn";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "tokenOut";
            readonly type: "address";
        }, {
            readonly internalType: "uint24";
            readonly name: "fee";
            readonly type: "uint24";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160";
            readonly name: "sqrtPriceLimitX96";
            readonly type: "uint160";
        }];
        readonly name: "quoteExactInputSingle";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "tokenIn";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "tokenOut";
            readonly type: "address";
        }, {
            readonly internalType: "uint24";
            readonly name: "fee";
            readonly type: "uint24";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160";
            readonly name: "sqrtPriceLimitX96";
            readonly type: "uint160";
        }];
        readonly name: "quoteExactOutputSingle";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    static V2ABI: readonly [{
        readonly inputs: readonly [{
            readonly internalType: "address";
            readonly name: "_deployer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_factory";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "_WETH9";
            readonly type: "address";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "constructor";
    }, {
        readonly inputs: readonly [];
        readonly name: "WETH9";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "deployer";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        /**
         * Represents the Pancake V3 QuoterV1 contract with a method for returning the formatted
         * calldata needed to call the quoter contract.
         */
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [];
        readonly name: "factory";
        readonly outputs: readonly [{
            readonly internalType: "address";
            readonly name: "";
            readonly type: "address";
        }];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "int256";
            readonly name: "amount0Delta";
            readonly type: "int256";
        }, {
            readonly internalType: "int256";
            readonly name: "amount1Delta";
            readonly type: "int256";
        }, {
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }];
        readonly name: "pancakeV3SwapCallback";
        readonly outputs: readonly [];
        readonly stateMutability: "view";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactInput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160[]";
            readonly name: "sqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "initializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "tokenIn";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "tokenOut";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amountIn";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint24";
                readonly name: "fee";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint160";
                readonly name: "sqrtPriceLimitX96";
                readonly type: "uint160";
            }];
            readonly internalType: "struct IQuoterV2.QuoteExactInputSingleParams";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "quoteExactInputSingle";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160";
            readonly name: "sqrtPriceX96After";
            readonly type: "uint160";
        }, {
            readonly internalType: "uint32";
            readonly name: "initializedTicksCrossed";
            readonly type: "uint32";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly internalType: "bytes";
            readonly name: "path";
            readonly type: "bytes";
        }, {
            readonly internalType: "uint256";
            readonly name: "amountOut";
            readonly type: "uint256";
        }];
        readonly name: "quoteExactOutput";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160[]";
            readonly name: "sqrtPriceX96AfterList";
            readonly type: "uint160[]";
        }, {
            readonly internalType: "uint32[]";
            readonly name: "initializedTicksCrossedList";
            readonly type: "uint32[]";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }, {
        readonly inputs: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "tokenIn";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "tokenOut";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint24";
                readonly name: "fee";
                readonly type: "uint24";
            }, {
                readonly internalType: "uint160";
                readonly name: "sqrtPriceLimitX96";
                readonly type: "uint160";
            }];
            readonly internalType: "struct IQuoterV2.QuoteExactOutputSingleParams";
            readonly name: "params";
            readonly type: "tuple";
        }];
        readonly name: "quoteExactOutputSingle";
        readonly outputs: readonly [{
            readonly internalType: "uint256";
            readonly name: "amountIn";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint160";
            readonly name: "sqrtPriceX96After";
            readonly type: "uint160";
        }, {
            readonly internalType: "uint32";
            readonly name: "initializedTicksCrossed";
            readonly type: "uint32";
        }, {
            readonly internalType: "uint256";
            readonly name: "gasEstimate";
            readonly type: "uint256";
        }];
        readonly stateMutability: "nonpayable";
        readonly type: "function";
    }];
    /**
     * Produces the on-chain method name of the appropriate function within QuoterV2,
     * and the relevant hex encoded parameters.
     * @template TInput The input token, either Ether or an ERC-20
     * @template TOutput The output token, either Ether or an ERC-20
     * @param route The swap route, a list of pools through which a swap can occur
     * @param amount The amount of the quote, either an amount in, or an amount out
     * @param tradeType The trade type, either exact input or exact output
     * @param options The optional params including price limit and Quoter contract switch
     * @returns The formatted calldata
     */
    static quoteCallParameters<TInput extends Currency, TOutput extends Currency>(route: Route<TInput, TOutput>, amount: CurrencyAmount<TInput | TOutput>, tradeType: TradeType, options?: QuoteOptions): MethodParameters;
}
//# sourceMappingURL=quoter.d.ts.map