const { ethers } = require("ethers");
const { RPC, CHAIN_ID, WNATIVE, USDC } = require("./constants");
const { TradeType } = require("@uniswap/sdk-core");
const {
  liquidityClient,
  SMART_ROUTER_ADDRESS,
  MAX_FEE_PER_GAS,
  MAX_PRIORITY_FEE_PER_GAS,
} = require("@warpgatex/warpgate-sdk-v3");

const swap = async (wallet, amount) => {
  console.log(`Swap from ${wallet.address}`);
  const balance = await wallet.getBalance();
  if (balance.lt(ethers.utils.parseEther("0.001"))) {
    console.log("Insufficient balance");
    return;
  }
  const client = new liquidityClient(wallet, CHAIN_ID);

  const swapData = await client.swap(
    WNATIVE,
    USDC,
    TradeType.EXACT_INPUT,
    amount ?? "0.00001",
    {
      slippage: 0.05,
      deadline: Math.floor(Date.now() / 1000) + 60 * 20,
    }
  );
  const transaction = {
    data: swapData?.methodParameters?.calldata,
    to: SMART_ROUTER_ADDRESS[CHAIN_ID],
    value: swapData?.methodParameters?.value,
    from: wallet.address,
    gasLimit: 1000000,
    maxFeePerGas: MAX_FEE_PER_GAS[CHAIN_ID],
    maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS[CHAIN_ID],
  };
  const tx = await wallet.sendTransaction(transaction);
  await tx.wait();
  console.log("Swap Tx: ", tx.hash);
};

module.exports = { swap };
