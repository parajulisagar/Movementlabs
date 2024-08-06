import undetected_chromedriver as UC
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
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

connectby.galxe(driver)
connectby.twitter(driver)
connectby.looping_signin_twitter(driver)


# Close the browser
driver.quit()
