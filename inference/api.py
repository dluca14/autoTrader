from rest_framework.decorators import api_view
from rest_framework.response import Response

from inference import coin_repository


# TODO maybe prevent unauthenticated users from getting chart data
@api_view(['GET'])
def chart_data(request, coin, period):
    if request.method == 'GET':
        data = coin_repository.get_csv_chart_data(coin, period)
        return Response(data)
