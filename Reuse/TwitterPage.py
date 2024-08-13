from selenium.webdriver.common.by import By
from Reuse import selector, GalxePage
from PageObjects import TwitterPageObjects
from config.credentials import CRED
import time
import pandas as pd
import ReadMail


class TwitterPage:
    def __init__(self, driver):
        self.driver = driver
        self.selected = selector.selector(self.driver)
        self.TwitterPageObj=TwitterPageObjects.TwitterPageObject
        self.GalxePageObj=GalxePage.GlaxePage
        

    def Take_Me_To_Twitter(self, driver):
        self.selected.click_element("XPATH",self.TwitterPageObj.TWITTER_BTN_XPATH)
        time.sleep(5)
        #navigate to pop up windows
        tabs = self.driver.window_handles
        for t in tabs:
            self.driver.switch_to.window(t)
            time.sleep(2)
            if self.driver.title == "Log in to X / X":
                print(self.driver.title)
                time.sleep(2)
        return self.driver
                
                
    def looping_signin_twitter(self, driver):
        df = pd.read_csv(CRED.CSV_PATH)
        # Loop through each row in the DataFrame
        for index, row in df.iterrows():
            username = f"@{row['Username']}"
            password = row['Password']
            email = row['Email']
            if index != 0:
                self.GalxePageObj.click_connect_galxe(self.driver)
                self.GalxePageObj.change_account(self.driver)
                TwitterPage.Take_Me_To_Twitter(self.driver)
                self.driver.delete_all_cookies()
                self.driver.refresh()
            print(index)
            time.sleep(10)
            
            # Enter the username
            self.selected.input_text("XPATH",self.TwitterPageObj.USERNAME_XPATH,CRED.USERNAME)
            # Click the next button
            self.selected.click_element("XPATH",self.TwitterPageObj.NEXT_BTN_XPATH)
            try:
                # Enter email
                self.selected.input_text("XPATH",self.TwitterPageObj.VERIFY_MAIL_INPUT_XPATH,CRED.MAIL)
                self.selected.click_element("XPATH",self.TwitterPageObj.VERIFY_NEXT_XPATH)
            except:
                print("Verification does not need for this ID ")
            
            # Enter the password
            self.selected.input_text("XPATH",self.TwitterPageObj.PASSWORD_XPATH,CRED.PASSWORD)
            
            # Click the login button
            self.selected.click_element("XPATH",self.TwitterPageObj.LOGIN_BTN_XPATH)
            
            time.sleep(10)
            self.GalxePageObj.authorize_galxe(self.driver)
            try:
                subject=ReadMail.ReadMail.fetch_latest_email_code(CRED.MAIL, CRED.APPPASSWORD)
                code=subject.split(" ")[-1]
                print(code)
                self.selected.input_text("NAME",self.TwitterPageObj.EMAIL_TAG_NAME,code)
                time.sleep(5)
                self.selected.click_element("XPATH",self.TwitterPageObj.NEXT_TAG_NAME)
                time.sleep(3)
            except:
                pass 
        return self.driver
        


