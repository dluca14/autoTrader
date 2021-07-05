from rest_framework import authentication, permissions
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import StaticHTMLRenderer, TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.views import APIView

import pandas as pd

import settings
from twitter.models import Tweet
from twitter.serializers import TweetSerializer
from twitter.twitter import MyStreamer, get_most_common_hashtags, generate_heatmap


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


@renderer_classes([TemplateHTMLRenderer])
class GetHeatMap(APIView):
    def get(self, request, format=None):
        generate_heatmap()

        return Response(template_name='backend/heatmap.html')


class ListTweetsAsDataFrame(APIView):
    def get(self, request, format=None):

        tweets = Tweet.objects.all()
        df = pd.DataFrame(list(tweets.values()))

        return Response(df)


class StreamTweets(APIView):
    def get(self, request, format=None):
        stream = MyStreamer(settings.TWITTER_CREDENTIALS['CONSUMER_KEY'],
                            settings.TWITTER_CREDENTIALS['CONSUMER_SECRET'],
                            settings.TWITTER_CREDENTIALS['ACCESS_TOKEN'],
                            settings.TWITTER_CREDENTIALS['ACCESS_SECRET'])
        # Start the stream
        print('Starting the stream')
        stream.statuses.filter(track=['crypto', 'BTC', 'bitcoin', 'blockchain'],
                               language='en')

        return Response()

