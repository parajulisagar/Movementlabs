from selenium.webdriver.common.by import By
import credentials as cred
import locators
import time

def twitter(driver):
    """
    Automates the login process for Twitter using Selenium WebDriver.


    This function performs the following steps:
    1. Clicks the Twitter login button.
    2. Switches to the newly opened Twitter login popup window.
    3. Enters the username and password from the credentials.
    4. Logs into the Twitter account.
    """
    
    # Click the Twitter button to initiate login
    click_twitter_btn= driver.find_element(By.XPATH,locators.TWITTER_BTN_XPATH).click()
    time.sleep(10)
    
    #navigate to pop up windows
    tabs = driver.window_handles
    driver.switch_to.window(tabs[1])

    # Enter the username
    input_username = driver.find_element(By.XPATH,locators.USERNAME_XPATH).send_keys(cred.USERNAME)
    time.sleep(1)
    
    # Click the next button
    click_next_btn= driver.find_element(By.XPATH,locators.NEXT_BTN_XPATH).click()
    time.sleep(3)
    
    # Enter the password
    input_passowrd = driver.find_element(By.XPATH,locators.PASSWORD_XPATH).send_keys(cred.PASSWORD)
    time.sleep(5)
    
    # Click the login button
    login_btn_click = driver.find_element(By.XPATH,locators.LOGIN_BTN_XPATH).click()
    
    time.sleep(1000)
    

def metamask(driver):
    """
    Automates the login process for MetaMask using Selenium WebDriver.
    

    This function performs the following steps:
    1. Clicks the MetaMask login button.
    2. Switches to the newly opened MetaMask login popup window.
    3. Navigates through the MetaMask login confirmation steps.
    """
    
    # Click the MetaMask button to initiate login
    click_metamask_btn= driver.find_element(By.XPATH,locators.METAMASK_XPATH).click()
    time.sleep(5)
    
    # Navigate to the popup window
    tabs = driver.window_handles
    driver.switch_to.window(tabs[1])
    
    # Click the next button in MetaMask
    click_next_btn= driver.find_element(By.XPATH,locators.NEXT_BTN_XPATH).click()
    
    # Click the confirm button in MetaMask
    click_confirm_btn= driver.find_element(By.XPATH,locators.METAMASK_CONFIRM_XPATH).click()
    
    # Click the sign-in button in MetaMask
    click_signin_btn= driver.find_element(By.XPATH,locators.METAMASK_SIGNIN_XPATH).click()
    
    
    
    
    
    
    
    
    
    
