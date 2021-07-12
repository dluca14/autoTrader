from django.urls import path, include
from .api import \
    RegisterAPI, \
    LoginAPI, \
    UserAPI, \
    PasswordResetTokenCheckAPI, \
    PasswordResetAPI, \
    PasswordResetNewPasswordAPI
from knox import views as knox_views


urlpatterns = [
    path('', include('knox.urls')),
    path('register', RegisterAPI.as_view()),
    path('login', LoginAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('password-reset', PasswordResetAPI.as_view(), name='password-reset'),
    path('password-reset/<uidb64>/<token>',
         PasswordResetTokenCheckAPI.as_view(),
         name='password-reset-confirm'
         ),
    path('password-reset/complete',
         PasswordResetNewPasswordAPI.as_view(),
         name='password-reset-complete'
         ),
    path('user', UserAPI.as_view())
]
