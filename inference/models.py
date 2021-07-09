from django.db import models


class CoinPriceHourly(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    coin_name = models.CharField(max_length=256, null=False)
    high_price = models.FloatField()
    low_price = models.FloatField()
    open_price = models.FloatField()
    close_price = models.FloatField()


class CoinPriceDaily(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    coin_name = models.CharField(max_length=256, null=False)
    high_price = models.FloatField()
    low_price = models.FloatField()
    open_price = models.FloatField()
    close_price = models.FloatField()
