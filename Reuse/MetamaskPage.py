from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import undetected_chromedriver as UC
from Reuse import selector
from PageObjects import MetamaskPageObjects
from config.credentials import CRED
import time


class MetamaskPage:
    def __init__(self, driver):
        self.driver = driver
        self.selected = selector.selector(self.driver)
        self.MetamaskPageObj=MetamaskPageObjects.MetamaskPageObject()

    def MetamaskConnect(self):
        """
        Automates the login process for MetaMask using Selenium WebDriver.
        

        This function performs the following steps:
        1. Clicks the MetaMask login button.
        2. Switches to the newly opened MetaMask login popup window.
        3. Navigates through the MetaMask login confirmation steps.
        """
        parent_window_handle= self.driver.current_window_handle
        try:
            # Click the MetaMask button to initiate login
            self.selected.click_element("XPATH",self.MetamaskPageObj.METAMASK_XPATH)
        except:
            pass
        
        time.sleep(5)
        # Navigate to the popup window
        tabs = self.driver.window_handles
        self.driver.switch_to.window(tabs[-1])
        
        time.sleep(3)
        if self.driver.title == "MetaMask":
            # try:
            print(self.driver.title)
            time.sleep(4)
            self.selected.click_element("XPATH",self.MetamaskPageObj.METAMASK_PASSWORD_ID)
            self.selected.input_text("XPATH",self.MetamaskPageObj.METAMASK_PASSWORD_ID,CRED.META_PASS)
            
            self.selected.click_element("XPATH",self.MetamaskPageObj.METAMASK_UNLOCK_XPATH)
            # except:
            print(f"Already Unlocked")

            # Click the next button in MetaMask
            self.selected.click_element("XPATH",self.MetamaskPageObj.METAMASK_NEXT_BTN_XPATH)
            # Click the confirm button in MetaMask
            self.selected.click_element("XPATH",self.MetamaskPageObj.METAMASK_CONFIRM_BTN_XPATH)
            try:
                # Click the sign-in button in MetaMask
                self.selected.click_element("XPATH",self.MetamaskPageObj.METAMASK_SIGNIN_BTN_XPATH)
            except:
                pass
        self.driver.switch_to.window(parent_window_handle)
  