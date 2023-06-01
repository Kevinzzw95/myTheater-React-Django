from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import ProfileSerializer
from my_theater.models import Profile
from django.contrib.auth.models import User
from django.contrib.auth import logout
import jwt
from backend.settings import SECRET_KEY


@api_view(['GET'])
def getRoutes(request):

    routes = [
        {'GET':'/api/profile/'},
        {'GET':'/api/login/'},
        {'POST':'/api/login/refresh/'},
    ]

    return JsonResponse(routes, safe=False)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def profile(request):
    token = request.headers['Authorization'].split(" ")[1]
    userName = jwt.decode(token, SECRET_KEY, "HS256")['user_name']
    print('username:', userName)
    profile = Profile.objects.get(username=userName)
    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        print(request.data)
        profile.fav_list = request.data['fav_list']
        profile.watched_list = request.data['watched_list']
        profile.save()
        return JsonResponse("Success", safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logoutUser(request):
    logout(request)
    return 

@api_view(['POST'])
def registerUser(request):
    data = request.data
    print('Data username:', data['username'])
    newUser = User.objects.create_user(
        data['username'],
        data['email'],
        password = data['password']
    )
    newUser.save()
    return JsonResponse(newUser)