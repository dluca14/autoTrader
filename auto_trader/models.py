from django.db import models

from accounts.models import Account


class Coin(models.Model):
    code = models.CharField(max_length=12, null=False)
    name = models.CharField(max_length=256, blank=True)


class CoinAccount(models.Model):
    coin = models.ForeignKey(Coin, on_delete=models.RESTRICT)
    created = models.DateTimeField(auto_now_add=True)
    amount = models.FloatField()

    user_account = models.ForeignKey(Account, related_name='coin_accounts', on_delete=models.CASCADE)
