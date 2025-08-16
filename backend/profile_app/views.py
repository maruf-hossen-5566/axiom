import time
import uuid
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
from auth_app.serializers import UserSerializer
from utils.helpers import validate_uuid
from post_app.serializers import PostSerializer
from post_app.models import Post
from profile_app.models import Block, Follow

User = get_user_model()


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def follow(request):
    author_id = request.data.get("author_id")

    if not author_id or not validate_uuid(author_id):
        return Response({"detail": "Invalid UUID."}, status.HTTP_400_BAD_REQUEST)

    if str(author_id) == str(request.user.id):
        return Response(
            {"detail": "You cannot follow yourself."}, status.HTTP_400_BAD_REQUEST
        )

    author = get_object_or_404(User, id=author_id)

    follow_instance, created = Follow.objects.get_or_create(
        author=author, user=request.user
    )

    data = {}
    if created:
        data["detail"] = f'Following "{author.get_full_name()}"'
        data["user"] = UserSerializer(
            follow_instance.author, context={"request": request}
        ).data
    else:
        data["detail"] = f'Unfollowed "{author.get_full_name()}"'
        follow_instance.delete()
        data["user"] = UserSerializer(author, context={"request": request}).data

    data["following_ids"] = request.user.get_following_ids()

    return Response(data, status.HTTP_200_OK)


@api_view(["GET"])
def get_profile(request):
    username: str = request.query_params.get("username")

    if not (username and username.strip()):
        return Response(
            {"detail": "Username not provided."}, status.HTTP_400_BAD_REQUEST
        )

    profile = get_object_or_404(User, username=username)
    posts = get_list_or_404(Post, author=profile)

    is_following = False
    if request.user and request.user.is_authenticated:
        is_following = Follow.objects.filter(author=profile, user=request.user).exists()

    data = {
        "profile": UserSerializer(profile, context={"request": request}).data,
        "is_following": is_following,
        "posts": PostSerializer(posts, many=True, context={"request": request}).data,
    }
    return Response(data, status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def block_profile(request):
    profile_id = request.data.get("profile_id")

    if not profile_id or not validate_uuid(profile_id):
        return Response({"detail": "Invalid UUID."}, status.HTTP_400_BAD_REQUEST)

    if uuid.UUID(profile_id) == request.user.id:
        return Response(
            {"detail": "You cannot block your self."}, status.HTTP_400_BAD_REQUEST
        )

    user = get_object_or_404(User, id=profile_id)
    obj, created = Block.objects.get_or_create(blocker=request.user, blocked=user)

    data = {}

    if created:
        data["detail"] = f'Blocked "{user.get_full_name()}"'
    else:
        obj.delete()
        data["detail"] = f'Unblocked "{user.get_full_name()}"'

    data["blocked_ids"] = request.user.get_blocked_ids()

    return Response(data, status.HTTP_200_OK)
