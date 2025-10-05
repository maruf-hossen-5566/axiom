import time
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from bookmark_app.serializers import BookmarkSerializer
from .pagination import CustomPagination
from post_app.models import Post
from post_app.serializers import PostSerializer
from django.db.models import (
    ExpressionWrapper,
    F,
    Sum,
    FloatField,
    Count,
    IntegerField,
    Q,
)
from django.contrib.auth import get_user_model
from auth_app.serializers import UserSerializer

User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_posts(request):
    query = request.query_params.get("query") or ""
    sort_by = request.query_params.get("sort") or ""

    posts = request.user.posts.filter(title__icontains=query)

    if sort_by == "oldest":
        posts = posts.order_by("created_at")
    elif sort_by == "most-engagement":
        posts = posts.annotate(
            engagement=ExpressionWrapper(
                Count("likes__id", distinct=True)
                + Count("comments__id", distinct=True),
                output_field=IntegerField(),
            )
        )
        posts = posts.order_by("-engagement")
    elif sort_by == "least-engagement":
        posts = posts.annotate(
            engagement=ExpressionWrapper(
                Count("likes__id", distinct=True)
                + Count("comments__id", distinct=True),
                output_field=IntegerField(),
            )
        )
        posts = posts.order_by("engagement")
    else:
        posts = posts.order_by("-created_at")

    paginator = CustomPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True, context={"request": request})

    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_bookmarks(request):
    query = request.query_params.get("query") or ""
    ids = request.user.bookmarks.values_list("post__id", flat=True)
    posts = Post.objects.filter(id__in=ids, title__icontains=query).order_by(
        "-bookmarks__created_at"
    )

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_followers(request):
    time.sleep(1)
    query = request.query_params.get("query") or ""
    ids = request.user.followers.values_list("user__id", flat=True)
    users = User.objects.filter(
        Q(id__in=ids) & (Q(full_name__icontains=query) | Q(username__icontains=query))
    ).order_by("-following__created_at")

    paginator = CustomPagination()
    # paginator.page_size = 1
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following(request):
    time.sleep(1)
    query = request.query_params.get("query") or ""
    ids = request.user.following.values_list("author__id", flat=True)
    users = User.objects.filter(
        Q(id__in=ids) & (Q(full_name__icontains=query) | Q(username__icontains=query))
    ).order_by("-followers__created_at")

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)
