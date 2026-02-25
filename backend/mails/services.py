import os
from django.shortcuts import render
import smtplib


def get_message():
    email = f"""\
        From: {os.getenv('EMAIL')}
        To:
        Subject:
        Content-Type: text/plain; charset="UTF-8";

        {message}
    """
    email = email.encode('UTF-8')


def send_message():
    message = get_message()
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(os.getenv('LOGIN'), os.getenv('PASSWORD'))
    server.sendmail(os.getenv('EMAIL'), email_to, message)
    server.quit()
