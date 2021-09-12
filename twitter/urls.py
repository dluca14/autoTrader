from django.urls import path

import twitter.views as views

urlpatterns = [
    path('tweets', views.ListTweets.as_view()),
    path('tweets/most_common', views.GetMostCommonHashtags.as_view()),
    path('tweets/heat_map', views.GetHeatMap.as_view()),
    path('tweets/dataframe', views.ListTweetsAsDataFrame.as_view()),
    path('tweets/stream_tweets', views.StreamTweets.as_view()),
]
