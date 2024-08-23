'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var invariant = _interopDefault(require('tiny-invariant'));
var hash = require('@ethersproject/hash');
var bignumber = require('@ethersproject/bignumber');
var contracts = require('@ethersproject/contracts');

// @deprecated please use permit2Address(chainId: number)
var PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3';
function permit2Address(chainId) {
  switch (chainId) {
    case 324:
      return '0x0000000000225e31D15943971F47aD3022F714Fa';
    default:
      return PERMIT2_ADDRESS;
  }
}
var MaxUint48 = /*#__PURE__*/bignumber.BigNumber.from('0xffffffffffff');
var MaxUint160 = /*#__PURE__*/bignumber.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffff');
var MaxUint256 = /*#__PURE__*/bignumber.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
// alias max types for their usages
// allowance transfer types
var MaxAllowanceTransferAmount = MaxUint160;
var MaxAllowanceExpiration = MaxUint48;
var MaxOrderedNonce = MaxUint48;
// signature transfer types
var MaxSignatureTransferAmount = MaxUint256;
var MaxUnorderedNonce = MaxUint256;
var MaxSigDeadline = MaxUint256;
var InstantExpiration = /*#__PURE__*/bignumber.BigNumber.from(0);

var PERMIT2_DOMAIN_NAME = 'Permit2';
function permit2Domain(permit2Address, chainId) {
  return {
    name: PERMIT2_DOMAIN_NAME,
    chainId: chainId,
    verifyingContract: permit2Address
  };
}

var PERMIT_DETAILS = [{
  name: 'token',
  type: 'address'
}, {
  name: 'amount',
  type: 'uint160'
}, {
  name: 'expiration',
  type: 'uint48'
}, {
  name: 'nonce',
  type: 'uint48'
}];
var PERMIT_TYPES = {
  PermitSingle: [{
    name: 'details',
    type: 'PermitDetails'
  }, {
    name: 'spender',
    type: 'address'
  }, {
    name: 'sigDeadline',
    type: 'uint256'
  }],
  PermitDetails: PERMIT_DETAILS
};
var PERMIT_BATCH_TYPES = {
  PermitBatch: [{
    name: 'details',
    type: 'PermitDetails[]'
  }, {
    name: 'spender',
    type: 'address'
  }, {
    name: 'sigDeadline',
    type: 'uint256'
  }],
  PermitDetails: PERMIT_DETAILS
};
function isPermit(permit) {
  return !Array.isArray(permit.details);
}
var AllowanceTransfer = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function AllowanceTransfer() {}
  // return the data to be sent in a eth_signTypedData RPC call
  // for signing the given permit data
  AllowanceTransfer.getPermitData = function getPermitData(permit, permit2Address, chainId) {
    !MaxSigDeadline.gte(permit.sigDeadline) ?  invariant(false, 'SIG_DEADLINE_OUT_OF_RANGE')  : void 0;
    var domain = permit2Domain(permit2Address, chainId);
    if (isPermit(permit)) {
      validatePermitDetails(permit.details);
      return {
        domain: domain,
        types: PERMIT_TYPES,
        values: permit
      };
    } else {
      permit.details.forEach(validatePermitDetails);
      return {
        domain: domain,
        types: PERMIT_BATCH_TYPES,
        values: permit
      };
    }
  };
  AllowanceTransfer.hash = function hash$1(permit, permit2Address, chainId) {
    var _AllowanceTransfer$ge = AllowanceTransfer.getPermitData(permit, permit2Address, chainId),
      domain = _AllowanceTransfer$ge.domain,
      types = _AllowanceTransfer$ge.types,
      values = _AllowanceTransfer$ge.values;
    return hash._TypedDataEncoder.hash(domain, types, values);
  };
  return AllowanceTransfer;
}();
function validatePermitDetails(details) {
  !MaxOrderedNonce.gte(details.nonce) ?  invariant(false, 'NONCE_OUT_OF_RANGE')  : void 0;
  !MaxAllowanceTransferAmount.gte(details.amount) ?  invariant(false, 'AMOUNT_OUT_OF_RANGE')  : void 0;
  !MaxAllowanceExpiration.gte(details.expiration) ?  invariant(false, 'EXPIRATION_OUT_OF_RANGE')  : void 0;
}

function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
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
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

var TOKEN_PERMISSIONS = [{
  name: 'token',
  type: 'address'
}, {
  name: 'amount',
  type: 'uint256'
}];
var PERMIT_TRANSFER_FROM_TYPES = {
  PermitTransferFrom: [{
    name: 'permitted',
    type: 'TokenPermissions'
  }, {
    name: 'spender',
    type: 'address'
  }, {
    name: 'nonce',
    type: 'uint256'
  }, {
    name: 'deadline',
    type: 'uint256'
  }],
  TokenPermissions: TOKEN_PERMISSIONS
};
var PERMIT_BATCH_TRANSFER_FROM_TYPES = {
  PermitBatchTransferFrom: [{
    name: 'permitted',
    type: 'TokenPermissions[]'
  }, {
    name: 'spender',
    type: 'address'
  }, {
    name: 'nonce',
    type: 'uint256'
  }, {
    name: 'deadline',
    type: 'uint256'
  }],
  TokenPermissions: TOKEN_PERMISSIONS
};
function permitTransferFromWithWitnessType(witness) {
  return _extends({
    PermitWitnessTransferFrom: [{
      name: 'permitted',
      type: 'TokenPermissions'
    }, {
      name: 'spender',
      type: 'address'
    }, {
      name: 'nonce',
      type: 'uint256'
    }, {
      name: 'deadline',
      type: 'uint256'
    }, {
      name: 'witness',
      type: witness.witnessTypeName
    }],
    TokenPermissions: TOKEN_PERMISSIONS
  }, witness.witnessType);
}
function permitBatchTransferFromWithWitnessType(witness) {
  return _extends({
    PermitBatchWitnessTransferFrom: [{
      name: 'permitted',
      type: 'TokenPermissions[]'
    }, {
      name: 'spender',
      type: 'address'
    }, {
      name: 'nonce',
      type: 'uint256'
    }, {
      name: 'deadline',
      type: 'uint256'
    }, {
      name: 'witness',
      type: witness.witnessTypeName
    }],
    TokenPermissions: TOKEN_PERMISSIONS
  }, witness.witnessType);
}
function isPermitTransferFrom(permit) {
  return !Array.isArray(permit.permitted);
}
var SignatureTransfer = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SignatureTransfer() {}
  // return the data to be sent in a eth_signTypedData RPC call
  // for signing the given permit data
  SignatureTransfer.getPermitData = function getPermitData(permit, permit2Address, chainId, witness) {
    !MaxSigDeadline.gte(permit.deadline) ?  invariant(false, 'SIG_DEADLINE_OUT_OF_RANGE')  : void 0;
    !MaxUnorderedNonce.gte(permit.nonce) ?  invariant(false, 'NONCE_OUT_OF_RANGE')  : void 0;
    var domain = permit2Domain(permit2Address, chainId);
    if (isPermitTransferFrom(permit)) {
      validateTokenPermissions(permit.permitted);
      var types = witness ? permitTransferFromWithWitnessType(witness) : PERMIT_TRANSFER_FROM_TYPES;
      var values = witness ? Object.assign(permit, {
        witness: witness.witness
      }) : permit;
      return {
        domain: domain,
        types: types,
        values: values
      };
    } else {
      permit.permitted.forEach(validateTokenPermissions);
      var _types = witness ? permitBatchTransferFromWithWitnessType(witness) : PERMIT_BATCH_TRANSFER_FROM_TYPES;
      var _values = witness ? Object.assign(permit, {
        witness: witness.witness
      }) : permit;
      return {
        domain: domain,
        types: _types,
        values: _values
      };
    }
  };
  SignatureTransfer.hash = function hash$1(permit, permit2Address, chainId, witness) {
    var _SignatureTransfer$ge = SignatureTransfer.getPermitData(permit, permit2Address, chainId, witness),
      domain = _SignatureTransfer$ge.domain,
      types = _SignatureTransfer$ge.types,
      values = _SignatureTransfer$ge.values;
    return hash._TypedDataEncoder.hash(domain, types, values);
  };
  return SignatureTransfer;
}();
function validateTokenPermissions(permissions) {
  !MaxSignatureTransferAmount.gte(permissions.amount) ?  invariant(false, 'AMOUNT_OUT_OF_RANGE')  : void 0;
}

var Permit2Abi = [
	{
		inputs: [
		],
		name: "AllowanceExpired",
		type: "error"
	},
	{
		inputs: [
		],
		name: "ExcessiveInvalidation",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InsufficientAllowance",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidAmount",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidContractSignature",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidNonce",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidSignature",
		type: "error"
	},
	{
		inputs: [
		],
		name: "InvalidSigner",
		type: "error"
	},
	{
		inputs: [
		],
		name: "LengthMismatch",
		type: "error"
	},
	{
		inputs: [
		],
		name: "NotSpender",
		type: "error"
	},
	{
		inputs: [
		],
		name: "SignatureExpired",
		type: "error"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint160",
				name: "amount",
				type: "uint160"
			},
			{
				indexed: false,
				internalType: "uint48",
				name: "expiration",
				type: "uint48"
			}
		],
		name: "Approval",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: false,
				internalType: "address",
				name: "spender",
				type: "address"
			}
		],
		name: "Lockdown",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				indexed: true,
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint48",
				name: "newNonce",
				type: "uint48"
			},
			{
				indexed: false,
				internalType: "uint48",
				name: "oldNonce",
				type: "uint48"
			}
		],
		name: "NonceInvalidation",
		type: "event"
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "word",
				type: "uint256"
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "mask",
				type: "uint256"
			}
		],
		name: "UnorderedNonceInvalidation",
		type: "event"
	},
	{
		inputs: [
		],
		name: "DOMAIN_SEPARATOR",
		outputs: [
			{
				internalType: "bytes32",
				name: "",
				type: "bytes32"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "address",
				name: "",
				type: "address"
			}
		],
		name: "allowance",
		outputs: [
			{
				internalType: "uint160",
				name: "amount",
				type: "uint160"
			},
			{
				internalType: "uint48",
				name: "expiration",
				type: "uint48"
			},
			{
				internalType: "uint48",
				name: "nonce",
				type: "uint48"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint160",
				name: "amount",
				type: "uint160"
			},
			{
				internalType: "uint48",
				name: "expiration",
				type: "uint48"
			}
		],
		name: "approve",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "spender",
				type: "address"
			},
			{
				internalType: "uint48",
				name: "newNonce",
				type: "uint48"
			}
		],
		name: "invalidateNonces",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "wordPos",
				type: "uint256"
			},
			{
				internalType: "uint256",
				name: "mask",
				type: "uint256"
			}
		],
		name: "invalidateUnorderedNonces",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						internalType: "address",
						name: "token",
						type: "address"
					},
					{
						internalType: "address",
						name: "spender",
						type: "address"
					}
				],
				internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
				name: "approvals",
				type: "tuple[]"
			}
		],
		name: "lockdown",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		name: "nonceBitmap",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256"
			}
		],
		stateMutability: "view",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint160",
								name: "amount",
								type: "uint160"
							},
							{
								internalType: "uint48",
								name: "expiration",
								type: "uint48"
							},
							{
								internalType: "uint48",
								name: "nonce",
								type: "uint48"
							}
						],
						internalType: "struct IAllowanceTransfer.PermitDetails[]",
						name: "details",
						type: "tuple[]"
					},
					{
						internalType: "address",
						name: "spender",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "sigDeadline",
						type: "uint256"
					}
				],
				internalType: "struct IAllowanceTransfer.PermitBatch",
				name: "permitBatch",
				type: "tuple"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint160",
								name: "amount",
								type: "uint160"
							},
							{
								internalType: "uint48",
								name: "expiration",
								type: "uint48"
							},
							{
								internalType: "uint48",
								name: "nonce",
								type: "uint48"
							}
						],
						internalType: "struct IAllowanceTransfer.PermitDetails",
						name: "details",
						type: "tuple"
					},
					{
						internalType: "address",
						name: "spender",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "sigDeadline",
						type: "uint256"
					}
				],
				internalType: "struct IAllowanceTransfer.PermitSingle",
				name: "permitSingle",
				type: "tuple"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permit",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions[]",
						name: "permitted",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "requestedAmount",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
				name: "transferDetails",
				type: "tuple[]"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions",
						name: "permitted",
						type: "tuple"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "requestedAmount",
				type: "uint256"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions",
						name: "permitted",
						type: "tuple"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint256",
				name: "requestedAmount",
				type: "uint256"
			},
			{
				internalType: "bytes32",
				name: "witness",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "witnessTypeName",
				type: "string"
			},
			{
				internalType: "string",
				name: "witnessType",
				type: "string"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitWitnessTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				components: [
					{
						components: [
							{
								internalType: "address",
								name: "token",
								type: "address"
							},
							{
								internalType: "uint256",
								name: "amount",
								type: "uint256"
							}
						],
						internalType: "struct ISignatureTransfer.TokenPermissions[]",
						name: "permitted",
						type: "tuple[]"
					},
					{
						internalType: "uint256",
						name: "nonce",
						type: "uint256"
					},
					{
						internalType: "uint256",
						name: "deadline",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
				name: "permit",
				type: "tuple"
			},
			{
				internalType: "address",
				name: "owner",
				type: "address"
			},
			{
				components: [
					{
						internalType: "address",
						name: "to",
						type: "address"
					},
					{
						internalType: "uint256",
						name: "requestedAmount",
						type: "uint256"
					}
				],
				internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
				name: "transferDetails",
				type: "tuple[]"
			},
			{
				internalType: "bytes32",
				name: "witness",
				type: "bytes32"
			},
			{
				internalType: "string",
				name: "witnessTypeName",
				type: "string"
			},
			{
				internalType: "string",
				name: "witnessType",
				type: "string"
			},
			{
				internalType: "bytes",
				name: "signature",
				type: "bytes"
			}
		],
		name: "permitWitnessTransferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "token",
				type: "address"
			},
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				internalType: "address",
				name: "to",
				type: "address"
			},
			{
				internalType: "uint160",
				name: "amount",
				type: "uint160"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "from",
				type: "address"
			},
			{
				components: [
					{
						internalType: "address",
						name: "token",
						type: "address"
					},
					{
						internalType: "uint160",
						name: "amount",
						type: "uint160"
					},
					{
						internalType: "address",
						name: "to",
						type: "address"
					}
				],
				internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
				name: "transferDetails",
				type: "tuple[]"
			}
		],
		name: "transferFrom",
		outputs: [
		],
		stateMutability: "nonpayable",
		type: "function"
	}
];

var AllowanceProvider = /*#__PURE__*/function () {
  function AllowanceProvider(provider, permit2Address) {
    this.provider = provider;
    this.permit2Address = permit2Address;
    this.permit2 = new contracts.Contract(this.permit2Address, Permit2Abi, this.provider);
  }
  var _proto = AllowanceProvider.prototype;
  _proto.getAllowanceData = /*#__PURE__*/function () {
    var _getAllowanceData = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token, owner, spender) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return this.permit2.allowance(owner, token, spender);
          case 2:
            return _context.abrupt("return", _context.sent);
          case 3:
          case "end":
            return _context.stop();
        }
      }, _callee, this);
    }));
    function getAllowanceData(_x, _x2, _x3) {
      return _getAllowanceData.apply(this, arguments);
    }
    return getAllowanceData;
  }();
  _proto.getAllowance = /*#__PURE__*/function () {
    var _getAllowance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token, owner, spender) {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return this.getAllowanceData(token, owner, spender);
          case 2:
            return _context2.abrupt("return", _context2.sent.amount);
          case 3:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this);
    }));
    function getAllowance(_x4, _x5, _x6) {
      return _getAllowance.apply(this, arguments);
    }
    return getAllowance;
  }();
  _proto.getNonce = /*#__PURE__*/function () {
    var _getNonce = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(token, owner, spender) {
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return this.getAllowanceData(token, owner, spender);
          case 2:
            return _context3.abrupt("return", _context3.sent.nonce);
          case 3:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this);
    }));
    function getNonce(_x7, _x8, _x9) {
      return _getNonce.apply(this, arguments);
    }
    return getNonce;
  }();
  _proto.getExpiration = /*#__PURE__*/function () {
    var _getExpiration = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(token, owner, spender) {
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return this.getAllowanceData(token, owner, spender);
          case 2:
            return _context4.abrupt("return", _context4.sent.expiration);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this);
    }));
    function getExpiration(_x10, _x11, _x12) {
      return _getExpiration.apply(this, arguments);
    }
    return getExpiration;
  }();
  return AllowanceProvider;
}();

exports.AllowanceProvider = AllowanceProvider;
exports.AllowanceTransfer = AllowanceTransfer;
exports.InstantExpiration = InstantExpiration;
exports.MaxAllowanceExpiration = MaxAllowanceExpiration;
exports.MaxAllowanceTransferAmount = MaxAllowanceTransferAmount;
exports.MaxOrderedNonce = MaxOrderedNonce;
exports.MaxSigDeadline = MaxSigDeadline;
exports.MaxSignatureTransferAmount = MaxSignatureTransferAmount;
exports.MaxUint160 = MaxUint160;
exports.MaxUint256 = MaxUint256;
exports.MaxUint48 = MaxUint48;
exports.MaxUnorderedNonce = MaxUnorderedNonce;
exports.PERMIT2_ADDRESS = PERMIT2_ADDRESS;
exports.SignatureTransfer = SignatureTransfer;
exports.permit2Address = permit2Address;
//# sourceMappingURL=permit2-sdk.cjs.development.js.map
