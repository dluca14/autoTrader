from django.urls import path, include
from .api import \
    RegisterAPI, \
    LoginAPI, \
    UserAPI, \
    PasswordResetTokenCheckAPI, \
    PasswordResetAPI, \
    PasswordResetNewPasswordAPI
from knox import views as knox_views

base_url = 'api/accounts'

urlpatterns = [
    path(base_url, include('knox.urls')),
    path(base_url + '/register', RegisterAPI.as_view()),
    path(base_url + '/login', LoginAPI.as_view()),
    path(base_url + '/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path(base_url + '/password-reset', PasswordResetAPI.as_view(), name='password-reset'),
    path(base_url + '/password-reset/<uidb64>/<token>',
         PasswordResetTokenCheckAPI.as_view(),
         name='password-reset-confirm'
         ),
    path(base_url + '/password-reset/complete',
         PasswordResetNewPasswordAPI.as_view(),
         name='password-reset-complete'
         ),
    path(base_url + '/user', UserAPI.as_view())
]
