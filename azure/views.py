import uuid

import requests
from rest_framework.response import Response
from rest_framework.views import APIView

import settings_local
from twitter.models import Tweet


path = '/text/analytics/v3.0/sentiment'
constructed_url = settings_local.AZURE['ENDPOINT'] + path


class ListTweets(APIView):
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


class GetMostCommonHashtags(APIView):
    def get(self, request):
        headers = {
            'Ocp-Apim-Subscription-Key': settings_local.AZURE['SUBSCRIPTION_KEY'],
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }

        tweet = Tweet.objects.all()[0]
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
