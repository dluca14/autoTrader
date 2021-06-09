from django.urls import path

import integrations.views as views

urlpatterns = [
    path('tweets', views.ListTweets.as_view()),
    path('tweets/most_common', views.GetMostCommonHashtags.as_view()),
    path('tweets/get_heat_map', views.GetHeatMap.as_view()),
    path('tweets/dataframe', views.ListTweetsAsDataFrame.as_view()),
    path('tweets/download_tweets', views.DownloadTweets.as_view()),

]
