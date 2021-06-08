from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),

    # REST FRAMEWORK URLS
    # path('api/accounts/', include('accounts.urls', namespace='accounts'))
]
