from accounts.views import index
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('checkServer/', index, name='index'),
    path('', include('frontend.urls'))
]
