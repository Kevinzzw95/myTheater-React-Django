from rest_framework import serializers
from my_theater.models import Profile
from django.contrib.auth.models import User

# class MovieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Movie
#         fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    fav_list = serializers.ListField(child=serializers.IntegerField())
    watched_list = serializers.ListField(child=serializers.IntegerField())
    class Meta:
        model = Profile
        fields = ['username', 'email', 'fav_list', 'watched_list']