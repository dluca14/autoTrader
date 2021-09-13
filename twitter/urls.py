from django.urls import path

import twitter.views as views

urlpatterns = [
    path('', views.ListTweets.as_view()),
    path('most_common', views.GetMostCommonHashtags.as_view()),
    path('heat_map', views.GetHeatMap.as_view()),
    path('dataframe', views.ListTweetsAsDataFrame.as_view()),
    path('stream_tweets/<coin>/', views.StreamTweets.as_view()),
]
