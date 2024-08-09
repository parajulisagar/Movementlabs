from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class selector:
    def __init__(self,driver):
        self.driver = driver
        # self.selectorType = selectorType
        # self.identifier = identifier

    def input_text(self,selectorType,locator,keys):
        if selectorType == "CLASS_NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.CLASS_NAME, locator))).send_keys(keys)

        elif selectorType == "CSS_SELECTOR":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, locator))).send_keys(keys)

        elif selectorType == "ID":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.ID, locator))).send_keys(keys)

        elif selectorType == "LINK_TEXT":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, locator))).send_keys(keys)

        elif selectorType == "NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.NAME, locator))).send_keys(keys)

        elif selectorType == "PARTIAL_LINK_TEXT":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.PARTIAL_LINK_TEXT, locator))).send_keys(keys)

        elif selectorType == "TAG_NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.TAG_NAME, locator))).send_keys(keys)

        elif selectorType == "XPath":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.XPATH, locator))).send_keys(keys)

    def click_element(self,selectorType,locator):
        if selectorType == "CLASS_NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.CLASS_NAME, locator))).click()

        elif selectorType == "CSS_SELECTOR":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, locator))).click()

        elif selectorType == "ID":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.ID, locator))).click()

        elif selectorType == "LINK_TEXT":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, locator))).click()

        elif selectorType == "NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.NAME, locator))).click()

        elif selectorType == "PARTIAL_LINK_TEXT":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.PARTIAL_LINK_TEXT, locator))).click()

        elif selectorType == "TAG_NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.TAG_NAME, locator))).click()

        elif selectorType == "XPath":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.XPATH, locator))).click()
            
    def get_selector(self,selectorType,locator):
        if selectorType == "CLASS_NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.CLASS_NAME, locator)))

        elif selectorType == "CSS_SELECTOR":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.CSS_SELECTOR, locator)))

        elif selectorType == "ID":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.ID, locator)))

        elif selectorType == "LINK_TEXT":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.LINK_TEXT, locator)))

        elif selectorType == "NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.NAME, locator)))

        elif selectorType == "PARTIAL_LINK_TEXT":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.PARTIAL_LINK_TEXT, locator)))

        elif selectorType == "TAG_NAME":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.TAG_NAME, locator)))

        elif selectorType == "XPath":
            WebDriverWait(self.driver, 15).until(EC.element_to_be_clickable((By.XPATH, locator)))
