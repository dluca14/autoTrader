from django.urls import path

import integrations.views as views

urlpatterns = [
    path('tweets', views.ListTweets.as_view())
]
