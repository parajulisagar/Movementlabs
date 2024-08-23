# Selenium Web Automation for Galxe Connection

This project automates the process of connecting Galxe to Movementlabs via Twitter and MetaMask using Selenium WebDriver.

## Requirements

- Python 3.x
- Selenium
- Undetected ChromeDriver (UC)
- Google Chrome

## Setup

1. **Install the required Python packages:**

    ```bash
    pip install selenium undetected-chromedriver
    ```

2. **Set up your `credentials.py` file:**

    Create a `credentials.py` file with your login credentials:

    ```python
    USERNAME = 'your_username'
    PASSWORD = 'your_password'
    ```

3. **Modify the Chrome user data directory:**

    Change the profile directory in the script as needed. Update the `user-data-dir` and `--profile-directory` arguments in the `UC.ChromeOptions` setup:

    ```python
    import undetected_chromedriver.v2 as UC

    op = UC.ChromeOptions()
    # Change your profile directory here
    op.add_argument('user-data-dir=/Users/sagar/Library/Application Support/Google/Chrome')
    op.add_argument("--profile-directory={}".format("Profile 1"))
    driver = UC.Chrome(options=op)
    ```

    You can get your chrome profile directory by navigating to chrome://version
    ![Chrome Version Details](https://github.com/parajulisagar/Movementlabs/blob/master/images/chromeprofile.png)


    # Generate and Add Private Keys to Metamask

The following script generates a specified number of private keys and adds them to Metamask.

```python3 add_to_metamask.py -n 10```

The script will generate 10 private keys and add them to Metamask also save them to a file named `wallet.csv`.

# Generate Private Keys (only)
The following script generates a specified number of private keys, EVM Address, Aptos Address and saves them to a file.

```python3 generate_keys.py -n 10```

The script will generate 10 private keys and print them to the console and save them to a file named `generated.csv`.

## Dependencies
- Python 3.6 or higher

## Package Installation
```bash
pip3 install -r requirements.txt
```


