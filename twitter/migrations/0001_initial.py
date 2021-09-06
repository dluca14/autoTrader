# Generated by Django 3.2.3 on 2021-09-06 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tweet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.CharField(max_length=256)),
                ('user_location', models.CharField(max_length=256, null=True)),
                ('language', models.CharField(max_length=20)),
                ('hashtags', models.CharField(max_length=256)),
                ('text', models.TextField(max_length=256)),
            ],
        ),
    ]
