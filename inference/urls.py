from django.urls import path

import inference.views as views
import inference.api as api


urlpatterns = [
    path('predict/<str:model>', views.CoinModelInferenec.as_view(), name='api_predict'),
    path('chart_data/<str:coin>/<str:period>', api.normal_chart_data),
    path('prediction_data/<str:coin>/<str:period>', api.prediction_chart_data)
]
