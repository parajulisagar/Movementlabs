import JSBI from 'jsbi';
import { Interface } from '@ethersproject/abi';
import invariant from 'tiny-invariant';
import { abi } from '@uniswap/swap-router-contracts/artifacts/contracts/interfaces/IApproveAndCall.sol/IApproveAndCall.json';
import { NonfungiblePositionManager, toHex, Multicall, Payments, Pool, Route as Route$1, Trade as Trade$1, encodeRouteToPath, SelfPermit, Position } from '@uniswap/v3-sdk';
import { abi as abi$1 } from '@uniswap/swap-router-contracts/artifacts/contracts/interfaces/IMulticallExtended.sol/IMulticallExtended.json';
import { validateAndParseAddress, Price, Fraction, CurrencyAmount, TradeType, Percent, sortedInsert, WETH9 } from '@uniswap/sdk-core';
import { abi as abi$2 } from '@uniswap/swap-router-contracts/artifacts/contracts/interfaces/IPeripheryPaymentsWithFeeExtended.sol/IPeripheryPaymentsWithFeeExtended.json';
import { abi as abi$3 } from '@uniswap/swap-router-contracts/artifacts/contracts/interfaces/ISwapRouter02.sol/ISwapRouter02.json';
import { Pair, Route, Trade as Trade$2 } from '@uniswap/v2-sdk';
import { pack } from '@ethersproject/solidity';

var MSG_SENDER = '0x0000000000000000000000000000000000000001';
var ADDRESS_THIS = '0x0000000000000000000000000000000000000002';
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1); // = 1 << 23 or 100000000000000000000000

var V2_FEE_PATH_PLACEHOLDER = 8388608;

var ApprovalTypes;

(function (ApprovalTypes) {
  ApprovalTypes[ApprovalTypes["NOT_REQUIRED"] = 0] = "NOT_REQUIRED";
  ApprovalTypes[ApprovalTypes["MAX"] = 1] = "MAX";
  ApprovalTypes[ApprovalTypes["MAX_MINUS_ONE"] = 2] = "MAX_MINUS_ONE";
  ApprovalTypes[ApprovalTypes["ZERO_THEN_MAX"] = 3] = "ZERO_THEN_MAX";
  ApprovalTypes[ApprovalTypes["ZERO_THEN_MAX_MINUS_ONE"] = 4] = "ZERO_THEN_MAX_MINUS_ONE";
})(ApprovalTypes || (ApprovalTypes = {})); // type guard


function isMint(options) {
  return Object.keys(options).some(function (k) {
    return k === 'recipient';
  });
}
var ApproveAndCall = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function ApproveAndCall() {}

  ApproveAndCall.encodeApproveMax = function encodeApproveMax(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData('approveMax', [token.address]);
  };

  ApproveAndCall.encodeApproveMaxMinusOne = function encodeApproveMaxMinusOne(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData('approveMaxMinusOne', [token.address]);
  };

  ApproveAndCall.encodeApproveZeroThenMax = function encodeApproveZeroThenMax(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData('approveZeroThenMax', [token.address]);
  };

  ApproveAndCall.encodeApproveZeroThenMaxMinusOne = function encodeApproveZeroThenMaxMinusOne(token) {
    return ApproveAndCall.INTERFACE.encodeFunctionData('approveZeroThenMaxMinusOne', [token.address]);
  };

  ApproveAndCall.encodeCallPositionManager = function encodeCallPositionManager(calldatas) {
    !(calldatas.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'NULL_CALLDATA') : invariant(false) : void 0;

    if (calldatas.length == 1) {
      return ApproveAndCall.INTERFACE.encodeFunctionData('callPositionManager', calldatas);
    } else {
      var encodedMulticall = NonfungiblePositionManager.INTERFACE.encodeFunctionData('multicall', [calldatas]);
      return ApproveAndCall.INTERFACE.encodeFunctionData('callPositionManager', [encodedMulticall]);
    }
  }
  /**
   * Encode adding liquidity to a position in the nft manager contract
   * @param position Forcasted position with expected amount out from swap
   * @param minimalPosition Forcasted position with custom minimal token amounts
   * @param addLiquidityOptions Options for adding liquidity
   * @param slippageTolerance Defines maximum slippage
   */
  ;

  ApproveAndCall.encodeAddLiquidity = function encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, slippageTolerance) {
    var _position$mintAmounts = position.mintAmountsWithSlippage(slippageTolerance),
        amount0Min = _position$mintAmounts.amount0,
        amount1Min = _position$mintAmounts.amount1; // position.mintAmountsWithSlippage() can create amounts not dependenable in scenarios
    // such as range orders. Allow the option to provide a position with custom minimum amounts
    // for these scenarios


    if (JSBI.lessThan(minimalPosition.amount0.quotient, amount0Min)) {
      amount0Min = minimalPosition.amount0.quotient;
    }

    if (JSBI.lessThan(minimalPosition.amount1.quotient, amount1Min)) {
      amount1Min = minimalPosition.amount1.quotient;
    }

    if (isMint(addLiquidityOptions)) {
      return ApproveAndCall.INTERFACE.encodeFunctionData('mint', [{
        token0: position.pool.token0.address,
        token1: position.pool.token1.address,
        fee: position.pool.fee,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper,
        amount0Min: toHex(amount0Min),
        amount1Min: toHex(amount1Min),
        recipient: addLiquidityOptions.recipient
      }]);
    } else {
      return ApproveAndCall.INTERFACE.encodeFunctionData('increaseLiquidity', [{
        token0: position.pool.token0.address,
        token1: position.pool.token1.address,
        amount0Min: toHex(amount0Min),
        amount1Min: toHex(amount1Min),
        tokenId: toHex(addLiquidityOptions.tokenId)
      }]);
    }
  };

  ApproveAndCall.encodeApprove = function encodeApprove(token, approvalType) {
    switch (approvalType) {
      case ApprovalTypes.MAX:
        return ApproveAndCall.encodeApproveMax(token.wrapped);

      case ApprovalTypes.MAX_MINUS_ONE:
        return ApproveAndCall.encodeApproveMaxMinusOne(token.wrapped);

      case ApprovalTypes.ZERO_THEN_MAX:
        return ApproveAndCall.encodeApproveZeroThenMax(token.wrapped);

      case ApprovalTypes.ZERO_THEN_MAX_MINUS_ONE:
        return ApproveAndCall.encodeApproveZeroThenMaxMinusOne(token.wrapped);

      default:
        throw 'Error: invalid ApprovalType';
    }
  };

  return ApproveAndCall;
}();
ApproveAndCall.INTERFACE = /*#__PURE__*/new Interface(abi);

function validateAndParseBytes32(bytes32) {
  if (!bytes32.match(/^0x[0-9a-fA-F]{64}$/)) {
    throw new Error(bytes32 + " is not valid bytes32.");
  }

  return bytes32.toLowerCase();
}

var MulticallExtended = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function MulticallExtended() {}

  MulticallExtended.encodeMulticall = function encodeMulticall(calldatas, validation) {
    // if there's no validation, we can just fall back to regular multicall
    if (typeof validation === 'undefined') {
      return Multicall.encodeMulticall(calldatas);
    } // if there is validation, we have to normalize calldatas


    if (!Array.isArray(calldatas)) {
      calldatas = [calldatas];
    } // this means the validation value should be a previousBlockhash


    if (typeof validation === 'string' && validation.startsWith('0x')) {
      var previousBlockhash = validateAndParseBytes32(validation);
      return MulticallExtended.INTERFACE.encodeFunctionData('multicall(bytes32,bytes[])', [previousBlockhash, calldatas]);
    } else {
      var deadline = toHex(validation);
      return MulticallExtended.INTERFACE.encodeFunctionData('multicall(uint256,bytes[])', [deadline, calldatas]);
    }
  };

  return MulticallExtended;
}();
MulticallExtended.INTERFACE = /*#__PURE__*/new Interface(abi$1);

function encodeFeeBips(fee) {
  return toHex(fee.multiply(10000).quotient);
}

var PaymentsExtended = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function PaymentsExtended() {}

  PaymentsExtended.encodeUnwrapWETH9 = function encodeUnwrapWETH9(amountMinimum, recipient, feeOptions) {
    // if there's a recipient, just pass it along
    if (typeof recipient === 'string') {
      return Payments.encodeUnwrapWETH9(amountMinimum, recipient, feeOptions);
    }

    if (!!feeOptions) {
      var feeBips = encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return PaymentsExtended.INTERFACE.encodeFunctionData('unwrapWETH9WithFee(uint256,uint256,address)', [toHex(amountMinimum), feeBips, feeRecipient]);
    } else {
      return PaymentsExtended.INTERFACE.encodeFunctionData('unwrapWETH9(uint256)', [toHex(amountMinimum)]);
    }
  };

  PaymentsExtended.encodeSweepToken = function encodeSweepToken(token, amountMinimum, recipient, feeOptions) {
    // if there's a recipient, just pass it along
    if (typeof recipient === 'string') {
      return Payments.encodeSweepToken(token, amountMinimum, recipient, feeOptions);
    }

    if (!!feeOptions) {
      var feeBips = encodeFeeBips(feeOptions.fee);
      var feeRecipient = validateAndParseAddress(feeOptions.recipient);
      return PaymentsExtended.INTERFACE.encodeFunctionData('sweepTokenWithFee(address,uint256,uint256,address)', [token.address, toHex(amountMinimum), feeBips, feeRecipient]);
    } else {
      return PaymentsExtended.INTERFACE.encodeFunctionData('sweepToken(address,uint256)', [token.address, toHex(amountMinimum)]);
    }
  };

  PaymentsExtended.encodePull = function encodePull(token, amount) {
    return PaymentsExtended.INTERFACE.encodeFunctionData('pull', [token.address, toHex(amount)]);
  };

  PaymentsExtended.encodeWrapETH = function encodeWrapETH(amount) {
    return PaymentsExtended.INTERFACE.encodeFunctionData('wrapETH', [toHex(amount)]);
  };

  return PaymentsExtended;
}();
PaymentsExtended.INTERFACE = /*#__PURE__*/new Interface(abi$2);

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

/**
 * Represents a list of pools or pairs through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */

var MixedRouteSDK = /*#__PURE__*/function () {
  /**
   * Creates an instance of route.
   * @param pools An array of `TPool` objects (pools or pairs), ordered by the route the swap will take
   * @param input The input token
   * @param output The output token
   */
  function MixedRouteSDK(pools, input, output) {
    this._midPrice = null;
    !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
    var chainId = pools[0].chainId;
    var allOnSameChain = pools.every(function (pool) {
      return pool.chainId === chainId;
    });
    !allOnSameChain ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    var wrappedInput = input.wrapped;
    !pools[0].involvesToken(wrappedInput) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
    !pools[pools.length - 1].involvesToken(output.wrapped) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
    /**
     * Normalizes token0-token1 order and selects the next token/fee step to add to the path
     * */

    var tokenPath = [wrappedInput];

    for (var _iterator = _createForOfIteratorHelperLoose(pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pool = _step$value[1];
      var currentInputToken = tokenPath[i];
      !(currentInputToken.equals(pool.token0) || currentInputToken.equals(pool.token1)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PATH') : invariant(false) : void 0;
      var nextToken = currentInputToken.equals(pool.token0) ? pool.token1 : pool.token0;
      tokenPath.push(nextToken);
    }

    this.pools = pools;
    this.path = tokenPath;
    this.input = input;
    this.output = output != null ? output : tokenPath[tokenPath.length - 1];
  }

  _createClass(MixedRouteSDK, [{
    key: "chainId",
    get: function get() {
      return this.pools[0].chainId;
    }
    /**
     * Returns the mid price of the route
     */

  }, {
    key: "midPrice",
    get: function get() {
      if (this._midPrice !== null) return this._midPrice;
      var price = this.pools.slice(1).reduce(function (_ref, pool) {
        var nextInput = _ref.nextInput,
            price = _ref.price;
        return nextInput.equals(pool.token0) ? {
          nextInput: pool.token1,
          price: price.multiply(pool.token0Price)
        } : {
          nextInput: pool.token0,
          price: price.multiply(pool.token1Price)
        };
      }, this.pools[0].token0.equals(this.input.wrapped) ? {
        nextInput: this.pools[0].token1,
        price: this.pools[0].token0Price
      } : {
        nextInput: this.pools[0].token0,
        price: this.pools[0].token1Price
      }).price;
      return this._midPrice = new Price(this.input, this.output, price.denominator, price.numerator);
    }
  }]);

  return MixedRouteSDK;
}();

/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */

function tradeComparator(a, b) {
  // must have same input and output token for comparison
  !a.inputAmount.currency.equals(b.inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY') : invariant(false) : void 0;
  !a.outputAmount.currency.equals(b.outputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY') : invariant(false) : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      var aHops = a.swaps.reduce(function (total, cur) {
        return total + cur.route.path.length;
      }, 0);
      var bHops = b.swaps.reduce(function (total, cur) {
        return total + cur.route.path.length;
      }, 0);
      return aHops - bHops;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}
/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @notice This class is functionally the same as the `Trade` class in the `@uniswap/v3-sdk` package, aside from typing and some input validation.
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 */

var MixedRouteTrade = /*#__PURE__*/function () {
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  function MixedRouteTrade(_ref) {
    var routes = _ref.routes,
        tradeType = _ref.tradeType;
    var inputCurrency = routes[0].inputAmount.currency;
    var outputCurrency = routes[0].outputAmount.currency;
    !routes.every(function (_ref2) {
      var route = _ref2.route;
      return inputCurrency.wrapped.equals(route.input.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY_MATCH') : invariant(false) : void 0;
    !routes.every(function (_ref3) {
      var route = _ref3.route;
      return outputCurrency.wrapped.equals(route.output.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY_MATCH') : invariant(false) : void 0;
    var numPools = routes.map(function (_ref4) {
      var route = _ref4.route;
      return route.pools.length;
    }).reduce(function (total, cur) {
      return total + cur;
    }, 0);
    var poolAddressSet = new Set();

    for (var _iterator = _createForOfIteratorHelperLoose(routes), _step; !(_step = _iterator()).done;) {
      var route = _step.value.route;

      for (var _iterator2 = _createForOfIteratorHelperLoose(route.pools), _step2; !(_step2 = _iterator2()).done;) {
        var pool = _step2.value;
        pool instanceof Pool ? poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee)) : poolAddressSet.add(Pair.getAddress(pool.token0, pool.token1));
      }
    }

    !(numPools == poolAddressSet.size) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS_DUPLICATED') : invariant(false) : void 0;
    !(tradeType === TradeType.EXACT_INPUT) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TRADE_TYPE') : invariant(false) : void 0;
    this.swaps = routes;
    this.tradeType = tradeType;
  }
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */


  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  MixedRouteTrade.fromRoute =
  /*#__PURE__*/
  function () {
    var _fromRoute = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(route, amount, tradeType) {
      var amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput, _outputAmount;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              amounts = new Array(route.path.length);
              !(tradeType === TradeType.EXACT_INPUT) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TRADE_TYPE') : invariant(false) : void 0;
              !amount.currency.equals(route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
              amounts[0] = amount.wrapped;
              i = 0;

            case 5:
              if (!(i < route.path.length - 1)) {
                _context.next = 15;
                break;
              }

              pool = route.pools[i];
              _context.next = 9;
              return pool.getOutputAmount(amounts[i]);

            case 9:
              _yield$pool$getOutput = _context.sent;
              _outputAmount = _yield$pool$getOutput[0];
              amounts[i + 1] = _outputAmount;

            case 12:
              i++;
              _context.next = 5;
              break;

            case 15:
              inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
              outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
              return _context.abrupt("return", new MixedRouteTrade({
                routes: [{
                  inputAmount: inputAmount,
                  outputAmount: outputAmount,
                  route: route
                }],
                tradeType: tradeType
              }));

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function fromRoute(_x, _x2, _x3) {
      return _fromRoute.apply(this, arguments);
    }

    return fromRoute;
  }()
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  ;

  MixedRouteTrade.fromRoutes =
  /*#__PURE__*/
  function () {
    var _fromRoutes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(routes, tradeType) {
      var populatedRoutes, _iterator3, _step3, _step3$value, route, amount, amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput2, _outputAmount2;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              populatedRoutes = [];
              !(tradeType === TradeType.EXACT_INPUT) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TRADE_TYPE') : invariant(false) : void 0;
              _iterator3 = _createForOfIteratorHelperLoose(routes);

            case 3:
              if ((_step3 = _iterator3()).done) {
                _context2.next = 26;
                break;
              }

              _step3$value = _step3.value, route = _step3$value.route, amount = _step3$value.amount;
              amounts = new Array(route.path.length);
              inputAmount = void 0;
              outputAmount = void 0;
              !amount.currency.equals(route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
              inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
              amounts[0] = CurrencyAmount.fromFractionalAmount(route.input.wrapped, amount.numerator, amount.denominator);
              i = 0;

            case 12:
              if (!(i < route.path.length - 1)) {
                _context2.next = 22;
                break;
              }

              pool = route.pools[i];
              _context2.next = 16;
              return pool.getOutputAmount(amounts[i]);

            case 16:
              _yield$pool$getOutput2 = _context2.sent;
              _outputAmount2 = _yield$pool$getOutput2[0];
              amounts[i + 1] = _outputAmount2;

            case 19:
              i++;
              _context2.next = 12;
              break;

            case 22:
              outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
              populatedRoutes.push({
                route: route,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              });

            case 24:
              _context2.next = 3;
              break;

            case 26:
              return _context2.abrupt("return", new MixedRouteTrade({
                routes: populatedRoutes,
                tradeType: tradeType
              }));

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function fromRoutes(_x4, _x5) {
      return _fromRoutes.apply(this, arguments);
    }

    return fromRoutes;
  }()
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;

  MixedRouteTrade.createUncheckedTrade = function createUncheckedTrade(constructorArguments) {
    return new MixedRouteTrade(_extends({}, constructorArguments, {
      routes: [{
        inputAmount: constructorArguments.inputAmount,
        outputAmount: constructorArguments.outputAmount,
        route: constructorArguments.route
      }]
    }));
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;

  MixedRouteTrade.createUncheckedTradeWithMultipleRoutes = function createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new MixedRouteTrade(constructorArguments);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  ;

  var _proto = MixedRouteTrade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }

    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0; /// does not support exactOutput, as enforced in the constructor

    var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
    return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }

    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;
    return amountIn; /// does not support exactOutput
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  ;

  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */
  ;

  MixedRouteTrade.bestTradeExactIn =
  /*#__PURE__*/
  function () {
    var _bestTradeExactIn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(pools, currencyAmountIn, currencyOut, _temp, // used in recursion.
    currentPools, nextAmountIn, bestTrades) {
      var _ref5, _ref5$maxNumResults, maxNumResults, _ref5$maxHops, maxHops, amountIn, tokenOut, i, pool, amountOut, _yield$pool$getOutput3, poolsExcludingThisPool;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _ref5 = _temp === void 0 ? {} : _temp, _ref5$maxNumResults = _ref5.maxNumResults, maxNumResults = _ref5$maxNumResults === void 0 ? 3 : _ref5$maxNumResults, _ref5$maxHops = _ref5.maxHops, maxHops = _ref5$maxHops === void 0 ? 3 : _ref5$maxHops;

              if (currentPools === void 0) {
                currentPools = [];
              }

              if (nextAmountIn === void 0) {
                nextAmountIn = currencyAmountIn;
              }

              if (bestTrades === void 0) {
                bestTrades = [];
              }

              !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
              !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
              !(currencyAmountIn === nextAmountIn || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
              amountIn = nextAmountIn.wrapped;
              tokenOut = currencyOut.wrapped;
              i = 0;

            case 10:
              if (!(i < pools.length)) {
                _context3.next = 49;
                break;
              }

              pool = pools[i]; // pool irrelevant

              if (!(!pool.token0.equals(amountIn.currency) && !pool.token1.equals(amountIn.currency))) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("continue", 46);

            case 14:
              if (!(pool instanceof Pair)) {
                _context3.next = 17;
                break;
              }

              if (!(pool.reserve0.equalTo(ZERO) || pool.reserve1.equalTo(ZERO))) {
                _context3.next = 17;
                break;
              }

              return _context3.abrupt("continue", 46);

            case 17:
              amountOut = void 0;
              _context3.prev = 18;
              _context3.next = 22;
              return pool.getOutputAmount(amountIn);

            case 22:
              _yield$pool$getOutput3 = _context3.sent;
              amountOut = _yield$pool$getOutput3[0];
              _context3.next = 31;
              break;

            case 26:
              _context3.prev = 26;
              _context3.t0 = _context3["catch"](18);

              if (!_context3.t0.isInsufficientInputAmountError) {
                _context3.next = 30;
                break;
              }

              return _context3.abrupt("continue", 46);

            case 30:
              throw _context3.t0;

            case 31:
              if (!(amountOut.currency.isToken && amountOut.currency.equals(tokenOut))) {
                _context3.next = 42;
                break;
              }

              _context3.t1 = sortedInsert;
              _context3.t2 = bestTrades;
              _context3.next = 36;
              return MixedRouteTrade.fromRoute(new MixedRouteSDK([].concat(currentPools, [pool]), currencyAmountIn.currency, currencyOut), currencyAmountIn, TradeType.EXACT_INPUT);

            case 36:
              _context3.t3 = _context3.sent;
              _context3.t4 = maxNumResults;
              _context3.t5 = tradeComparator;
              (0, _context3.t1)(_context3.t2, _context3.t3, _context3.t4, _context3.t5);
              _context3.next = 46;
              break;

            case 42:
              if (!(maxHops > 1 && pools.length > 1)) {
                _context3.next = 46;
                break;
              }

              poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

              _context3.next = 46;
              return MixedRouteTrade.bestTradeExactIn(poolsExcludingThisPool, currencyAmountIn, currencyOut, {
                maxNumResults: maxNumResults,
                maxHops: maxHops - 1
              }, [].concat(currentPools, [pool]), amountOut, bestTrades);

            case 46:
              i++;
              _context3.next = 10;
              break;

            case 49:
              return _context3.abrupt("return", bestTrades);

            case 50:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[18, 26]]);
    }));

    function bestTradeExactIn(_x6, _x7, _x8, _x9, _x10, _x11, _x12) {
      return _bestTradeExactIn.apply(this, arguments);
    }

    return bestTradeExactIn;
  }();

  _createClass(MixedRouteTrade, [{
    key: "route",
    get: function get() {
      !(this.swaps.length == 1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MULTIPLE_ROUTES') : invariant(false) : void 0;
      return this.swaps[0].route;
    }
    /**
     * The input amount for the trade assuming no slippage.
     */

  }, {
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }

      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref6) {
        var inputAmount = _ref6.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
    /**
     * The output amount for the trade assuming no slippage.
     */

  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }

      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref7) {
        var outputAmount = _ref7.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */

  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice;

      return (_this$_executionPrice = this._executionPrice) != null ? _this$_executionPrice : this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the percent difference between the route's mid price and the price impact
     */

  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }

      var spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);

      for (var _iterator4 = _createForOfIteratorHelperLoose(this.swaps), _step4; !(_step4 = _iterator4()).done;) {
        var _step4$value = _step4.value,
            route = _step4$value.route,
            inputAmount = _step4$value.inputAmount;
        var midPrice = route.midPrice;
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
      }

      var priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
      this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);

  return MixedRouteTrade;
}();

var Protocol;

(function (Protocol) {
  Protocol["V2"] = "V2";
  Protocol["V3"] = "V3";
  Protocol["MIXED"] = "MIXED";
})(Protocol || (Protocol = {}));

var RouteV2 = /*#__PURE__*/function (_V2RouteSDK) {
  _inheritsLoose(RouteV2, _V2RouteSDK);

  function RouteV2(v2Route) {
    var _this;

    _this = _V2RouteSDK.call(this, v2Route.pairs, v2Route.input, v2Route.output) || this;
    _this.protocol = Protocol.V2;
    _this.pools = _this.pairs;
    return _this;
  }

  return RouteV2;
}(Route); // V3 route wrapper

var RouteV3 = /*#__PURE__*/function (_V3RouteSDK) {
  _inheritsLoose(RouteV3, _V3RouteSDK);

  function RouteV3(v3Route) {
    var _this2;

    _this2 = _V3RouteSDK.call(this, v3Route.pools, v3Route.input, v3Route.output) || this;
    _this2.protocol = Protocol.V3;
    _this2.path = v3Route.tokenPath;
    return _this2;
  }

  return RouteV3;
}(Route$1); // Mixed route wrapper

var MixedRoute = /*#__PURE__*/function (_MixedRouteSDK) {
  _inheritsLoose(MixedRoute, _MixedRouteSDK);

  function MixedRoute(mixedRoute) {
    var _this3;

    _this3 = _MixedRouteSDK.call(this, mixedRoute.pools, mixedRoute.input, mixedRoute.output) || this;
    _this3.protocol = Protocol.MIXED;
    return _this3;
  }

  return MixedRoute;
}(MixedRouteSDK);

var Trade = /*#__PURE__*/function () {
  //  construct a trade across v2 and v3 routes from pre-computed amounts
  function Trade(_ref) {
    var v2Routes = _ref.v2Routes,
        v3Routes = _ref.v3Routes,
        tradeType = _ref.tradeType,
        mixedRoutes = _ref.mixedRoutes;
    this.swaps = [];
    this.routes = []; // wrap v2 routes

    for (var _iterator = _createForOfIteratorHelperLoose(v2Routes), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          routev2 = _step$value.routev2,
          _inputAmount = _step$value.inputAmount,
          _outputAmount = _step$value.outputAmount;

      var _route = new RouteV2(routev2);

      this.routes.push(_route);
      this.swaps.push({
        route: _route,
        inputAmount: _inputAmount,
        outputAmount: _outputAmount
      });
    } // wrap v3 routes


    for (var _iterator2 = _createForOfIteratorHelperLoose(v3Routes), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          routev3 = _step2$value.routev3,
          _inputAmount2 = _step2$value.inputAmount,
          _outputAmount2 = _step2$value.outputAmount;

      var _route2 = new RouteV3(routev3);

      this.routes.push(_route2);
      this.swaps.push({
        route: _route2,
        inputAmount: _inputAmount2,
        outputAmount: _outputAmount2
      });
    } // wrap mixedRoutes


    if (mixedRoutes) {
      for (var _iterator3 = _createForOfIteratorHelperLoose(mixedRoutes), _step3; !(_step3 = _iterator3()).done;) {
        var _step3$value = _step3.value,
            mixedRoute = _step3$value.mixedRoute,
            inputAmount = _step3$value.inputAmount,
            outputAmount = _step3$value.outputAmount;
        var route = new MixedRoute(mixedRoute);
        this.routes.push(route);
        this.swaps.push({
          route: route,
          inputAmount: inputAmount,
          outputAmount: outputAmount
        });
      }
    }

    this.tradeType = tradeType; // each route must have the same input and output currency

    var inputCurrency = this.swaps[0].inputAmount.currency;
    var outputCurrency = this.swaps[0].outputAmount.currency;
    !this.swaps.every(function (_ref2) {
      var route = _ref2.route;
      return inputCurrency.wrapped.equals(route.input.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY_MATCH') : invariant(false) : void 0;
    !this.swaps.every(function (_ref3) {
      var route = _ref3.route;
      return outputCurrency.wrapped.equals(route.output.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY_MATCH') : invariant(false) : void 0; // pools must be unique inter protocols

    var numPools = this.swaps.map(function (_ref4) {
      var route = _ref4.route;
      return route.pools.length;
    }).reduce(function (total, cur) {
      return total + cur;
    }, 0);
    var poolAddressSet = new Set();

    for (var _iterator4 = _createForOfIteratorHelperLoose(this.swaps), _step4; !(_step4 = _iterator4()).done;) {
      var _route3 = _step4.value.route;

      for (var _iterator5 = _createForOfIteratorHelperLoose(_route3.pools), _step5; !(_step5 = _iterator5()).done;) {
        var pool = _step5.value;

        if (pool instanceof Pool) {
          poolAddressSet.add(Pool.getAddress(pool.token0, pool.token1, pool.fee));
        } else if (pool instanceof Pair) {
          var pair = pool;
          poolAddressSet.add(Pair.getAddress(pair.token0, pair.token1));
        } else {
          throw new Error('Unexpected pool type in route when constructing trade object');
        }
      }
    }

    !(numPools == poolAddressSet.size) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS_DUPLICATED') : invariant(false) : void 0;
  }

  var _proto = Trade.prototype;

  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }

    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      var slippageAdjustedAmountOut = new Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }

    !!slippageTolerance.lessThan(ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      var slippageAdjustedAmountIn = new Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  ;

  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  };

  Trade.fromRoutes = /*#__PURE__*/function () {
    var _fromRoutes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(v2Routes, v3Routes, tradeType, mixedRoutes) {
      var populatedV2Routes, populatedV3Routes, populatedMixedRoutes, _iterator6, _step6, _step6$value, routev2, _amount, v2Trade, _inputAmount3, _outputAmount3, _iterator7, _step7, _step7$value, routev3, _amount2, v3Trade, _inputAmount4, _outputAmount4, _iterator8, _step8, _step8$value, mixedRoute, amount, mixedRouteTrade, inputAmount, outputAmount;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              populatedV2Routes = [];
              populatedV3Routes = [];
              populatedMixedRoutes = [];

              for (_iterator6 = _createForOfIteratorHelperLoose(v2Routes); !(_step6 = _iterator6()).done;) {
                _step6$value = _step6.value, routev2 = _step6$value.routev2, _amount = _step6$value.amount;
                v2Trade = new Trade$2(routev2, _amount, tradeType);
                _inputAmount3 = v2Trade.inputAmount, _outputAmount3 = v2Trade.outputAmount;
                populatedV2Routes.push({
                  routev2: routev2,
                  inputAmount: _inputAmount3,
                  outputAmount: _outputAmount3
                });
              }

              _iterator7 = _createForOfIteratorHelperLoose(v3Routes);

            case 5:
              if ((_step7 = _iterator7()).done) {
                _context.next = 14;
                break;
              }

              _step7$value = _step7.value, routev3 = _step7$value.routev3, _amount2 = _step7$value.amount;
              _context.next = 9;
              return Trade$1.fromRoute(routev3, _amount2, tradeType);

            case 9:
              v3Trade = _context.sent;
              _inputAmount4 = v3Trade.inputAmount, _outputAmount4 = v3Trade.outputAmount;
              populatedV3Routes.push({
                routev3: routev3,
                inputAmount: _inputAmount4,
                outputAmount: _outputAmount4
              });

            case 12:
              _context.next = 5;
              break;

            case 14:
              if (!mixedRoutes) {
                _context.next = 25;
                break;
              }

              _iterator8 = _createForOfIteratorHelperLoose(mixedRoutes);

            case 16:
              if ((_step8 = _iterator8()).done) {
                _context.next = 25;
                break;
              }

              _step8$value = _step8.value, mixedRoute = _step8$value.mixedRoute, amount = _step8$value.amount;
              _context.next = 20;
              return MixedRouteTrade.fromRoute(mixedRoute, amount, tradeType);

            case 20:
              mixedRouteTrade = _context.sent;
              inputAmount = mixedRouteTrade.inputAmount, outputAmount = mixedRouteTrade.outputAmount;
              populatedMixedRoutes.push({
                mixedRoute: mixedRoute,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              });

            case 23:
              _context.next = 16;
              break;

            case 25:
              return _context.abrupt("return", new Trade({
                v2Routes: populatedV2Routes,
                v3Routes: populatedV3Routes,
                mixedRoutes: populatedMixedRoutes,
                tradeType: tradeType
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function fromRoutes(_x, _x2, _x3, _x4) {
      return _fromRoutes.apply(this, arguments);
    }

    return fromRoutes;
  }();

  Trade.fromRoute = /*#__PURE__*/function () {
    var _fromRoute = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(route, amount, tradeType) {
      var v2Routes, v3Routes, mixedRoutes, v2Trade, inputAmount, outputAmount, v3Trade, _inputAmount5, _outputAmount5, mixedRouteTrade, _inputAmount6, _outputAmount6;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              v2Routes = [];
              v3Routes = [];
              mixedRoutes = [];

              if (!(route instanceof Route)) {
                _context2.next = 9;
                break;
              }

              v2Trade = new Trade$2(route, amount, tradeType);
              inputAmount = v2Trade.inputAmount, outputAmount = v2Trade.outputAmount;
              v2Routes = [{
                routev2: route,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              }];
              _context2.next = 26;
              break;

            case 9:
              if (!(route instanceof Route$1)) {
                _context2.next = 17;
                break;
              }

              _context2.next = 12;
              return Trade$1.fromRoute(route, amount, tradeType);

            case 12:
              v3Trade = _context2.sent;
              _inputAmount5 = v3Trade.inputAmount, _outputAmount5 = v3Trade.outputAmount;
              v3Routes = [{
                routev3: route,
                inputAmount: _inputAmount5,
                outputAmount: _outputAmount5
              }];
              _context2.next = 26;
              break;

            case 17:
              if (!(route instanceof MixedRouteSDK)) {
                _context2.next = 25;
                break;
              }

              _context2.next = 20;
              return MixedRouteTrade.fromRoute(route, amount, tradeType);

            case 20:
              mixedRouteTrade = _context2.sent;
              _inputAmount6 = mixedRouteTrade.inputAmount, _outputAmount6 = mixedRouteTrade.outputAmount;
              mixedRoutes = [{
                mixedRoute: route,
                inputAmount: _inputAmount6,
                outputAmount: _outputAmount6
              }];
              _context2.next = 26;
              break;

            case 25:
              throw new Error('Invalid route type');

            case 26:
              return _context2.abrupt("return", new Trade({
                v2Routes: v2Routes,
                v3Routes: v3Routes,
                mixedRoutes: mixedRoutes,
                tradeType: tradeType
              }));

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function fromRoute(_x5, _x6, _x7) {
      return _fromRoute.apply(this, arguments);
    }

    return fromRoute;
  }();

  _createClass(Trade, [{
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }

      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref5) {
        var inputAmount = _ref5.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }

      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref6) {
        var outputAmount = _ref6.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */

  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice;

      return (_this$_executionPrice = this._executionPrice) != null ? _this$_executionPrice : this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the percent difference between the route's mid price and the price impact
     */

  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }

      var spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);

      for (var _iterator9 = _createForOfIteratorHelperLoose(this.swaps), _step9; !(_step9 = _iterator9()).done;) {
        var _step9$value = _step9.value,
            route = _step9$value.route,
            inputAmount = _step9$value.inputAmount;
        var midPrice = route.midPrice;
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
      }

      var priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
      this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);

  return Trade;
}();

/**
 * Converts a route to a hex encoded path
 * @notice only supports exactIn route encodings
 * @param route the mixed path to convert to an encoded path
 * @returns the exactIn encoded path
 */

function encodeMixedRouteToPath(route) {
  var firstInputToken = route.input.wrapped;

  var _route$pools$reduce = route.pools.reduce(function (_ref, pool, index) {
    var inputToken = _ref.inputToken,
        path = _ref.path,
        types = _ref.types;
    var outputToken = pool.token0.equals(inputToken) ? pool.token1 : pool.token0;

    if (index === 0) {
      return {
        inputToken: outputToken,
        types: ['address', 'uint24', 'address'],
        path: [inputToken.address, pool instanceof Pool ? pool.fee : V2_FEE_PATH_PLACEHOLDER, outputToken.address]
      };
    } else {
      return {
        inputToken: outputToken,
        types: [].concat(types, ['uint24', 'address']),
        path: [].concat(path, [pool instanceof Pool ? pool.fee : V2_FEE_PATH_PLACEHOLDER, outputToken.address])
      };
    }
  }, {
    inputToken: firstInputToken,
    path: [],
    types: []
  }),
      path = _route$pools$reduce.path,
      types = _route$pools$reduce.types;

  return pack(types, path);
}

/**
 * Utility function to return each consecutive section of Pools or Pairs in a MixedRoute
 * @param route
 * @returns a nested array of Pools or Pairs in the order of the route
 */

var partitionMixedRouteByProtocol = function partitionMixedRouteByProtocol(route) {
  var acc = [];
  var left = 0;
  var right = 0;

  while (right < route.pools.length) {
    if (route.pools[left] instanceof Pool && route.pools[right] instanceof Pair || route.pools[left] instanceof Pair && route.pools[right] instanceof Pool) {
      acc.push(route.pools.slice(left, right));
      left = right;
    } // seek forward with right pointer


    right++;

    if (right === route.pools.length) {
      /// we reached the end, take the rest
      acc.push(route.pools.slice(left, right));
    }
  }

  return acc;
};
/**
 * Simple utility function to get the output of an array of Pools or Pairs
 * @param pools
 * @param firstInputToken
 * @returns the output token of the last pool in the array
 */

var getOutputOfPools = function getOutputOfPools(pools, firstInputToken) {
  var _pools$reduce = pools.reduce(function (_ref, pool) {
    var inputToken = _ref.inputToken;
    if (!pool.involvesToken(inputToken)) throw new Error('PATH');
    var outputToken = pool.token0.equals(inputToken) ? pool.token1 : pool.token0;
    return {
      inputToken: outputToken
    };
  }, {
    inputToken: firstInputToken
  }),
      outputToken = _pools$reduce.inputToken;

  return outputToken;
};

var ZERO$1 = /*#__PURE__*/JSBI.BigInt(0);
var REFUND_ETH_PRICE_IMPACT_THRESHOLD = /*#__PURE__*/new Percent( /*#__PURE__*/JSBI.BigInt(50), /*#__PURE__*/JSBI.BigInt(100));
/**
 * Represents the Uniswap V2 + V3 SwapRouter02, and has static methods for helping execute trades.
 */

var SwapRouter = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SwapRouter() {}
  /**
   * @notice Generates the calldata for a Swap with a V2 Route.
   * @param trade The V2Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */


  SwapRouter.encodeV2Swap = function encodeV2Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    var amountIn = toHex(trade.maximumAmountIn(options.slippageTolerance).quotient);
    var amountOut = toHex(trade.minimumAmountOut(options.slippageTolerance).quotient);
    var path = trade.route.path.map(function (token) {
      return token.address;
    });
    var recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === 'undefined' ? MSG_SENDER : validateAndParseAddress(options.recipient);

    if (trade.tradeType === TradeType.EXACT_INPUT) {
      var exactInputParams = [amountIn, performAggregatedSlippageCheck ? 0 : amountOut, path, recipient];
      return SwapRouter.INTERFACE.encodeFunctionData('swapExactTokensForTokens', exactInputParams);
    } else {
      var exactOutputParams = [amountOut, amountIn, path, recipient];
      return SwapRouter.INTERFACE.encodeFunctionData('swapTokensForExactTokens', exactOutputParams);
    }
  }
  /**
   * @notice Generates the calldata for a Swap with a V3 Route.
   * @param trade The V3Trade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  ;

  SwapRouter.encodeV3Swap = function encodeV3Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    var calldatas = [];

    for (var _iterator = _createForOfIteratorHelperLoose(trade.swaps), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          route = _step$value.route,
          inputAmount = _step$value.inputAmount,
          outputAmount = _step$value.outputAmount;
      var amountIn = toHex(trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient);
      var amountOut = toHex(trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient); // flag for whether the trade is single hop or not

      var singleHop = route.pools.length === 1;
      var recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === 'undefined' ? MSG_SENDER : validateAndParseAddress(options.recipient);

      if (singleHop) {
        if (trade.tradeType === TradeType.EXACT_INPUT) {
          var exactInputSingleParams = {
            tokenIn: route.tokenPath[0].address,
            tokenOut: route.tokenPath[1].address,
            fee: route.pools[0].fee,
            recipient: recipient,
            amountIn: amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut,
            sqrtPriceLimitX96: 0
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInputSingle', [exactInputSingleParams]));
        } else {
          var exactOutputSingleParams = {
            tokenIn: route.tokenPath[0].address,
            tokenOut: route.tokenPath[1].address,
            fee: route.pools[0].fee,
            recipient: recipient,
            amountOut: amountOut,
            amountInMaximum: amountIn,
            sqrtPriceLimitX96: 0
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactOutputSingle', [exactOutputSingleParams]));
        }
      } else {
        var path = encodeRouteToPath(route, trade.tradeType === TradeType.EXACT_OUTPUT);

        if (trade.tradeType === TradeType.EXACT_INPUT) {
          var exactInputParams = {
            path: path,
            recipient: recipient,
            amountIn: amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInput', [exactInputParams]));
        } else {
          var exactOutputParams = {
            path: path,
            recipient: recipient,
            amountOut: amountOut,
            amountInMaximum: amountIn
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactOutput', [exactOutputParams]));
        }
      }
    }

    return calldatas;
  }
  /**
   * @notice Generates the calldata for a MixedRouteSwap. Since single hop routes are not MixedRoutes, we will instead generate
   *         them via the existing encodeV3Swap and encodeV2Swap methods.
   * @param trade The MixedRouteTrade to encode.
   * @param options SwapOptions to use for the trade.
   * @param routerMustCustody Flag for whether funds should be sent to the router
   * @param performAggregatedSlippageCheck Flag for whether we want to perform an aggregated slippage check
   * @returns A string array of calldatas for the trade.
   */
  ;

  SwapRouter.encodeMixedRouteSwap = function encodeMixedRouteSwap(trade, options, routerMustCustody, performAggregatedSlippageCheck) {
    var calldatas = [];
    !(trade.tradeType === TradeType.EXACT_INPUT) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TRADE_TYPE') : invariant(false) : void 0;

    for (var _iterator2 = _createForOfIteratorHelperLoose(trade.swaps), _step2; !(_step2 = _iterator2()).done;) {
      var _step2$value = _step2.value,
          route = _step2$value.route,
          inputAmount = _step2$value.inputAmount,
          outputAmount = _step2$value.outputAmount;
      var amountIn = toHex(trade.maximumAmountIn(options.slippageTolerance, inputAmount).quotient);
      var amountOut = toHex(trade.minimumAmountOut(options.slippageTolerance, outputAmount).quotient); // flag for whether the trade is single hop or not

      var singleHop = route.pools.length === 1;
      var recipient = routerMustCustody ? ADDRESS_THIS : typeof options.recipient === 'undefined' ? MSG_SENDER : validateAndParseAddress(options.recipient);

      var mixedRouteIsAllV3 = function mixedRouteIsAllV3(route) {
        return route.pools.every(function (pool) {
          return pool instanceof Pool;
        });
      };

      if (singleHop) {
        /// For single hop, since it isn't really a mixedRoute, we'll just mimic behavior of V3 or V2
        /// We don't use encodeV3Swap() or encodeV2Swap() because casting the trade to a V3Trade or V2Trade is overcomplex
        if (mixedRouteIsAllV3(route)) {
          var exactInputSingleParams = {
            tokenIn: route.path[0].address,
            tokenOut: route.path[1].address,
            fee: route.pools[0].fee,
            recipient: recipient,
            amountIn: amountIn,
            amountOutMinimum: performAggregatedSlippageCheck ? 0 : amountOut,
            sqrtPriceLimitX96: 0
          };
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInputSingle', [exactInputSingleParams]));
        } else {
          var path = route.path.map(function (token) {
            return token.address;
          });
          var exactInputParams = [amountIn, performAggregatedSlippageCheck ? 0 : amountOut, path, recipient];
          calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('swapExactTokensForTokens', exactInputParams));
        }
      } else {
        (function () {
          var sections = partitionMixedRouteByProtocol(route);

          var isLastSectionInRoute = function isLastSectionInRoute(i) {
            return i === sections.length - 1;
          };

          var outputToken = void 0;
          var inputToken = route.input.wrapped;

          for (var i = 0; i < sections.length; i++) {
            var section = sections[i]; /// Now, we get output of this section

            outputToken = getOutputOfPools(section, inputToken);
            var newRouteOriginal = new MixedRouteSDK([].concat(section), section[0].token0.equals(inputToken) ? section[0].token0 : section[0].token1, outputToken);
            var newRoute = new MixedRoute(newRouteOriginal); /// Previous output is now input

            inputToken = outputToken;

            if (mixedRouteIsAllV3(newRoute)) {
              var _path = encodeMixedRouteToPath(newRoute);

              var _exactInputParams = {
                path: _path,
                // By default router holds funds until the last swap, then it is sent to the recipient
                // special case exists where we are unwrapping WETH output, in which case `routerMustCustody` is set to true
                // and router still holds the funds. That logic bundled into how the value of `recipient` is calculated
                recipient: isLastSectionInRoute(i) ? recipient : ADDRESS_THIS,
                amountIn: i == 0 ? amountIn : 0,
                amountOutMinimum: !isLastSectionInRoute(i) ? 0 : amountOut
              };
              calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('exactInput', [_exactInputParams]));
            } else {
              var _exactInputParams2 = [i == 0 ? amountIn : 0, !isLastSectionInRoute(i) ? 0 : amountOut, newRoute.path.map(function (token) {
                return token.address;
              }), isLastSectionInRoute(i) ? recipient : ADDRESS_THIS];
              calldatas.push(SwapRouter.INTERFACE.encodeFunctionData('swapExactTokensForTokens', _exactInputParams2));
            }
          }
        })();
      }
    }

    return calldatas;
  };

  SwapRouter.encodeSwaps = function encodeSwaps(trades, options, isSwapAndAdd) {
    // If dealing with an instance of the aggregated Trade object, unbundle it to individual trade objects.
    if (trades instanceof Trade) {
      !trades.swaps.every(function (swap) {
        return swap.route.protocol == Protocol.V3 || swap.route.protocol == Protocol.V2 || swap.route.protocol == Protocol.MIXED;
      }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'UNSUPPORTED_PROTOCOL') : invariant(false) : void 0;
      var individualTrades = [];

      for (var _iterator3 = _createForOfIteratorHelperLoose(trades.swaps), _step3; !(_step3 = _iterator3()).done;) {
        var _step3$value = _step3.value,
            route = _step3$value.route,
            inputAmount = _step3$value.inputAmount,
            outputAmount = _step3$value.outputAmount;

        if (route.protocol == Protocol.V2) {
          individualTrades.push(new Trade$2(route, trades.tradeType == TradeType.EXACT_INPUT ? inputAmount : outputAmount, trades.tradeType));
        } else if (route.protocol == Protocol.V3) {
          individualTrades.push(Trade$1.createUncheckedTrade({
            route: route,
            inputAmount: inputAmount,
            outputAmount: outputAmount,
            tradeType: trades.tradeType
          }));
        } else if (route.protocol == Protocol.MIXED) {
          individualTrades.push( /// we can change the naming of this function on MixedRouteTrade if needed
          MixedRouteTrade.createUncheckedTrade({
            route: route,
            inputAmount: inputAmount,
            outputAmount: outputAmount,
            tradeType: trades.tradeType
          }));
        } else {
          throw new Error('UNSUPPORTED_TRADE_PROTOCOL');
        }
      }

      trades = individualTrades;
    }

    if (!Array.isArray(trades)) {
      trades = [trades];
    }

    var numberOfTrades = trades.reduce(function (numberOfTrades, trade) {
      return numberOfTrades + (trade instanceof Trade$1 || trade instanceof MixedRouteTrade ? trade.swaps.length : 1);
    }, 0);
    var sampleTrade = trades[0]; // All trades should have the same starting/ending currency and trade type

    !trades.every(function (trade) {
      return trade.inputAmount.currency.equals(sampleTrade.inputAmount.currency);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_IN_DIFF') : invariant(false) : void 0;
    !trades.every(function (trade) {
      return trade.outputAmount.currency.equals(sampleTrade.outputAmount.currency);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN_OUT_DIFF') : invariant(false) : void 0;
    !trades.every(function (trade) {
      return trade.tradeType === sampleTrade.tradeType;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TRADE_TYPE_DIFF') : invariant(false) : void 0;
    var calldatas = [];
    var inputIsNative = sampleTrade.inputAmount.currency.isNative;
    var outputIsNative = sampleTrade.outputAmount.currency.isNative; // flag for whether we want to perform an aggregated slippage check
    //   1. when there are >2 exact input trades. this is only a heuristic,
    //      as it's still more gas-expensive even in this case, but has benefits
    //      in that the reversion probability is lower

    var performAggregatedSlippageCheck = sampleTrade.tradeType === TradeType.EXACT_INPUT && numberOfTrades > 2; // flag for whether funds should be send first to the router
    //   1. when receiving ETH (which much be unwrapped from WETH)
    //   2. when a fee on the output is being taken
    //   3. when performing swap and add
    //   4. when performing an aggregated slippage check

    var routerMustCustody = outputIsNative || !!options.fee || !!isSwapAndAdd || performAggregatedSlippageCheck; // encode permit if necessary

    if (options.inputTokenPermit) {
      !sampleTrade.inputAmount.currency.isToken ? process.env.NODE_ENV !== "production" ? invariant(false, 'NON_TOKEN_PERMIT') : invariant(false) : void 0;
      calldatas.push(SelfPermit.encodePermit(sampleTrade.inputAmount.currency, options.inputTokenPermit));
    }

    for (var _iterator4 = _createForOfIteratorHelperLoose(trades), _step4; !(_step4 = _iterator4()).done;) {
      var trade = _step4.value;

      if (trade instanceof Trade$2) {
        calldatas.push(SwapRouter.encodeV2Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck));
      } else if (trade instanceof Trade$1) {
        for (var _iterator5 = _createForOfIteratorHelperLoose(SwapRouter.encodeV3Swap(trade, options, routerMustCustody, performAggregatedSlippageCheck)), _step5; !(_step5 = _iterator5()).done;) {
          var calldata = _step5.value;
          calldatas.push(calldata);
        }
      } else if (trade instanceof MixedRouteTrade) {
        for (var _iterator6 = _createForOfIteratorHelperLoose(SwapRouter.encodeMixedRouteSwap(trade, options, routerMustCustody, performAggregatedSlippageCheck)), _step6; !(_step6 = _iterator6()).done;) {
          var _calldata = _step6.value;
          calldatas.push(_calldata);
        }
      } else {
        throw new Error('Unsupported trade object');
      }
    }

    var ZERO_IN = CurrencyAmount.fromRawAmount(sampleTrade.inputAmount.currency, 0);
    var ZERO_OUT = CurrencyAmount.fromRawAmount(sampleTrade.outputAmount.currency, 0);
    var minimumAmountOut = trades.reduce(function (sum, trade) {
      return sum.add(trade.minimumAmountOut(options.slippageTolerance));
    }, ZERO_OUT);
    var quoteAmountOut = trades.reduce(function (sum, trade) {
      return sum.add(trade.outputAmount);
    }, ZERO_OUT);
    var totalAmountIn = trades.reduce(function (sum, trade) {
      return sum.add(trade.maximumAmountIn(options.slippageTolerance));
    }, ZERO_IN);
    return {
      calldatas: calldatas,
      sampleTrade: sampleTrade,
      routerMustCustody: routerMustCustody,
      inputIsNative: inputIsNative,
      outputIsNative: outputIsNative,
      totalAmountIn: totalAmountIn,
      minimumAmountOut: minimumAmountOut,
      quoteAmountOut: quoteAmountOut
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  ;

  SwapRouter.swapCallParameters = function swapCallParameters(trades, options) {
    var _SwapRouter$encodeSwa = SwapRouter.encodeSwaps(trades, options),
        calldatas = _SwapRouter$encodeSwa.calldatas,
        sampleTrade = _SwapRouter$encodeSwa.sampleTrade,
        routerMustCustody = _SwapRouter$encodeSwa.routerMustCustody,
        inputIsNative = _SwapRouter$encodeSwa.inputIsNative,
        outputIsNative = _SwapRouter$encodeSwa.outputIsNative,
        totalAmountIn = _SwapRouter$encodeSwa.totalAmountIn,
        minimumAmountOut = _SwapRouter$encodeSwa.minimumAmountOut; // unwrap or sweep


    if (routerMustCustody) {
      if (outputIsNative) {
        calldatas.push(PaymentsExtended.encodeUnwrapWETH9(minimumAmountOut.quotient, options.recipient, options.fee));
      } else {
        calldatas.push(PaymentsExtended.encodeSweepToken(sampleTrade.outputAmount.currency.wrapped, minimumAmountOut.quotient, options.recipient, options.fee));
      }
    } // must refund when paying in ETH: either with an uncertain input amount OR if there's a chance of a partial fill.
    // unlike ERC20's, the full ETH value must be sent in the transaction, so the rest must be refunded.


    if (inputIsNative && (sampleTrade.tradeType === TradeType.EXACT_OUTPUT || SwapRouter.riskOfPartialFill(trades))) {
      calldatas.push(Payments.encodeRefundETH());
    }

    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: toHex(inputIsNative ? totalAmountIn.quotient : ZERO$1)
    };
  }
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  ;

  SwapRouter.swapAndAddCallParameters = function swapAndAddCallParameters(trades, options, position, addLiquidityOptions, tokenInApprovalType, tokenOutApprovalType) {
    var _SwapRouter$encodeSwa2 = SwapRouter.encodeSwaps(trades, options, true),
        calldatas = _SwapRouter$encodeSwa2.calldatas,
        inputIsNative = _SwapRouter$encodeSwa2.inputIsNative,
        outputIsNative = _SwapRouter$encodeSwa2.outputIsNative,
        sampleTrade = _SwapRouter$encodeSwa2.sampleTrade,
        totalAmountSwapped = _SwapRouter$encodeSwa2.totalAmountIn,
        quoteAmountOut = _SwapRouter$encodeSwa2.quoteAmountOut,
        minimumAmountOut = _SwapRouter$encodeSwa2.minimumAmountOut; // encode output token permit if necessary


    if (options.outputTokenPermit) {
      !quoteAmountOut.currency.isToken ? process.env.NODE_ENV !== "production" ? invariant(false, 'NON_TOKEN_PERMIT_OUTPUT') : invariant(false) : void 0;
      calldatas.push(SelfPermit.encodePermit(quoteAmountOut.currency, options.outputTokenPermit));
    }

    var chainId = sampleTrade.route.chainId;
    var zeroForOne = position.pool.token0.wrapped.address === totalAmountSwapped.currency.wrapped.address;

    var _SwapRouter$getPositi = SwapRouter.getPositionAmounts(position, zeroForOne),
        positionAmountIn = _SwapRouter$getPositi.positionAmountIn,
        positionAmountOut = _SwapRouter$getPositi.positionAmountOut; // if tokens are native they will be converted to WETH9


    var tokenIn = inputIsNative ? WETH9[chainId] : positionAmountIn.currency.wrapped;
    var tokenOut = outputIsNative ? WETH9[chainId] : positionAmountOut.currency.wrapped; // if swap output does not make up whole outputTokenBalanceDesired, pull in remaining tokens for adding liquidity

    var amountOutRemaining = positionAmountOut.subtract(quoteAmountOut.wrapped);

    if (amountOutRemaining.greaterThan(CurrencyAmount.fromRawAmount(positionAmountOut.currency, 0))) {
      // if output is native, this means the remaining portion is included as native value in the transaction
      // and must be wrapped. Otherwise, pull in remaining ERC20 token.
      outputIsNative ? calldatas.push(PaymentsExtended.encodeWrapETH(amountOutRemaining.quotient)) : calldatas.push(PaymentsExtended.encodePull(tokenOut, amountOutRemaining.quotient));
    } // if input is native, convert to WETH9, else pull ERC20 token


    inputIsNative ? calldatas.push(PaymentsExtended.encodeWrapETH(positionAmountIn.quotient)) : calldatas.push(PaymentsExtended.encodePull(tokenIn, positionAmountIn.quotient)); // approve token balances to NFTManager

    if (tokenInApprovalType !== ApprovalTypes.NOT_REQUIRED) calldatas.push(ApproveAndCall.encodeApprove(tokenIn, tokenInApprovalType));
    if (tokenOutApprovalType !== ApprovalTypes.NOT_REQUIRED) calldatas.push(ApproveAndCall.encodeApprove(tokenOut, tokenOutApprovalType)); // represents a position with token amounts resulting from a swap with maximum slippage
    // hence the minimal amount out possible.

    var minimalPosition = Position.fromAmounts({
      pool: position.pool,
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
      amount0: zeroForOne ? position.amount0.quotient.toString() : minimumAmountOut.quotient.toString(),
      amount1: zeroForOne ? minimumAmountOut.quotient.toString() : position.amount1.quotient.toString(),
      useFullPrecision: false
    }); // encode NFTManager add liquidity

    calldatas.push(ApproveAndCall.encodeAddLiquidity(position, minimalPosition, addLiquidityOptions, options.slippageTolerance)); // sweep remaining tokens

    inputIsNative ? calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO$1)) : calldatas.push(PaymentsExtended.encodeSweepToken(tokenIn, ZERO$1));
    outputIsNative ? calldatas.push(PaymentsExtended.encodeUnwrapWETH9(ZERO$1)) : calldatas.push(PaymentsExtended.encodeSweepToken(tokenOut, ZERO$1));
    var value;

    if (inputIsNative) {
      value = totalAmountSwapped.wrapped.add(positionAmountIn.wrapped).quotient;
    } else if (outputIsNative) {
      value = amountOutRemaining.quotient;
    } else {
      value = ZERO$1;
    }

    return {
      calldata: MulticallExtended.encodeMulticall(calldatas, options.deadlineOrPreviousBlockhash),
      value: value.toString()
    };
  } // if price impact is very high, there's a chance of hitting max/min prices resulting in a partial fill of the swap
  ;

  SwapRouter.riskOfPartialFill = function riskOfPartialFill(trades) {
    if (Array.isArray(trades)) {
      return trades.some(function (trade) {
        return SwapRouter.v3TradeWithHighPriceImpact(trade);
      });
    } else {
      return SwapRouter.v3TradeWithHighPriceImpact(trades);
    }
  };

  SwapRouter.v3TradeWithHighPriceImpact = function v3TradeWithHighPriceImpact(trade) {
    return !(trade instanceof Trade$2) && trade.priceImpact.greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD);
  };

  SwapRouter.getPositionAmounts = function getPositionAmounts(position, zeroForOne) {
    var _position$mintAmounts = position.mintAmounts,
        amount0 = _position$mintAmounts.amount0,
        amount1 = _position$mintAmounts.amount1;
    var currencyAmount0 = CurrencyAmount.fromRawAmount(position.pool.token0, amount0);
    var currencyAmount1 = CurrencyAmount.fromRawAmount(position.pool.token1, amount1);

    var _ref = zeroForOne ? [currencyAmount0, currencyAmount1] : [currencyAmount1, currencyAmount0],
        positionAmountIn = _ref[0],
        positionAmountOut = _ref[1];

    return {
      positionAmountIn: positionAmountIn,
      positionAmountOut: positionAmountOut
    };
  };

  return SwapRouter;
}();
SwapRouter.INTERFACE = /*#__PURE__*/new Interface(abi$3);

export { ADDRESS_THIS, ApprovalTypes, ApproveAndCall, MSG_SENDER, MixedRoute, MixedRouteSDK, MixedRouteTrade, MulticallExtended, ONE, PaymentsExtended, Protocol, RouteV2, RouteV3, SwapRouter, Trade, V2_FEE_PATH_PLACEHOLDER, ZERO, encodeMixedRouteToPath, getOutputOfPools, isMint, partitionMixedRouteByProtocol, tradeComparator };
//# sourceMappingURL=router-sdk.esm.js.map
