<b>Intelligent auto-trader for cryptocurrency</b>

In financial research, one of the major topics is asset pricing prediction. The proposal is a system employing Machine Learning (ML) algorithms to predict the cryptocurrency values on time horizons ranging from 1 minute to 1 day. Connecting to various cryptocurrency markets via APIs and additional sources of information (e.g. Twitter), the system shall use live trading data to enable a configurable ‘auto-trader’ option based on the output predictions of the ML algorithms. By combining blockchain-based features and sentiment-based information, the automatic trading option shall be allowed to use real cryptocurrency for maximizing the profit of the user.


⌨ <b>Setup Commands</b> ⌨ <br>
`docker compose up` - To start-up django & postgres on docker <br>

`cd frontend` - The following must be run from the frontend folder <br> 
`npm i` - To install frontend dependencies <br>
`npm run dev` - To run the frontend <br>
Go to 'localhost:15672' to access RabbitMQ management console


⌨ <b>Django Migrations</b> ⌨ <br>
`docker compose exec backend sh` - '#' should appear <br>
`python manage.py makemigrations <APP>` - you can also optionally specify what app you want to taget example: `accounts`<br> 
`python manage.py migrate` <br>
`python manage.py loaddata coins` - this is used to load the default coins in the database

⚠️ <b>Troubleshooting</b> ⚠️<br>
If the custom user model has been fundamentally changed the following must be deleted: <br>
- the 'data' folder inside auto_trader
- the 'at_postgres' Docker container
- the migrations inside accounts/migrations folder

After that, run `docker compose up` and see the section on Django Migrations