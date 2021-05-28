import pika

url = 'amqps://nziprkxv:9yhtrMW6pOYNRLCeQfInjI9U4v2fSDET@cow.rmq2.cloudamqp.com/nziprkxv'
params = pika.URLParameters(url)

connection = pika.BlockingConnection(params)
channel = connection.channel()


def publish():
    channel.basic_publish(exchange='', routing_key='admin', body='Someone checked the server')
