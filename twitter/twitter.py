import ast
import csv
from collections import Counter

import pandas as pd
from geojson import Feature, Point, FeatureCollection
from rest_framework.response import Response
from twython import TwythonStreamer
from geopy.geocoders import Nominatim

from twitter.models import Tweet


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
        print('Error streaming tweets: ', status_code, data)

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


def generate_heatmap():
    tweets = Tweet.objects.all()[:50]
    tweets_df = pd.DataFrame(list(tweets.values()))

    geolocator = Nominatim(user_agent='config')

    features = []
    # TODO this is too slow it takes about 25 secs, must be fixed
    for count, user_loc in enumerate(tweets_df.user_location):
        try:
            location = geolocator.geocode(user_loc)

            # If coordinates are found for location
            # Weight can be adjusted based on tweet importance
            # Other custom properties can be added
            if location:
                features.append(
                    Feature(
                        geometry=Point((location.latitude, location.longitude)),
                        properties={
                            "weight": 3
                        }
                    )
                )

        # If too many connection requests
        except:
            pass

    return Response(FeatureCollection(features=features))
