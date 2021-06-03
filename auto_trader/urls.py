from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),

    # REST FRAMEWORK URLS
    path('api/accounts/', include('accounts.api.urls', 'accounts_api'))
]
