import sys
path = r'/Users/sagar/Desktop/Movementlabs_authenticate'
sys.path.insert(0,path)
import unittest
from Reuse import TwitterPage, BasePage, GalxePage, QuestPage


class TestQuest(unittest.TestCase): 
    @classmethod
    def setUpClass(self):
        self.driver=self.BasePageObj = BasePage.Basepage()
        self.driver=self.BasePageObj.Take_Me_To_HomePage()
       

    def test_Quest(self):
        self.GalxePageObj = GalxePage.GalxePage(self.driver)
        self.driver=self.GalxePageObj.click_connect_galxe(self.driver)
        self.TwitterObj = TwitterPage.TwitterPage(self.driver)
        self.driver=self.TwitterObj.Take_Me_To_Twitter(self.driver) 
        self.driver=self.TwitterObj.looping_signin_twitter(self.driver)      
        self.QuestObj = QuestPage.QuestPage(self.driver)
        self.driver=self.QuestObj.Quests(self.driver) 
        self.driver=self.GalxePageObj.verify_address(self.driver)

if __name__ == "__main__":
    unittest.main()
   
