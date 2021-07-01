from django.conf import settings


class Util:
    @staticmethod
    def get_domain():
        return settings.DEFAULT_DOMAIN


