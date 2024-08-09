from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import undetected_chromedriver as UC
from Reuse import executeBrowser
from Reuse import selector


""""This calss is Parent of all pages"""
"""It contains all the generic methods and utilites of all the pages"""

class Basepage:

    def __init__(self, driver):
        self.driver = driver
        

    def Take_Me_To_HomePage(self):
        self.start_obj = executeBrowser.start_page(self.driver)
        self.selected = selector.selector(self.driver)
        self.op = UC.ChromeOptions()
        #grasping your own chrome user data so please use your own chrome user data 
        self.op.add_argument('user-data-dir=/Users/sagar/Library/Application Support/Google/Chrome')
        self.op.add_argument("--profile-directory={}".format("Profile 2"))
        self.options = UC.ChromeOptions()
        self.driver = UC.Chrome(options=self.op)
        self.start_obj.navigate("https://testnet.movementlabs.xyz")
    

        


