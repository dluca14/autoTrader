from rest_framework.decorators import api_view
from rest_framework.response import Response
from inference.coin_repository import ChartDataType, ChartDataRepository

chart_data_repository = ChartDataRepository()


@api_view(['GET'])
def normal_chart_data(request, coin, period):
    if request.method == 'GET':
        data = chart_data_repository.get_chart_data(
            coin=coin, period=period, data_type=ChartDataType.NORMAL
        )
        return Response(data)


@api_view(['GET'])
def prediction_chart_data(request, coin, period):
    if request.method == 'GET':
        data = chart_data_repository.get_chart_data(
            coin=coin, period=period, data_type=ChartDataType.PREDICTION
        )
        return Response(data)
