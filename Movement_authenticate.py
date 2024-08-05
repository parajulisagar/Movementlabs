import undetected_chromedriver as UC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import credentials as cred
import locators
import connectby

op= UC.ChromeOptions()
#change your profile directory here
op.add_argument('user-data-dir=/Users/sagar/Library/Application Support/Google/Chrome')
op.add_argument("--profile-directory={}".format("Profile 2"))
# op.add_extension("buster.crx")
# op.add_argument("--headless=new")
driver = UC.Chrome(options=op)

# Open the specified URL
driver.get("https://testnet.movementlabs.xyz")


# click_cross_GALXE= driver.find_element(By.XPATH,locators.MOVEMENT_LAB_CROSS).click()
click_connect_GALXE = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CONNECT_GLAXE_BTN)))
click_connect_GALXE.click()

try:
    click_change_account = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CHANGE_ACCOUNT_XPATH)))
    click_change_account.click()
except:
    print(f"NO prior Login found")

click_login_GALXE= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.GALXE_LOGIN_BTN_XPATH)))
click_login_GALXE.click()


# connectby.twitter(driver)
connectby.metamask(driver)

#authenticate and wait
Authenticate_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHENTICATE_BTN_XPATH)))
Authenticate_x.click()

#reload
input_username = driver.find_element(By.NAME,locators.PASSWORD_NAME).send_keys(cred.USERNAME)


# Find and click the "Sign in with Twitter" button

# Check if login was successful and redirect back to the main site
try:
    if "testnet.movementlabs.xyz" in driver.current_url:
        print("Successfully logged in and redirected back.")
    else:
        print("Login failed or not redirected back yet.")
except Exception as e:
    print(f"Error during login redirect check: {e}")

# Close the browser
driver.quit()
