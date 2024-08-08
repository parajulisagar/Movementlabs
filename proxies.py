import random
def read_proxies_from_file(file_path):
    with open(file_path, 'r') as file:
        proxies = [line.strip() for line in file if line.strip()]
    return proxies

def get_random_proxy(proxies):
    return random.choice(proxies)
