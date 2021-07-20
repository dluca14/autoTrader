import csv
from twython import TwythonStreamer

from auto_trader import settings


# Filter out unwanted data
def process_tweet(tweet):
    d = {'hashtags': [hashtag['text'] for hashtag in tweet['entities']['hashtags']],
         'text': tweet['text'],
         'user': tweet['user']['screen_name'],
         'user_loc': tweet['user']['location'],
         'lang': tweet['lang']}
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
            save_to_csv(tweet_data)

    # Problem with the API
    def on_error(self, status_code, data, headers=None):
        print(status_code, data)
        self.disconnect()


# Instantiate from our streaming class
stream = MyStreamer(settings.TWITTER_CREDENTIALS['CONSUMER_KEY'], settings.TWITTER_CREDENTIALS['CONSUMER_SECRET'],
                    settings.TWITTER_CREDENTIALS['ACCESS_TOKEN'], settings.TWITTER_CREDENTIALS['ACCESS_SECRET'])
# Start the stream
stream.statuses.filter(track='python')