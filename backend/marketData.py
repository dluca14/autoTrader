import pandas as pd
import requests
from typing import List
from datetime import date
import json

class marketData(object):
    endpoints = {'day': 'https://min-api.cryptocompare.com/data/histoday',
                 'min': 'https://min-api.cryptocompare.com/data/histominute',
                 'hour': 'https://min-api.cryptocompare.com/data/histohour'}

    def __init__(self, coins: List):
        self.coins = coins

    def retrieve_data(self) -> None:
        for coin in self.coins:
            for period in self.endpoints.keys():
                res = requests.get(self.endpoints[period] + '?fsym=' + coin + '&tsym=USD&limit=2000')
                hist = pd.DataFrame(json.loads(res.content)['Data'])
                hist = hist.set_index('time')
                hist.index = pd.to_datetime(hist.index, unit='s')
                target_col = 'close'

                today = date.today()
                cur_date = today.strftime("%b-%d-%Y")

                hist.to_csv(cur_date + '_' + coin + period +'.csv')


if __name__ == '__main__':
    coins = ['ADA', 'BTC', 'DOGE', 'ETC', 'ETH', 'GRT', 'MLN', 'REP', 'XLM', 'XRP']

    market = marketData(coins=coins)

    market.retrieve_data()

    for coin in coins:
        market.data_fusion(coin=coin, period='hour')