from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404, get_list_or_404
from django.contrib.auth import get_user_model
from auth_app.serializers import UserSerializer
from post_app.serializers import PostSerializer
from post_app.models import Post
from profile_app.models import Follow

User = get_user_model()


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def follow(request):
    author_id = request.data.get("author_id")

    if not author_id:
        return Response(
            {"detail": "Author ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    if str(author_id) == str(request.user.id):
        return Response(
            {"detail": "You cannot follow yourself."}, status.HTTP_400_BAD_REQUEST
        )

    author = get_object_or_404(User, id=author_id)

    follow_instance = Follow.objects.filter(author=author, user=request.user)
    if follow_instance.exists():
        follow_instance.delete()
        message = f'Unfollowed "{author.get_full_name()}"'
    else:
        user = Follow.objects.create(author=author, user=request.user)
        message = f'Following "{author.get_full_name()}"'

    following_ids = request.user.get_following_ids()
    return Response(
        {
            "detail": message,
            "user": UserSerializer(user.author, context={"request": request}).data,
            "following_ids": following_ids,
        },
        status.HTTP_200_OK,
    )


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
