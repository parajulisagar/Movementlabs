import email
import imaplib
from email import policy
from email.header import decode_header
import credentials as cred

def fetch_latest_email(username, password):
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
        
def fetch_latest_email_subject(username, password):
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
                
                return subject
        except Exception as e:
            print("An error occurred:", e)
            return None
        
        

subject=fetch_latest_email_subject(cred.MAIL, cred.APPPASSWORD)
code=subject.split(" ")[-1]
print(code)

# latest_mail=fetch_latest_email(cred.MAIL, cred.APPPASSWORD)
# print(latest_mail)