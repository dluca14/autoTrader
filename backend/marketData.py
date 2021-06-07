import pandas as pd
import requests
from typing import List
from datetime import date

class marketData(object):
    def __init__(self, coins: List):
        coins = coins

    def retrieve_data(self) -> None:
        endpoint_day = 'https://min-api.cryptocompare.com/data/histoday'
        endpoint_min = 'https://min-api.cryptocompare.com/data/histominute'
        endpoint_hour = 'https://min-api.cryptocompare.com/data/histohour'

        for coin in self.coins:
            res = requests.get(endpoint_min + '?fsym=' + coin + '&tsym=USD&limit=2000')
            hist = pd.DataFrame(json.loads(res.content)['Data'])
            hist = hist.set_index('time')
            hist.index = pd.to_datetime(hist.index, unit='s')
            target_col = 'close'

            today = date.today()
            cur_date = today.strftime("%b-%d-%Y")

            hist.to_csv(cur_date + '_' + coin + '_min.csv')

