import csv
from enum import Enum


class ChartDataType(Enum):
    NORMAL = 1
    PREDICTION = 2


class ChartDataRepository:
    def get_chart_data(self, coin, period, data_type, **kwargs):
        factory = self._get_factory(data_type)
        return factory(coin=coin, period=period, **kwargs)

    def _get_factory(self, data_type):
        if data_type == ChartDataType.NORMAL:
            return self._normal_csv_factory
        if data_type == ChartDataType.PREDICTION:
            return self._prediction_csv_factory

    def _normal_csv_factory(self, coin, period, **kwargs):
        base_dir = "chart_data/"
        filename = f"{coin.upper()}_{period.lower()}.csv"

        self.processed_candlestick = []

        with open(base_dir + filename, 'r') as infile:
            reader = csv.reader(infile, delimiter=",")

            # Pass the header row
            next(reader)
            for row in reader:
                row_time = row[0]
                row_open = row[3]
                row_high = row[1]
                row_low = row[2]
                row_close = row[6]
                # row_volumefrom = row[4]
                # row_volumeto = row[5]
                # row_conversion_type = row[7]
                # row_conversion_symbol = row[8]

                candlestick = {
                    "time": row_time,
                    "open": row_open,
                    "high": row_high,
                    "low": row_low,
                    "close": row_close
                }

                self.processed_candlestick.append(candlestick)

        return self.processed_candlestick

    def _prediction_csv_factory(self, coin, period, **kwargs):
        base_dir = "prediction_data/"
        filename = f"{coin.upper()}_{period.lower()}.csv"

        self.chart_data = {"real": [], "prediction": [], "hold_value": [], "ai_value": []}

        with open(base_dir + filename, 'r') as infile:
            reader = csv.reader(infile, delimiter=",")

            # Pass the header row
            next(reader)
            for row in reader:
                row_time = row[1]
                row_real_price = row[2]
                row_pred_price = row[3]
                row_ai_action = row[5]
                row_hold_value = row[6]
                row_ai_value = row[7]

                real_point = {
                    "time": row_time,
                    "value": row_real_price
                }

                pred_point = {
                    "time": row_time,
                    "value": row_pred_price
                }

                hold_point = {
                    "time": row_time,
                    "value": row_hold_value
                }

                ai_point = {
                    "time": row_time,
                    "value": row_ai_value,
                    "action": row_ai_action
                }

                self.chart_data["real"].append(real_point)
                self.chart_data["prediction"].append(pred_point)
                self.chart_data["hold_value"].append(hold_point)
                self.chart_data["ai_value"].append(ai_point)

        return self.chart_data
