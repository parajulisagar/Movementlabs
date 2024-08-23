import pyppeteer
import asyncio
import argparse
import warnings
import requests
from eth_account import Account


file_path = "wallet.csv"
warnings.filterwarnings("ignore")


def gennerate_account():
    account = Account.create()
    private_key = account.key.hex()
    address = account.address
    return private_key, address


async def click_on_element(page, selector):
    element = await page.querySelector(selector)
    if element:
        await page.evaluate("(element) => element.click()", element)
    return element


async def add_account_to_metamask():
    number_of_account = argparse.ArgumentParser()
    number_of_account.add_argument(
        "-n",
        "--number_of_account",
        type=int,
        help="Number of account to generate",
        default=1,
    )

    args = number_of_account.parse_args()
    try:
        with open(file_path, "r") as f:
            lines = f.readlines()
            if len(lines) == 0:
                with open(file_path, "w") as f:
                    f.write("Private key,Address\n")
    except FileNotFoundError:
        with open(file_path, "w") as f:
            f.write("Private key,Address\n")
    browser = None
    try:
        requests.get("http://localhost:9222")
        browser = await pyppeteer.connect(
            {
                "browserURL": "http://localhost:9222",
                "protocolTimeout": 5000,
            }
        )
    except Exception as e:
        print("Please run browser with remote debugging using\n")
        print("For MacOS:")
        print("open -a 'Google Chrome' --args --remote-debugging-port=9222")
        print("open -a 'Brave Browser' --args --remote-debugging-port=9222\n")
        print("For Windows:")
        print("chrome.exe --remote-debugging-port=9222")
        print("brave.exe --remote-debugging-port=9222\n")
        print("For Linux:")
        print("google-chrome --remote-debugging-port=9222")
        print("brave-browser --remote-debugging-port=9222\n")
        exit(1)
    page = await browser.newPage()
    await page.goto("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html")
    wallets = args.number_of_account
    await page.waitFor('button[data-testid="account-menu-icon"]')

    for i in range(wallets):
        account = gennerate_account()

        await click_on_element(page, 'button[data-testid="account-menu-icon"]')
        await click_on_element(
            page, 'button[data-testid="multichain-account-menu-popover-action-button"]'
        )

        elements = await page.querySelectorAll(
            'button[class="mm-box mm-text mm-button-base mm-button-base--size-sm mm-button-link mm-text--body-md-medium mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"]'
        )
        if len(elements) > 1:
            await page.evaluate("(element) => element.click()", elements[1])

        private_key_input = await page.querySelector('input[id="private-key-box"]')
        if private_key_input:
            await private_key_input.type(account[0])

        await click_on_element(
            page, 'button[data-testid="import-account-confirm-button"]'
        )

        with open(file_path, "a") as f:
            f.write(f"{account[0]},{account[1]}\n")
        await click_on_element(page, 'button[aria-label="Close"]')
        print(f"Added account {account[1]}")


asyncio.get_event_loop().run_until_complete(add_account_to_metamask())
