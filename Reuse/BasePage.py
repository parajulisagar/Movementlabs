import os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import undetected_chromedriver as UC


""""This calss is Parent of all pages"""
"""It contains all the generic methods and utilites of all the pages"""

class Basepage():
             
    def Take_Me_To_HomePage(self):
        profile_directory= os.getenv("PROFILE_DIRECTORY")
        chrome_profile= os.getenv("CHROME_PROFILE")
        op = UC.ChromeOptions()
        #grasping your own chrome user data so please use your own chrome user data 
        op.add_argument('user-data-dir=/Users/sagar/Library/Application Support/Google/Chrome')
        op.add_argument("--profile-directory={}".format("Profile 2"))
        # op.add_argument("--user-data-dir={}".format(profile_directory))
        # op.add_argument("--profile-directory={}".format(chrome_profile))
        options = UC.ChromeOptions()
        driver = UC.Chrome(options=op)
        driver.get("https://testnet.movementlabs.xyz")
        return driver

        


