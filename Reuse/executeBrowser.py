class start_page:
    def __init__(self,driver):
        self.driver = driver


    def navigate(self,url):
        self.driver.get(url)

    def maximze(self):
        self.driver.maximize_window()


