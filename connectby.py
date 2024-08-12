from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
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
    twitter_btn= WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, locators.TWITTER_BTN_XPATH)))
    twitter_btn.click()
    time.sleep(5)
    #navigate to pop up windows
    tabs = driver.window_handles
       
    for t in tabs:
        driver.switch_to.window(t)
        time.sleep(2)
        if driver.title == "Log in to X / X":
            print(driver.title)
            time.sleep(2)
            

def looping_signin_twitter(driver):
    df = pd.read_csv(cred.CSV_PATH)

    # Loop through each row in the DataFrame
    for index, row in df.iterrows():
        username = f"@{row['Username']}"
        password = row['Password']
        email = row['Email']
        if index != 0:
            galxe(driver)
            change_account(driver)
            twitter(driver)
            driver.delete_all_cookies()
            driver.refresh()
        print(index)
        time.sleep(10)
        
        # Enter the username
        input_username =  WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, locators.USERNAME_XPATH)))
        input_username.send_keys(username)
        # time.sleep(1)
        print('username')
        # Click the next button
        next_btn= WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.NEXT_BTN_XPATH)))
        next_btn.click()
        try:
            enter_email = WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, locators.VERIFY_MAIL_INPUT_XPATH)))
            enter_email.send_keys(email)
            click_next= WebDriverWait(driver, 5).until(EC.element_to_be_clickable((By.XPATH, locators.VERIFY_NEXT_XPATH)))
            click_next.click()
        except:
            print("Verification does not need for this ID ")
        
    
        # Enter the password
        input_passowrd = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.PASSWORD_XPATH)))
        input_passowrd.send_keys(password)
        
        # Click the login button
        login_btn = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.LOGIN_BTN_XPATH)))
        login_btn.click()
        
        time.sleep(10)
        authorize_galxe(driver)
                

def metamask(driver):
    """
    Automates the login process for MetaMask using Selenium WebDriver.
    

    This function performs the following steps:
    1. Clicks the MetaMask login button.
    2. Switches to the newly opened MetaMask login popup window.
    3. Navigates through the MetaMask login confirmation steps.
    """
    parent_window_handle= driver.current_window_handle
    try:
        # Click the MetaMask button to initiate login
        metamask_btn= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.METAMASK_XPATH)))
        metamask_btn.click()
    except:
        pass
    
    time.sleep(5)
    # Navigate to the popup window
    tabs = driver.window_handles
    driver.switch_to.window(tabs[-1])
    
    time.sleep(3)
    if driver.title == "MetaMask":
        # try:
        print(driver.title)
        time.sleep(4)
        enter_password = driver.find_element(By.ID, locators.METAMASK_PASSWORD_ID)
        enter_password.click()
        enter_password.send_keys(cred.META_PASS)
        unlock_btn= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.METAMASK_UNLOCK_XPATH)))
        unlock_btn.click()
        # except:
        print(f"Already Unlocked")

        # Click the next button in MetaMask
        next_btn= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.METAMASK_NEXT_BTN_XPATH)))
        next_btn.click()
        # Click the confirm button in MetaMask
        confirm_btn= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.METAMASK_CONFIRM_BTN_XPATH)))
        confirm_btn.click()
        try:
            # Click the sign-in button in MetaMask
            signin_btn= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.METAMASK_SIGNIN_BTN_XPATH)))
            signin_btn.click()
        except:
            pass
    driver.switch_to.window(parent_window_handle)
        
def authorize_galxe(driver):
    Authorize_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_APP_GALXE_XPATH)))
    Authorize_x.click()
    # parent_window= driver.current_window_handle
    handle_name=driver.title
    tabs = driver.window_handles
    time.sleep(5)
    for t in tabs:
        driver.switch_to.window(t)
        print(driver.title)
        if driver.title == handle_name:
            driver.close()
                
    driver.refresh()
    try:
        click_login_GALXE= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.GALXE_LOGIN_BTN_XPATH)))
        click_login_GALXE.click()
        Authorize_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_APP_GALXE_XPATH)))
        Authorize_x.click()
    except:
        pass
    #authenticate and wait
    Authenticate_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_XPATH)))
    Authenticate_x.click()
    Logout = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.LOGOUT_XPATH)))
    Logout.click()



def galxe(driver):
    # click_cross_GALXE= driver.find_element(By.XPATH,locators.MOVEMENT_LAB_CROSS).click()
    click_connect_GALXE = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CONNECT_GLAXE_BTN)))
    # click_connect_GALXE.click()
    driver.execute_script("arguments[0].click();", click_connect_GALXE)
    time.sleep(10)
    try:
        click_login_GALXE= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.GALXE_LOGIN_BTN_XPATH)))
        click_login_GALXE.click()
    except:
        print("Already Loggedin")

    
def change_account(driver):
    try:
        click_change_account = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CHANGE_ACCOUNT_XPATH)))
        click_change_account.click()
    except:
        print("No prior Login found")
        
def authorize(driver):
    try:
        Authenticate_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_XPATH)))
        Authenticate_x.click()
    except:
        print("Authroze button found")



def quests(driver):
    driver.navigate('https://testnet.movementlabs.xyz/quests')
    quest = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.QUEST_XPATH)))
    quest.click()
    handle_name=driver.title
    tabs = driver.window_handles
    time.sleep(5)
    for t in tabs:
        driver.switch_to.window(t)
        if t == tabs[-1]:
            signup_email_and_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.EMAIL_X_SIGNUP_XPATH)))
            signup_email_and_x.click()



