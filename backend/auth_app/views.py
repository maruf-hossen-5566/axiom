import time
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model, authenticate

User = get_user_model()


@api_view(["POST"])
def signup(request):
    time.sleep(1)
    data = request.data

    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "detail": "Account has been created successfully. Please log in to continue."
            },
            status.HTTP_201_CREATED,
        )

    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    user = authenticate(request, email=email, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        serializer = UserSerializer(user, context={"request": request})
        data = {
            "detail": "Log in was successful.",
            "user": serializer.data,
            "tokens": {"access": str(refresh.access_token), "refresh": str(refresh)},
        }
        return Response(data, status.HTTP_200_OK)

    return Response(
        {"detail": "Invalid credentials. Please check the email and password."},
        status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
def get(request, pk=None):
    if pk:
        user = get_object_or_404(User, id=pk)
        serializer = UserSerializer(user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    user = get_list_or_404(User)
    serializer = UserSerializer(user, many=True, context={"request": request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete(request, pk):
    user = get_object_or_404(User, id=pk)
    if request.user == user:
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(
        {"detail": "You don't have permission to perform this action."},
        status=status.HTTP_403_FORBIDDEN,
    )
