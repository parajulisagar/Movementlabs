const { ethers } = require("ethers");
const { swap } = require("./swap");
const { RPC } = require("./constants");
const fs = require("fs");

const provider = new ethers.providers.JsonRpcProvider(RPC);
const totalWallets = process.env.TOTAL_WALLETS || 10;

const transferBalance = async (wallet, to) => {
  const toBalance = await provider.getBalance(to);
  console.log(`Next Wallet balance: ${ethers.utils.formatEther(toBalance)}`);
  if (toBalance.gt(ethers.utils.parseEther("0.1"))) {
    console.log("Already has sufficient balance");
    return;
  }
  console.log(`Transferring balance to ${to}`);
  const balance = await wallet.getBalance();
  if (balance.lt(ethers.utils.parseEther("0.2"))) {
    throw new Error(
      "Main wallet has Insufficient balance. Please top up the main wallet"
    );
  }
  const tx = await wallet.sendTransaction({
    to,
    value: ethers.utils.parseEther("0.1"),
  });
  await tx.wait();
  console.log("transfer balance: ", tx.hash);
};

const withdrawAllBalance = async (wallet, to) => {
  const balance = await wallet.getBalance();
  if (balance.lt(ethers.utils.parseEther("0.002"))) {
    console.log("Insufficient balance to withdraw. Skipping");
    return;
  }
  console.log("Withdrawing balance: ", ethers.utils.formatEther(balance));
  const gasPrice = ethers.utils.parseUnits("5", "gwei");
  const gasLimit = 21000;
  const fee = gasPrice.mul(gasLimit);
  const balanceAfterFee = balance
    .sub(fee)
    .sub(ethers.utils.parseUnits("0.001", "ether"));
  const tx = await wallet.sendTransaction({
    to,
    value: balanceAfterFee,
    gasPrice,
    gasLimit,
  });
  await tx.wait();
  console.log("Withdraw Tx: ", tx.hash);
};

const main = async () => {
  const mainWallet = new ethers.Wallet.fromMnemonic(
    process.env.MNEMONIC,
    "m/44'/60'/0'/0/0" // change last number to get different wallet
  ).connect(provider);
  console.log("Main Wallet: ", mainWallet.address);

  let start = 0;
  if (fs.existsSync("last-wallet-index.txt")) {
    start = Number(fs.readFileSync("last-wallet-index.txt", "utf8")) + 1;
  }
  if (start === 0) {
    console.log("Generating wallets...");
    let allWallets = "PrivateKey,WalletAddress\n";
    let totalWallet = "PrivateKey,WalletAddress\n";
    let fileIndex=1
    for (let i = 0; i < totalWallets; i++) {
      console.log("Generating wallet: ", i);
      const nextWallet = new ethers.Wallet.fromMnemonic(
        process.env.MNEMONIC,
        `m/44'/60'/0'/0/${i}`
      );
      allWallets += `${nextWallet.privateKey},${nextWallet.address}\n`;
      totalWallet += `${nextWallet.privateKey},${nextWallet.address}\n`;
      if ((i + 1) % 1000 === 0 || i === totalWallets - 1) {
        const fileName = `wallets_part_${i}.csv`;
        fs.writeFileSync(fileName, totalWallet);
        console.log(`Wallets chunk ${i} generated and saved in ${fileName}`);
        
        // Reset the allWallets string for the next chunk
        totalWallet = "PrivateKey,WalletAddress\n";
        fileIndex++;
      }
    }
    fs.writeFileSync("wallets.csv", allWallets);
    console.log("Wallets generated and saved in wallets.csv");
  }

  for (let i = start; i < totalWallets; i++) {
    const mainWalletBalance = await mainWallet.getBalance();
    const nextWallet = new ethers.Wallet.fromMnemonic(
      process.env.MNEMONIC,
      `m/44'/60'/0'/0/${i}`
    ).connect(provider);

    console.log("\n========================================");
    console.log(`Wallet Index: ${i}`);
    console.log("Next Wallet: ", nextWallet.address);
    console.log(
      "Main Wallet balance: ",
      ethers.utils.formatEther(mainWalletBalance)
    );
    // Transfer balance
    await transferBalance(mainWallet, nextWallet.address);

    // Swap
    await swap(nextWallet);

    // Withdraw all balance
    await withdrawAllBalance(nextWallet, mainWallet.address);

    // Save last wallet index
    fs.writeFileSync("last-wallet-index.txt", i.toString());
    console.log("========================================\n");
  }
};

main();
