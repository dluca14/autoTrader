from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import Account
from .serializers import \
    AccountSerializer, \
    RegistrationSerializer, \
    LoginSerializer, \
    ResetPasswordSerializer, \
    ResetPasswordNewPasswordSerializer


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = serializer.save()
        return Response({
            "user": AccountSerializer(account, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(account)[1]
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        account = serializer.validated_data
        return Response({
            "user": AccountSerializer(account, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(account)[1]
        })


# Password Reset
class PasswordResetAPI(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'success': 'Email Sent'}, status=status.HTTP_200_OK)


# Check Password Reset Token
class PasswordResetTokenCheckAPI(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            user = Account.objects.get(id=user_id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({
                    'error': 'Password request is invalid, please try again'
                }, status=status.HTTP_401_UNAUTHORIZED)

            return Response({
                'success': True,
                'message': 'Password Reset Token Valid',
                'uidb64': uidb64,
                'token': token
            }, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({
                'error': 'Something went wrong, please try again'
            }, status=status.HTTP_401_UNAUTHORIZED)


# Generate New Password After Token Check
class PasswordResetNewPasswordAPI(generics.GenericAPIView):
    serializer_class = ResetPasswordNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            'success': True,
            'message': 'Password reset success'
        }, status=status.HTTP_200_OK)


# Get User API - only if logged in
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = AccountSerializer

    def get_object(self):
        return self.request.user
