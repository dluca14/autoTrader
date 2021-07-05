from django.urls import path

import azure.views as views

urlpatterns = [
    path('analyse', views.ListTweets.as_view()),
    path('analyse/tweet', views.GetMostCommonHashtags.as_view()),
]
