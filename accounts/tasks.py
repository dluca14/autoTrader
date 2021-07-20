from celery.utils.log import get_task_logger

from accounts import email_service
from accounts.email_service import EmailType
from config.celery import app

logger = get_task_logger(__name__)

email_service = email_service.EmailService()


@app.task(name='send_email_task')
def send_email_task(email_type, user_id):

    send_type = None
    if email_type == 'PASSWORD_RESET':
        send_type = EmailType.PASSWORD_RESET
    elif email_type == 'MAIL_CONFIRMATION':
        send_type = EmailType.MAIL_CONFIRMATION

    # If we receive a task called send_email_task send an email through email_service
    email_service.send_email(email_type=send_type, user_id=user_id)

