import { BaseCurrency } from '@pancakeswap/swap-sdk-core';
export * from '@pancakeswap/swap-sdk-core';
export * from '@pancakeswap/v2-sdk';
export * from '@pancakeswap/swap-sdk-evm';
export { ChainId } from '@pancakeswap/chains';
import invariant from 'tiny-invariant';

// src/index.ts
var OnRampCurrency = class extends BaseCurrency {
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
    invariant(this.chainId === other.chainId, "CHAIN_IDS");
    invariant(this.address !== other.address, "ADDRESSES");
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

export { OnRampCurrency };
