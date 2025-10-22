import time

from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, UserSerializer

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
        user_serializer = UserSerializer(user, context={"request": request})
        following_ids = user.get_following_ids()
        blocked_ids = user.get_blocked_ids()
        bookmark_ids = user.bookmarks.values_list("post__id", flat=True)

        data = {
            "detail": "Log in was successful.",
            "user": user_serializer.data,
            "following_ids": following_ids,
            "blocked_ids": blocked_ids,
            "bookmark_ids": bookmark_ids,
            "tokens": {"access": str(refresh.access_token), "refresh": str(refresh)},
        }
        return Response(data, status.HTTP_200_OK)

    return Response(
        {"detail": "Invalid credentials. Please check the email and password."},
        status.HTTP_400_BAD_REQUEST,
    )


@api_view(["GET"])
def get(request):
    username = request.query_params("username")

    if username:
        user = get_object_or_404(User, username=username)
        serializer = UserSerializer(user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    user = get_list_or_404(User)
    serializer = UserSerializer(user, many=True, context={"request": request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete(request):
    try:
        time.sleep(1)
        request.user.delete()
        return Response(status.HTTP_204_NO_CONTENT)
    except Exception as error:
        return Response({"detail": error}, status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def update(request):
    time.sleep(1)
    user = get_object_or_404(User, id=request.user.id)

    serializer = UserSerializer(user, data=request.data, partial=True, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        data = {
            "user": serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    old_pass = request.data.get("old")
    new_pass = request.data.get("new")

    valid_old_password = user.check_password(old_pass)

    if not valid_old_password:
        return Response({"detail": "Old password do not match."}, status.HTTP_400_BAD_REQUEST)

    try:
        validate_password(new_pass)
    except ValidationError as error:
        return Response({"detail": error}, status.HTTP_400_BAD_REQUEST)

    user.set_password(new_pass)
    user.save()

    return Response({"detail": "Password has been updated. Now please login with new password."}, status.HTTP_200_OK)
