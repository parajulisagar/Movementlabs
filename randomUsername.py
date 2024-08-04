import random 
import credentials as cred

def random_username():
    temp_name=cred.USERNAME
    name=temp_name.split('@')[0]
    Rnum=random.randint(100,1000)
    username=f"{name}{Rnum}"
    return username
    
   
print(random_username())