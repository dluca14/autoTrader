from rest_framework import authentication, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

import pandas as pd

import settings
from integrations.models import Tweet
from integrations.serializers import TweetSerializer
from integrations.twitter import MyStreamer, get_most_common_hashtags, get_heat_map


class ListTweets(APIView):
    """
    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        tweets = Tweet.objects.all()

        serialized = TweetSerializer(tweets, many=True)

        return Response(serialized.data)


class GetMostCommonHashtags(APIView):
    def get(self, request, format=None):
        most_common = get_most_common_hashtags()

        return Response(most_common)


class GetHeatMap(APIView):
    def get(self, request, format=None):
        result = get_heat_map()

        return Response(result)


class ListTweetsAsDataFrame(APIView):
    def get(self, request, format=None):

        tweets = Tweet.objects.all()
        df = pd.DataFrame(list(tweets.values()))

        return Response(df)


class DownloadTweets(APIView):
    def get(self, request, format=None):
        stream = MyStreamer(settings.TWITTER_CREDENTIALS['CONSUMER_KEY'],
                            settings.TWITTER_CREDENTIALS['CONSUMER_SECRET'],
                            settings.TWITTER_CREDENTIALS['ACCESS_TOKEN'],
                            settings.TWITTER_CREDENTIALS['ACCESS_SECRET'])
        # Start the stream
        stream.statuses.filter(track=['crypto', 'BTC', 'bitcoin', 'blockchain'],
                               language='en')

        return Response()

