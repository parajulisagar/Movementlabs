import os
import sys
import time
from selenium.webdriver.support import expected_conditions as EC
import undetected_chromedriver as UC


sys.path.append('/Users/sagar/Desktop/Movementlabs_authenticate')
profile_directory= os.getenv("PROFILE_DIRECTORY")
chrome_profile= os.getenv("CHROME_PROFILE")
op = UC.ChromeOptions()
#grasping your own chrome user data so please use your own chrome user data 
op.add_argument("--user-data-dir={}".format(profile_directory))
op.add_argument("--profile-directory={}".format(chrome_profile))
options = UC.ChromeOptions()
driver = UC.Chrome(options=op)
driver.get("https://testnet.movementlabs.xyz")
time.sleep(10)



