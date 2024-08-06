import undetected_chromedriver as UC
from selenium.webdriver.common.by import By
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
tabs = driver.window_handles
print(tabs)

# click_cross_GALXE= driver.find_element(By.XPATH,locators.MOVEMENT_LAB_CROSS).click()
click_connect_GALXE = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CONNECT_GLAXE_BTN)))
click_connect_GALXE.click()

try:
    click_change_account = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CHANGE_ACCOUNT_XPATH)))
    click_change_account.click()
except:
    print(f"No prior Login found")

click_login_GALXE= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.GALXE_LOGIN_BTN_XPATH)))
click_login_GALXE.click()

tabs = driver.window_handles
print(tabs)

connectby.twitter(driver)
# connectby.metamask(driver)
Authorize_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_APP_GALXE_XPATH)))
Authorize_x.click()
parent_window= driver.current_window_handle
handle_name=driver.title
tabs = driver.window_handles
time.sleep(5)
for t in tabs:
    driver.switch_to.window(t)
    print(driver.title)
    if driver.title == handle_name:
        driver.close()
            
driver.refresh()
try:
    click_login_GALXE= WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.GALXE_LOGIN_BTN_XPATH)))
    click_login_GALXE.click()
    Authorize_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_APP_GALXE_XPATH)))
    Authorize_x.click()
except:
    pass
#authenticate and wait
Authenticate_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_XPATH)))
Authenticate_x.click()
Logout = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.LOGOUT_XPATH)))
Logout.click()


driver.refresh()


# input_username = driver.find_element(By.NAME,locators.PASSWORD_NAME).send_keys(cred.USERNAME)



# Close the browser
driver.quit()
