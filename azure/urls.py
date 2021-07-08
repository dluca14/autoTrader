from django.urls import path
from rest_framework import routers

import azure.views as views


# router = routers.SimpleRouter()
# router.register(r'sentiment_analysis', views.SentimentAnalyzer)

urlpatterns = [
    path('sentiment_analysis', views.SentimentAnalyzerList.as_view()),
    path('sentiment_analysis/<tweet_id>/', views.SentimentAnalyzer.as_view()),
    # path('sentiment_analysis/<int: pk>', views.SentimentAnalyzer.as_view()),
]
# urlpatterns = router.urls
