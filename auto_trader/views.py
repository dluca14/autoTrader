from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from auto_trader.models import Tweet
from auto_trader.serializers import TweetSerializer


@csrf_exempt
def tweets_list(request):
    """
    List all tweets
    """
    if request.method == 'GET':
        tweets = Tweet.objects.all()
        serializer = TweetSerializer(tweets, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def tweets_by_user(request, user):
    try:
        tweets = Tweet.objects.get(user=user)
    except Tweet.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = TweetSerializer(tweets)
        return JsonResponse(serializer.data)
