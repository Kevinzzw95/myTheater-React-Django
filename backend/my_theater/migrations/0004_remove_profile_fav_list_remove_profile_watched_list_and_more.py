# Generated by Django 4.2.1 on 2023-05-30 18:57

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_theater', '0003_profile_delete_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='fav_list',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='watched_list',
        ),
        migrations.DeleteModel(
            name='Movie',
        ),
        migrations.AddField(
            model_name='profile',
            name='fav_list',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=None),
        ),
        migrations.AddField(
            model_name='profile',
            name='watched_list',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, null=True, size=None),
        ),
    ]
