from django.contrib import admin
from django.urls import path, include

from auto_trader import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),

    # REST FRAMEWORK URLS
    path('api/accounts/', include('accounts.api.urls', 'accounts_api')),

    path('api/integrations', include('integrations.urls')),

    path('api/inference/', include('inference.urls'))

]
