import uuid

import requests
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

import settings_local
from twitter.models import Tweet


path = '/text/analytics/v3.0/sentiment'
constructed_url = settings_local.AZURE['ENDPOINT'] + path


class SentimentAnalyzer(APIView):
    def get(self, request, tweet_id=None):
        print('=============', tweet_id)
        headers = {
            'Ocp-Apim-Subscription-Key': settings_local.AZURE['SUBSCRIPTION_KEY'],
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }

        if tweet_id:
            tweet = Tweet.objects.filter(Tweet.pk == tweet_id)
        else:
            tweet = Tweet.objects.all()

        # You can pass more than one object in body.
        body = {
            'documents': [
                {
                    'language': 'en',
                    'id': '1',
                    'text': tweet.text
                },
            ]
        }
        response = requests.post(constructed_url, headers=headers, json=body)

        return Response(response.json())


class SentimentAnalyzerList(APIView):
    """
    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    # authentication_classes = [authentication.TokenAuthentication]
    # permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        headers = {
            'Ocp-Apim-Subscription-Key': settings_local.AZURE['SUBSCRIPTION_KEY'],
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }

        tweets = Tweet.objects.all()[:10]
        final_response = []
        for tweet in tweets:
            # You can pass more than one object in body.
            body = {
                'documents': [
                    {
                        'language': 'en',
                        'id': '1',
                        'text': tweet.text
                    },
                ]
            }
            response = requests.post(constructed_url, headers=headers, json=body)
            final_response.append(response.json())

        return Response(final_response)
