import undetected_chromedriver as UC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import credentials as cred
import locators
import connectby

op= UC.ChromeOptions()
#change your profile directory here
op.add_argument('user-data-dir=/Users/sagar/Library/Application Support/Google/Chrome')
op.add_argument("--profile-directory={}".format("Profile 1"))
# op.add_extension("buster.crx")
# op.add_argument("--headless=new")
driver = UC.Chrome(options=op)

# Open the specified URL
driver.get("https://testnet.movementlabs.xyz")

# Pause to allow page to load
time.sleep(5)
# click_cross_GALXE= driver.find_element(By.XPATH,locators.MOVEMENT_LAB_CROSS).click()

click_connect_GALXE= driver.find_element(By.XPATH,locators.CONNECT_GLAXE_BTN).click()
time.sleep(5)
click_login_GALXE= driver.find_element(By.XPATH,locators.GALXE_LOGIN_BTN_XPATH).click()
time.sleep(4)

connectby.twitter(driver)

#authenticate and wait
Authenticate_x = driver.find_element(By.XPATH,locators.AUTHENTICATE_BTN_XPATH).click()
time.sleep(6)
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
