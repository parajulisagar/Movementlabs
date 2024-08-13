import email
import imaplib
from email import policy
from email.header import decode_header
import credentials as cred
from bs4 import BeautifulSoup

import sys
path = r'/Users/sagar/Desktop/Movementlabs_authenticate'
sys.path.insert(0,path)

class ReadMail:
    def __init__(self,driver):
        self.driver = driver
        # self.selectorType = selectorType
        # self.identifier = identifier
    def text_cleaner(self,text):
    # Remove whitespace and newlines.
        return " ".join(text.split())

    def fetch_latest_email(self, username, password):
        # Fetch the latest email from the inbox.
        try:
            mail = imaplib.IMAP4_SSL("imap.gmail.com")
            mail.login(username, password)
            mail.select("inbox")
            result, data = mail.search(None, "ALL")
            email_ids = data[0].split()[::-1]
            for new_email_id in email_ids:
                result, data = mail.fetch(new_email_id, "(RFC822)")
                raw_email = data[0][1]
                return email.message_from_bytes(raw_email, policy=policy.default)
        except Exception as e:
            print("An error occurred:", e)
            return None
        
        
        
    def parse_email_for_otp(self, email_message):
        # Parse email content for OTP.
        for part in email_message.walk():
            content_type = part.get_content_type()
            if content_type == "text/plain" or content_type == "text/html":
                body = part.get_payload(decode=True).decode()
                soup = BeautifulSoup(body, "html.parser")
                body_text = soup.get_text()
                cleaned_body = self.text_cleaner(body_text)
                print(cleaned_body)
                otp=cleaned_body.split(" ")[0]
        return otp
        
    def fetch_latest_email_code(self, username, password):
            # Fetch the latest email from the inbox.
            try:
                mail = imaplib.IMAP4_SSL("imap.gmail.com")
                mail.login(username, password)
                mail.select("inbox")
                result, data = mail.search(None, "ALL")
                email_ids = data[0].split()[::-1]
                for new_email_id in email_ids:
                    result, data = mail.fetch(new_email_id, "(RFC822)")
                    raw_email = data[0][1]
                    get_mail=email.message_from_bytes(raw_email, policy=policy.default)
                    subject, encoding = decode_header(get_mail["Subject"])[0]
                    if isinstance(subject, bytes):
                        subject = subject.decode(encoding if encoding else "utf-8")
                        code=subject.split(" ")[-1]
                    return code
            except Exception as e:
                print("An error occurred:", e)
                return None

            

    