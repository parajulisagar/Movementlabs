import argparse
from web3 import Web3
from eth_account import Account
from aptos_sdk.account import Account as AptosAccount


def gennerate_account():
    account = AptosAccount.generate()
    private_key = account.private_key.hex()
    aptos_addres = account.address()
    eth_add = Account.from_key(private_key).address
    return private_key, aptos_addres, eth_add


def main():
    number_of_account = argparse.ArgumentParser()
    # -n too
    number_of_account.add_argument(
        "-n",
        "--number_of_account",
        type=int,
        help="Number of account to generate",
        default=1,
    )

    args = number_of_account.parse_args()
    addreses = []
    for i in range(args.number_of_account):
        private_key, aptos, evm = gennerate_account()
        print(f"Account {i + 1}")
        print(f"Private key: {private_key}")
        print(f"Address: {evm}")
        print(f"Aptos address: {aptos}")
        addreses.append(
            {
                "private_key": private_key,
                "address": evm,
                "aptos": aptos
            }
        )

    # save to file csv
    with open("generated.csv", "w") as f:
        f.write("Private key,EVM Address,Aptos Address\n")
        for account in addreses:
            f.write(f'{account["private_key"]},{account["address"]},{account['aptos']}\n')


if __name__ == "__main__":
    main()
