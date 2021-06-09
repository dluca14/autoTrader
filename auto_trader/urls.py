from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),


    path('tweets/', views.tweets_list),
    path('api/inference/', include('inference.urls'))
]
