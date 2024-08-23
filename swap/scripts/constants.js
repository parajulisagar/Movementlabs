const { Token } = require("@uniswap/sdk-core");

module.exports = {
  CHAIN_ID: 30732,
  WNATIVE: new Token(
    30732,
    "0xc02df8710Be33901D11A7E2D49B6c841e12B6f76",
    18,
    "WNATIVE",
    "WNATIVE"
  ),
  USDC: new Token(
    30732,
    "0x910fb3C2af0D946671Efd65EB412083F7c8Be996",
    18,
    "USDC",
    "USDC"
  ),
  RPC: "https://mevm2.devnet.imola.movementlabs.xyz",
};
