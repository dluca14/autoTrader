import ast
import csv
from collections import Counter

import pandas as pd
import gmplot
from twython import TwythonStreamer
from geopy.geocoders import Nominatim

from integrations.models import Tweet


def process_tweet(tweet):
    d = {'hashtags': [hashtag['text'] for hashtag in tweet['entities']['hashtags']],
         'text': tweet['text'],
         'user': tweet['user']['screen_name'],
         'user_loc': tweet['user']['location'],
         'lang': tweet['lang']}

    tweet = Tweet(user=d['user'], user_location=d['user_loc'], language=d['lang'],
                  hashtags=d['hashtags'], text=d['text'])
    tweet.save()

    return d


def save_to_csv(tweet):
    with open(r'saved_tweets.csv', 'a') as file:
        writer = csv.writer(file)
        writer.writerow(list(tweet.values()))


class MyStreamer(TwythonStreamer):
    def on_success(self, data):
        tweet_data = process_tweet(data)
        # save_to_csv(tweet_data)

    def on_error(self, status_code, data, headers=None):
        print(status_code, data)
        self.disconnect()


def get_most_common_hashtags():
    tweets = Tweet.objects.all()
    tweets_df = pd.DataFrame(list(tweets.values()))

    # Extract hashtags and put them in a list
    list_hashtag_strings = [entry for entry in tweets_df.hashtags]
    list_hashtag_lists = ast.literal_eval(','.join(list_hashtag_strings))
    hashtag_list = [ht.lower() for list_ in list_hashtag_lists for ht in list_]

    # Count most common hashtags
    counter_hashtags = Counter(hashtag_list)
    print('Most common hashtags: ', counter_hashtags.most_common(10))

    return counter_hashtags.most_common(10)


def get_heat_map():
    tweets = Tweet.objects.all()[:50]
    tweets_df = pd.DataFrame(list(tweets.values()))

    geolocator = Nominatim(user_agent='auto_trader')

    # Go through all tweets and add locations to 'coordinates' dictionary
    coordinates = {'latitude': [], 'longitude': []}
    for count, user_loc in enumerate(tweets_df.user_location):
        try:
            location = geolocator.geocode(user_loc)

            # If coordinates are found for location
            if location:
                coordinates['latitude'].append(location.latitude)
                coordinates['longitude'].append(location.longitude)

        # If too many connection requests
        except:
            pass

    # Instantiate and center a GoogleMapPlotter object to show our map
    gmap = gmplot.GoogleMapPlotter(30, 0, 3)
    # Insert points on the map passing a list of latitudes and longitudes
    gmap.heatmap(coordinates['latitude'], coordinates['longitude'], radius=20)
    # Save the map to html file
    gmap.draw("heatmap.html")

    return gmap.get()
