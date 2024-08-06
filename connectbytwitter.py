import undetected_chromedriver as webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import credentials as cred
import locators
# import connectby
# from selenium import webdriver

op= webdriver.ChromeOptions()
#change your profile directory here
op.add_argument('user-data-dir=/Users/sagar/Library/Application Support/Google/Chrome')
op.add_argument("--profile-directory={}".format("Profile 2"))
op.add_argument("--start-maximized")
# op.add_argument("--headless")  # Enable headless mode
# op.add_argument("--disable-gpu")  # Disable GPU acceleration (often recommended for headless mode)
# op.add_argument("--no-sandbox") # Disables the sandbox for security
driver = webdriver.Chrome(options=op)
driver.get("https://testnet.movementlabs.xyz")

click_connect_GALXE = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CONNECT_GLAXE_BTN)))
click_connect_GALXE.click()
driver.delete_all_cookies()

try:
    click_change_account = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CHANGE_ACCOUNT_XPATH)))
    click_change_account.click()
except:
    print(f"No prior Login found")
    
click_login_GALXE= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.GALXE_LOGIN_BTN_XPATH)))
click_login_GALXE.click()

twitter_btn= WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.TWITTER_BTN_XPATH)))
twitter_btn.click()
time.sleep(10)
tabs = driver.window_handles
print(tabs)
time.sleep(5)
for t in tabs:
    driver.switch_to.window(t)
    print(driver.title)
    if driver.title == "Log in to X / X":
        print(driver.title)
        time.sleep(5)
        input_username = driver.find_element(By.XPATH, locators.USERNAME_XPATH)
        input_username.send_keys(cred.USERNAME)
        time.sleep(10)
        next_btn= WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.NEXT_BTN_XPATH)))



