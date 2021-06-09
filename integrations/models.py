import datetime

from django.db import models


class Tweet(models.Model):
    # created = models.DateTimeField(auto_now_add=True)
    created = models.DateTimeField(default=datetime.datetime.utcnow(), null=False)
    user = models.CharField(max_length=128, null=False, unique=True)
    user_location = models.CharField(max_length=128, null=True)
    language = models.CharField(max_length=20, null=False)
    hashtags = models.CharField(max_length=256, null=False)
    text = models.TextField(max_length=256, null=False)
