import undetected_chromedriver as webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import credentials as cred
import locators
import proxies

# import connectby
# from selenium import webdriver
# Function to read proxies from a file
proxy_list=proxies.read_proxies_from_file(cred.PROXY_PATH)
random_proxy=proxies.get_random_proxy(proxy_list)

op= webdriver.ChromeOptions()
#change your profile directory here
op.add_argument('user-data-dir=/Users/lanisha/Library/Application Support/Google/Chrome')
op.add_argument("--profile-directory={}".format("Profile 2"))
op.add_argument("--start-maximized")
op.add_argument(f'--proxy-server={random_proxy}')
# op.add_argument("--headless")  # Enable headless mode
# op.add_argument("--disable-gpu")  # Disable GPU acceleration (often recommended for headless mode)
# op.add_argument("--no-sandbox") # Disables the sandbox for security
driver = webdriver.Chrome(options=op)
driver.get("https://testnet.movementlabs.xyz")

click_connect_GALXE = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.CONNECT_GLAXE_BTN)))
driver.execute_script("arguments[0].click();", click_connect_GALXE)

# driver.delete_all_cookies()

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
        time.sleep(1)
        input_username = driver.find_element(By.XPATH, locators.USERNAME_XPATH)
        input_username.send_keys(cred.USERNAME)
        print(cred.USERNAME)
        time.sleep(3)
        next_btn= WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.NEXT_BTN_XPATH)))
        next_btn.click()
        time.sleep(2)
        try:
            enter_email = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.VERIFY_MAIL_INPUT_XPATH)))
            enter_email.send_keys(cred.MAIL)
            time.sleep(5)
            click_next= WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.VERIFY_NEXT_XPATH)))
            click_next.click()
            time.sleep(4)
        except:
            print("Verification does not need for this ID ")
        input_passowrd = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.PASSWORD_XPATH)))
        input_passowrd.send_keys(cred.PASSWORD)
        time.sleep(3)
        
        # Click the login button
        login_btn = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.XPATH, locators.LOGIN_BTN_XPATH)))
        login_btn.click()
        time.sleep(6)
        try:
            import readmail
            subject=readmail.fetch_latest_email_subject(cred.MAIL, cred.APPPASSWORD)
            code=subject.split(" ")[-1]
            print(code)
            email = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.TAG_NAME, locators.EMAIL_TAG_NAME)))
            email.send_keys(code)
            time.sleep(5)
            next = WebDriverWait(driver, 15).until(EC.element_to_be_clickable((By.TAG_NAME, locators.NEXT_TAG_NAME)))
            next.click()
            time.sleep(3)
        except:
            pass 
        
        Authorize_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.AUTHORIZE_APP_GALXE_XPATH)))
        Authorize_x.click()
        # parent_window= driver.current_window_handle
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
        
        time.sleep(10)
        driver.navigate('https://testnet.movementlabs.xyz/quests')
        quest = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.QUEST_XPATH)))
        quest.click()
        handle_name=driver.title
        tabs = driver.window_handles
        time.sleep(5)
        for t in tabs:
            driver.switch_to.window(t)
            if t == tabs[-1]:
                signup_email_and_x = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, locators.EMAIL_X_SIGNUP_XPATH)))
                signup_email_and_x.click()
        

