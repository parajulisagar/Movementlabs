import sys
path = r'/Users/sagar/Desktop/Movementlabs_authenticate'
sys.path.insert(0,path)
import unittest

from Reuse import MetamaskPage, BasePage, GalxePage, SetUsername


class TestEndToEnd(unittest.TestCase): 
    @classmethod
    def setUpClass(self):
        self.BasePageObj = BasePage.Basepage()
        self.driver=self.BasePageObj.Take_Me_To_HomePage()
       

    def test_endtoend(self):
        self.GalxePageObj = GalxePage.GalxePage(self.driver)
        self.driver=self.GalxePageObj.click_connect_galxe(self.driver)
        self.MetamaskObj = MetamaskPage.MetamaskPage(self.driver)
        self.driver=self.MetamaskObj.MetamaskConnect(self.driver)
        self.SetUsernameObj = SetUsername.SetUsernamePage(self.driver)
        self.driver=self.SetUsernameObj.Setusername(self.driver)
           
        

if __name__ == "__main__":
    unittest.main()
   
