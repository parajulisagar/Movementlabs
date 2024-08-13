from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import undetected_chromedriver as UC
from PageObjects import SetUsernamePageObjects
from config.credentials import CRED
import time
import sys
path = r'/Users/sagar/Desktop/Movementlabs_authenticate'
sys.path.insert(0,path)

import random
from Reuse import selector, SetUsername

class SetUsernamePage:
    def __init__(self, driver):
        self.driver = driver
        self.selected = selector.selector(self.driver)
        self.SetUsernamePageObj=SetUsernamePageObjects.SetUsernamePageObject()
        
    def random_username():
        """
        Generates a random username by appending a random number to the base of the provided username.
        The base username is extracted from the credentials file, and a random number between 100 and 1000
        is appended to it.
        Returns:
            str: A randomly generated username.
        """
        # Extract the base username from the credentials (excluding the domain part)
        temp_name=CRED.USERNAME
        name=temp_name.split('@')[0]
        # Generate a random number between 100 and 1000
        Rnum=random.randint(100,1000)
        # Combine the base username with the random number to create a new username
        username=f"{name}{Rnum}"
        return username

    def Setusername(self, driver):
        time.sleep(5)
        self.SetUsernameObj = SetUsername.SetUsernamePage()
        Rusername=self.SetUsernameObj.random_username()
        self.selected.input_text("XPATH",self.SetUsernamePageObj.INPUT_USERNAME_XPATH,Rusername)
        self.selected.click_element("XPATH",self.SetUsernamePageObj.CREATE_BTN_XPATH)
        self.selected.click_element("XPATH",self.SetUsernamePageObj.CROSS_XPATH)
        return self.driver
        
        