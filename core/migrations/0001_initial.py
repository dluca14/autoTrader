# Generated by Django 3.2.3 on 2021-09-06 07:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Coin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=12)),
                ('name', models.CharField(blank=True, max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='CoinAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('amount', models.FloatField()),
                ('coin', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='core.coin')),
                ('user_account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='coin_accounts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
