import uuid

import requests
from rest_framework.response import Response
from rest_framework.views import APIView

from core import settings
from twitter.models import Tweet

path = '/text/analytics/v3.0/sentiment'
constructed_url = settings.AZURE['ENDPOINT'] + path


# class SentimentAnalyzer(APIView):
#     def get(self, request, tweet_id=None):
#         headers = {
#             'Ocp-Apim-Subscription-Key': settings.AZURE['SUBSCRIPTION_KEY'],
#             'Content-type': 'application/json',
#             'X-ClientTraceId': str(uuid.uuid4())
#         }
#
#         if tweet_id:
#             try:
#                 tweet = Tweet.objects.get(id=tweet_id)
#             except Exception as e:
#                 print(e)
#         else:
#             tweet = Tweet.objects.all()[0]
#
#         # You can pass more than one object in body.
#         body = {
#             'documents': [
#                 {
#                     'language': 'en',
#                     'id': '1',
#                     'text': tweet.text
#                 },
#             ]
#         }
#         response = requests.post(constructed_url, headers=headers, json=body)
#
#         return Response(response.json())
#
#
# class SentimentAnalyzerList(APIView):
#     # authentication_classes = [authentication.TokenAuthentication]
#     # permission_classes = [permissions.IsAdminUser]
#
#     def get(self, request):
#         headers = {
#             'Ocp-Apim-Subscription-Key': settings.AZURE['SUBSCRIPTION_KEY'],
#             'Content-type': 'application/json',
#             'X-ClientTraceId': str(uuid.uuid4())
#         }
#
#         tweets = Tweet.objects.all()[:10]
#         final_response = []
#         for tweet in tweets:
#             # You can pass more than one object in body.
#             body = {
#                 'documents': [
#                     {
#                         'language': 'en',
#                         'id': '1',
#                         'text': tweet.text
#                     },
#                 ]
#             }
#             response = requests.post(constructed_url, headers=headers, json=body)
#             final_response.append(response.json())
#
#         return Response(final_response)
#

import nltk
nltk.download('vader_lexicon')
nltk.download('twitter_samples')
from nltk.sentiment import SentimentIntensityAnalyzer


class SentimentAnalyzer(APIView):
    def get(self, request, tweet_id=None):
        if tweet_id:
            try:
                tweet = Tweet.objects.get(id=tweet_id)
            except Exception as e:
                print(e)
        else:
            tweet = Tweet.objects.all()[0]

        sia = SentimentIntensityAnalyzer()
        sentiment = sia.polarity_scores(tweet.text)
        sentiment['text'] = tweet.text

        return Response(sentiment)


class SentimentAnalyzerList(APIView):
    def get(self, request):
        tweets = Tweet.objects.all()

        sia = SentimentIntensityAnalyzer()
        score = []
        text = []
        for tweet in tweets:
            score.append(sia.polarity_scores(tweet.text)["compound"])
            text.append(tweet.text)

        # Tweet.objects.all().delete()
        return Response({
            'score': sum(score)/len(score),
            'text': text
        })
