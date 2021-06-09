import ast
import csv
import pandas as pd
from twython import TwythonStreamer
from collections import Counter

import sys
sys.path.append('/home/david/workspace/auto_trader')

import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

import settings
from integrations.models import Tweet


# Filter out unwanted data
def process_tweet(tweet):
    d = {'hashtags': [hashtag['text'] for hashtag in tweet['entities']['hashtags']],
         'text': tweet['text'],
         'user': tweet['user']['screen_name'],
         'user_loc': tweet['user']['location'],
         'lang': tweet['lang']}

    tweet = Tweet(user=d['user'], user_location=d['user_loc'], language=d['lang'],
                  hashtags=d['hashtags'], text=d['text'])
    print('=============', tweet.text)

    return d


# Save each tweet to csv file
def save_to_csv(tweet):
    with open(r'saved_tweets.csv', 'a') as file:
        writer = csv.writer(file)
        writer.writerow(list(tweet.values()))


class MyStreamer(TwythonStreamer):

    # Received data
    def on_success(self, data):
        # Only collect tweets in English
        if data['lang'] == 'en':
            tweet_data = process_tweet(data)
            # save_to_csv(tweet_data)

    # Problem with the API
    def on_error(self, status_code, data, headers=None):
        print(status_code, data)
        self.disconnect()


# Instantiate from our streaming class
stream = MyStreamer(settings.TWITTER_CREDENTIALS['CONSUMER_KEY'], settings.TWITTER_CREDENTIALS['CONSUMER_SECRET'],
                    settings.TWITTER_CREDENTIALS['ACCESS_TOKEN'], settings.TWITTER_CREDENTIALS['ACCESS_SECRET'])
# Start the stream
stream.statuses.filter(track='crypto')

# --------------
#
# tweets = pd.read_csv("saved_tweets.csv")
#
# # Extract hashtags and put them in a list
# list_hashtag_strings = [entry for entry in tweets.hashtags]
# list_hashtag_lists = ast.literal_eval(','.join(list_hashtag_strings))
# hashtag_list = [ht.lower() for list_ in list_hashtag_lists for ht in list_]
#
# # Count most common hashtags
# counter_hashtags = Counter(hashtag_list)
# print('Most common hashtags: ', counter_hashtags.most_common(20))
#
# # -------------
#
# from geopy.geocoders import Nominatim
# import gmplot
#
# geolocator = Nominatim(user_agent='auto_trader')
#
# # Go through all tweets and add locations to 'coordinates' dictionary
# coordinates = {'latitude': [], 'longitude': []}
# for count, user_loc in enumerate(tweets.user_loc):
#     print(count, user_loc)
#     try:
#         location = geolocator.geocode(user_loc)
#
#         # If coordinates are found for location
#         if location:
#             print('true')
#             coordinates['latitude'].append(location.latitude)
#             coordinates['longitude'].append(location.longitude)
#
#     # If too many connection requests
#     except:
#         pass
#
# # Instantiate and center a GoogleMapPlotter object to show our map
# gmap = gmplot.GoogleMapPlotter(30, 0, 3)
#
# # Insert points on the map passing a list of latitudes and longitudes
# gmap.heatmap(coordinates['latitude'], coordinates['longitude'], radius=20)
#
# # Save the map to html file
# gmap.draw("python_heatmap.html")
