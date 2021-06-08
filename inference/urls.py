from django.urls import path

import inference.views as views

urlpatterns = [
    path('predict/<str:model>', views.CoinModelInferenec.as_view(), name = 'api_predict'),
]
