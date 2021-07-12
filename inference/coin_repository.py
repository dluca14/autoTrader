import csv


def get_csv_chart_data(coin, period):
    base_dir = "chart_data/"
    filename = f"{coin.upper()}_{period.lower()}.csv"

    processed_candlestick = []

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

            processed_candlestick.append(candlestick)

    return processed_candlestick
