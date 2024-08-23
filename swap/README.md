# Swap Script
This script is used to swap Native token to USDC token in warpgate (movement testnet).

## Prerequisites
- Node.js

## Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Copy `.env.example` to `.env` and fill in the required environment variables
  - `MNEMONIC` - Mnemonic of the wallet
  - `TOTAL_WALLETS` - Total number of wallets to generate from MNEMONIC for swapping
4. Run the script
```bash
npm start
```