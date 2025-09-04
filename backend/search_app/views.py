import time
from auth_app.serializers import UserSerializer
from django.contrib.auth import get_user_model
from post_app.models import Post
from post_app.serializers import PostSerializer
from profile_app.models import Block, Follow
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tag_app.models import Tag
from tag_app.serializers import TagSerializer
from utils.helpers import validate_uuid
from django.db.models import Q

User = get_user_model()


@api_view(["POST"])
def search_all(request):
    q = request.data.get("query", "")

    post_q = Post.objects.filter(
        Q(title__icontains=q)
        | Q(author__full_name__icontains=q)
        | Q(author__username__icontains=q) & Q(published=True)
    )[:5]
    user_q = User.objects.filter(Q(full_name__icontains=q) | Q(username__icontains=q))[
        :5
    ]
    tag_q = Tag.objects.filter(Q(name__icontains=q))[:5]

    posts = PostSerializer(post_q, many=True, context={"request": request})
    users = UserSerializer(user_q, many=True, context={"request": request})
    tags = TagSerializer(tag_q, many=True, context={"request": request})

    data = {
        "posts": None,
        "users": None,
        "tags": None,
    }

    if len(post_q) > 0:
        data["posts"] = posts.data
    if len(user_q) > 0:
        data["users"] = users.data
    if len(tag_q) > 0:
        data["tags"] = tags.data

    return Response(data, status.HTTP_200_OK)
