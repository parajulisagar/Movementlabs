from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import pandas as pd
from Reuse import selector
from PageObjects import TwitterPageObjects
import time


class TwitterPage:
    def __init__(self, driver):
        self.driver = driver
        self.selected = selector.selector(self.driver)
        self.TwitterPageObj=TwitterPageObjects.TwitterPageObject
        

    def Take_Me_To_Twitter(self):
        
        self.selected.element_click("XPATH",self.TwitterPageObj.TWITTER_BTN_XPATH)
        time.sleep(5)
        #navigate to pop up windows
        tabs = self.driver.window_handles
        
        for t in tabs:
            self.driver.switch_to.window(t)
            time.sleep(2)
            if self.driver.title == "Log in to X / X":
                print(self.driver.title)
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
        
        


