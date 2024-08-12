import random
class Proxies:
    def __init__(self,driver):
        self.driver = driver
        # self.selectorType = selectorType
        # self.identifier = identifier

    
    def read_proxies_from_file(self, file_path):
        with open(file_path, 'r') as file:
            proxies = [line.strip() for line in file if line.strip()]
        return proxies

    def get_random_proxy(self, proxies):
        return random.choice(proxies)