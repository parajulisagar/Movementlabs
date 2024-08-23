'use strict';

var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var v2Sdk = require('@pancakeswap/v2-sdk');
var swapSdkEvm = require('@pancakeswap/swap-sdk-evm');
var chains = require('@pancakeswap/chains');
var invariant = require('tiny-invariant');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);

// src/index.ts
var OnRampCurrency = class extends swapSdkCore.BaseCurrency {
  constructor(chainId, address, decimals, symbol, name, projectLink) {
    super(chainId, decimals, symbol, name);
    this.address = address;
    this.projectLink = projectLink;
    this.isNative = address === "0x" && true;
    this.isToken = address !== "0x" && true;
  }
  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  equals(other) {
    return other.isToken && this.chainId === other.chainId && this.address === other.address;
  }
  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  sortsBefore(other) {
    if (!other.isToken)
      return false;
    invariant__default.default(this.chainId === other.chainId, "CHAIN_IDS");
    invariant__default.default(this.address !== other.address, "ADDRESSES");
    return this.address.toLowerCase() < other.address.toLowerCase();
  }
  /**
   * Return this token, which does not need to be wrapped
   */
  get wrapped() {
    return this;
  }
  get serialize() {
    return {
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      projectLink: this.projectLink
    };
  }
};

Object.defineProperty(exports, 'ChainId', {
  enumerable: true,
  get: function () { return chains.ChainId; }
});
exports.OnRampCurrency = OnRampCurrency;
Object.keys(swapSdkCore).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return swapSdkCore[k]; }
  });
});
Object.keys(v2Sdk).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return v2Sdk[k]; }
  });
});
Object.keys(swapSdkEvm).forEach(function (k) {
  if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return swapSdkEvm[k]; }
  });
});
