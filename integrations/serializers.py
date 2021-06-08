from rest_framework import serializers
from integrations.models import Tweet


class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id', 'created', 'user', 'user_location', 'language', 'hashtags', 'text']
