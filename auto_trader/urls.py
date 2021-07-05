from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('api/twitter/', include('twitter.urls')),
    path('api/inference/', include('inference.urls'))
]
