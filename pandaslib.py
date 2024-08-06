import pandas as pd
import credentials as cred
df = pd.read_csv(cred.CSV_PATH)
            
# Loop through each row in the DataFrame
for index, row in df.iterrows():
    username = f"@{row['Username']}"
    password = row['Password']
    email = row['Email']
    print(F"{username}, {password},{email}")