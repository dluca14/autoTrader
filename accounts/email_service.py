from enum import Enum, auto

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import smart_bytes
from django.core.mail import EmailMessage

from accounts.models import Account
from accounts.utils import Util


class EmailType(Enum):
    PASSWORD_RESET = auto
    MAIL_CONFIRMATION = auto


class EmailService:
    def send_email(self, email_type, user_id, **kwargs):
        factory = self._get_factory(email_type)
        factory(user_id, **kwargs)

    def _get_factory(self, email_type):
        if email_type == EmailType.PASSWORD_RESET:
            return self._password_reset_factory
        if email_type == EmailType.MAIL_CONFIRMATION:
            return self._mail_confirmation_factory

    def _password_reset_factory(self, user_id, **kwargs):
        user = Account.objects.get(id=user_id)
        self.uidb64 = urlsafe_base64_encode(smart_bytes(user_id))
        self.token = PasswordResetTokenGenerator().make_token(user)

        domain = Util.get_domain()
        relative_link = f"/#/password-reset/{self.uidb64}/{self.token}"

        abs_url = 'http://' + domain + relative_link
        email_body = 'Hello ' + user.first_name + ',\n' + \
                     'Use the link below to reset your password \n' + abs_url

        to_email = (user.email, '')
        email_subject = 'Reset your account password'

        email = EmailMessage(
            subject=email_subject,
            body=email_body,
            to=to_email
        )
        email.send()

    def _mail_confirmation_factory(self, user_id, **kwargs):
        pass

