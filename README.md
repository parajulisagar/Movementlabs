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
    # op.add_extension("buster.crx")
    # op.add_argument("--headless=new")
    driver = UC.Chrome(options=op)
    ```
