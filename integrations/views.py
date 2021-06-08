from rest_framework import authentication, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from integrations.models import Tweet
from integrations.serializers import TweetSerializer


class ListTweets(APIView):
    """
    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, format=None):
        tweets = Tweet.objects.all()
        serialized = TweetSerializer(tweets)

        return Response(serialized)
