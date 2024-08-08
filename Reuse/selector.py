from selenium.webdriver.common.by import By

class selector:
    def __init__(self,driver):
        self.driver = driver
        # self.selectorType = selectorType
        # self.identifier = identifier

    def input_text(self,selectorType,locator,keys):
        if selectorType == "CLASS_NAME":
            self.driver.find_element(By.CLASS_NAME,locator).send_keys(keys)

        elif selectorType == "CSS_SELECTOR":
            self.driver.find_element(By.CSS_SELECTOR,locator).send_keys(keys)

        elif selectorType == "ID":
            self.driver.find_element(By.ID,locator).send_keys(keys)

        elif selectorType == "LINK_TEXT":
            self.driver.find_element(By.LINK_TEXT,locator).send_keys(keys)

        elif selectorType == "NAME":
            self.driver.find_element(By.NAME,locator).send_keys(keys)

        elif selectorType == "PARTIAL_LINK_TEXT":
            self.driver.find_element(By.PARTIAL_LINK_TEXT ,locator).send_keys(keys)

        elif selectorType == "TAG_NAME":
            self.driver.find_element(By.TAG_NAME,locator).send_keys(keys)

        elif selectorType == "XPath":
            self.driver.find_element(By.XPATH,locator).send_keys(keys)

    def click(self,selectorType,locator):
        if selectorType == "CLASS_NAME":
            self.driver.find_element(By.CLASS_NAME,locator).click()

        elif selectorType == "CSS_SELECTOR":
            self.driver.find_element(By.CSS_SELECTOR,locator).click()

        elif selectorType == "ID":
            self.driver.find_element(By.ID,locator).click()

        elif selectorType == "LINK_TEXT":
            self.driver.find_element(By.LINK_TEXT,locator).click()

        elif selectorType == "NAME":
            self.driver.find_element(By.NAME,locator).click()

        elif selectorType == "PARTIAL_LINK_TEXT":
            self.driver.find_element(By.PARTIAL_LINK_TEXT ,locator).click()

        elif selectorType == "TAG_NAME":
            self.driver.find_element(By.TAG_NAME,locator).click()

        elif selectorType == "XPath":
            self.driver.find_element(By.XPATH,locator).click()
