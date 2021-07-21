from django.db import models
from django.db.models import RESTRICT

from core.models import Coin


class CoinPriceHourly(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    coin = models.ForeignKey(Coin, on_delete=RESTRICT)
    high_price = models.FloatField()
    low_price = models.FloatField()
    open_price = models.FloatField()
    close_price = models.FloatField()


class CoinPriceDaily(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    coin = models.ForeignKey(Coin, on_delete=RESTRICT)
    high_price = models.FloatField()
    low_price = models.FloatField()
    open_price = models.FloatField()
    close_price = models.FloatField()
