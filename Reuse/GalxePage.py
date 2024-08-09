from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import undetected_chromedriver as UC
from Reuse import executeBrowser
from Reuse import selector
from PageObjects import GalxePageObjects
import time


class GlaxePage:
    def __init__(self, driver):
        self.driver = driver
        self.selected = selector.selector(self.driver)
        self.GalexPageObj=GalxePageObjects.GalxePageObject()
        

    def click_connect_galxe(self):
        click_connect_GALXE = WebDriverWait(self.driver, 10).until(EC.element_to_be_clickable((By.XPATH, self.GalexPageObj.CONNECT_GLAXE_BTN)))
        self.driver.execute_script("arguments[0].click();", click_connect_GALXE)
        time.sleep(10)
        try:
            self.selected.element_click("XPATH",self.GalexPageObj.GALXE_LOGIN_BTN_XPATH)
        except:
            print("Already Loggedin")
        
    def authorize_galxe(self):
        self.selected.element_click("XPATH",self.GalexPageObj.AUTHORIZE_APP_GALXE_XPATH)
        # parent_window= driver.current_window_handle
        handle_name=self.driver.title
        tabs = self.driver.window_handles
        time.sleep(5)
        for t in tabs:
            self.driver.switch_to.window(t)
            print(self.driver.title)
            if self.driver.title == handle_name:
                self.driver.close()
                    
        self.driver.refresh()
        try:
            self.selected.click_element("XPATH",self.GalexPageObj.GALXE_LOGIN_BTN_XPATH)
            self.selected.click_element("XPATH",self.GalexPageObj.AUTHORIZE_APP_GALXE_XPATH)
        except:
            pass
        #authenticate and wait
        self.selected.click_element("XPATH",self.GalexPageObj.AUTHORIZE_XPATH)

