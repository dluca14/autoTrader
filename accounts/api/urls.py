from django.urls import path
from accounts.api.views import registration_view

app_name = "account"

urlpatterns = [
    path('register', registration_view, name="register")
]