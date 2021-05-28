from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from accounts.producer import publish


@api_view(['GET'])
def index(request):
    date = datetime.now().strftime("%d/%m/%Y")
    message = 'Server is live, current date'
    publish()
    return Response(data=message + date, status=status.HTTP_200_OK)
