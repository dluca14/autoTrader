import pika

url = 'amqps://nziprkxv:9yhtrMW6pOYNRLCeQfInjI9U4v2fSDET@cow.rmq2.cloudamqp.com/nziprkxv'
params = pika.URLParameters(url)

connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='admin')


def callback(ch, method, properties, body):
    print('Admin Queue:' + body.decode("utf-8"))


channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)

print('Started consuming')

channel.start_consuming()

channel.close()
