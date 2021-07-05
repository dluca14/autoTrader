from enum import Enum, auto

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import smart_bytes
from django.urls import reverse
from django.core.mail import EmailMessage

from accounts.utils import Util


class EmailType(Enum):
    PASSWORD_RESET = auto
    MAIL_CONFIRMATION = auto


class EmailService:
    def send_email(self, email_type, user, **kwargs):
        factory = self._get_factory(email_type)
        return factory(user, **kwargs)

    def _get_factory(self, email_type):
        if email_type == EmailType.PASSWORD_RESET:
            return self._password_reset_factory
        if email_type == EmailType.MAIL_CONFIRMATION:
            return self._mail_confirmation_factory

    def _password_reset_factory(self, user, **kwargs):
        uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
        token = PasswordResetTokenGenerator().make_token(user)

        domain = Util.get_domain()
        relative_link = f"/#/password-reset/{uidb64}/{token}"

        abs_url = 'http://' + domain + relative_link
        email_body = 'Hello ' + user.first_name + ',\n' + \
                     'Use the link below to reset your password \n' + abs_url

        to_email = (user.email, '')
        email_subject = 'Reset your password'

        email = EmailMessage(
            subject=email_subject,
            body=email_body,
            to=to_email
        )
        email.send()

    def _mail_confirmation_factory(self, user, **kwargs):
        pass

