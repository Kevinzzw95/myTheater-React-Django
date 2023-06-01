from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User
import uuid


# Create your models here.
# class Movie(models.Model):
#     adult = models.BooleanField()
#     backdrop_path = models.CharField(max_length=2000, null=True, blank=True)
#     genre_ids = ArrayField(models.IntegerField())
#     id = models.IntegerField(unique=True, primary_key=True, editable=False)
#     media_type = models.CharField(max_length=50, null=True, blank=True)
#     original_language = models.CharField(max_length=50, blank=True)
#     original_title = models.TextField(null=True, blank=True)
#     overview = models.TextField()
#     popularity = models.IntegerField(blank=True)
#     poster_path = models.CharField(max_length=2000, null=True, blank=True)
#     release_date = models.CharField(max_length=200, blank=True)
#     title = models.TextField(blank=True)
#     video = models.BooleanField()
#     vote_average = models.IntegerField()
#     vote_count = models.IntegerField(blank=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    fav_list = ArrayField(models.IntegerField(), blank=True, default=list)
    watched_list = ArrayField(models.IntegerField(), blank=True, default=list)
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)

    def __str__(self):
        return self.username
    
