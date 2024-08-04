from selenium.webdriver.common.by import By


import credentials as cred
import locators
import time

def twitter(driver):
    click_twitter_btn= driver.find_element(By.XPATH,locators.TWITTER_BTN_XPATH).click()
    time.sleep(10)
    #navigate to pop up windows
    tabs = driver.window_handles
    driver.switch_to.window(tabs[1])

    input_username = driver.find_element(By.XPATH,locators.USERNAME_XPATH).send_keys(cred.MAIL)
    time.sleep(1)
    click_next_btn= driver.find_element(By.XPATH,locators.NEXT_BTN_XPATH).click()
    time.sleep(300)
    try:
        print("Twitter login button clicked.")
    except Exception as e:
        print(f"NO need to provide phone number or username {e}")
    input_passowrd = driver.find_element(By.NAME,locators.PASSWORD_NAME).send_keys(cred.PASSWORD)
    

def metamask(driver):
    pass
