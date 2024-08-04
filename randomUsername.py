import random 
import credentials as cred

def random_username():
    """
    Generates a random username by appending a random number to the base of the provided username.
    
    The base username is extracted from the credentials file, and a random number between 100 and 1000
    is appended to it.

    Returns:
        str: A randomly generated username.
    """
    
    # Extract the base username from the credentials (excluding the domain part)
    temp_name=cred.USERNAME
    name=temp_name.split('@')[0]
    
    # Generate a random number between 100 and 1000
    Rnum=random.randint(100,1000)
    
    # Combine the base username with the random number to create a new username
    username=f"{name}{Rnum}"
    return username
    
   
