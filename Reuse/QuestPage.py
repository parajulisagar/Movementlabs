from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import undetected_chromedriver as UC
from Reuse import selector
from PageObjects import QuestPageObjects
import time


class QuestPage:
    def __init__(self, driver):
        self.driver = driver
        self.selected = selector.selector(self.driver)
        self.QuestPageObj=QuestPageObjects.QuestPageObject()


    def quests(self):
        self.driver.navigate('https://testnet.movementlabs.xyz/quests')
        #click one quest
        self.selected.click_element("XPATH",self.QuestPageObj.QUEST_XPATH)
        handle_name=self.driver.title
        tabs = self.driver.window_handles
        time.sleep(5)
        for t in tabs:
            self.driver.switch_to.window(t)
            if t == tabs[-1]:
                self.selected.click_element("XPATH",self.QuestPageObj.EMAIL_X_SIGNUP_XPATH)
                
            


