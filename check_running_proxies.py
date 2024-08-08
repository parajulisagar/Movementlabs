import threading
import queue
import requests
import credentials as cred

q= queue.Queue()
valid_proxies=[]

with open(cred.PROXY_PATH, 'r') as file:
        proxies=file.read().split("\n")
        for p in proxies:
            q.put(p)

def check_proxies():
    global g
    while not q.empty():
        proxy=q.get()
        try:
            res=requests.get("http://ipinfo.io/json",
                             proxies={'https': proxy, 'https': proxy}
                             )
        except:
            continue
        if res.status_code==200:
            print(proxy)
            

for _ in range(15):
    threading.Thread(target=check_proxies).start()