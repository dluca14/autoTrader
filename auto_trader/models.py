from django.db import models

from accounts.models import Account


class CoinAccount(models.Model):
    coin_name = models.CharField(max_length=256, null=False)
    created = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField()

    user_account = models.ForeignKey(Account, related_name='coin_accounts', on_delete=models.CASCADE)
