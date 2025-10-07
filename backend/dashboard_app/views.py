import datetime
import time
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from bookmark_app.serializers import BookmarkSerializer
from .pagination import CustomPagination
from post_app.models import Like, Post
from comment_app.models import Comment
from post_app.serializers import PostSerializer
from django.db.models import (
    ExpressionWrapper,
    F,
    Sum,
    FloatField,
    Count,
    IntegerField,
    Q,
    Value,
    CharField,
)
from django.db.models.functions import Cast
from django.contrib.auth import get_user_model
from auth_app.serializers import UserSerializer
from django.db.models.functions import TruncDate
from profile_app.models import Follow

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
    query = request.query_params.get("query") or ""
    ids = request.user.followers.values_list("user__id", flat=True)
    users = User.objects.filter(
        Q(id__in=ids) & (Q(full_name__icontains=query) | Q(username__icontains=query))
    ).order_by("-following__created_at")

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_following(request):
    query = request.query_params.get("query") or ""
    ids = request.user.following.values_list("author__id", flat=True)
    users = User.objects.filter(
        Q(id__in=ids) & (Q(full_name__icontains=query) | Q(username__icontains=query))
    ).order_by("-followers__created_at")

    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_block_list(request):
    query = request.query_params.get("query") or ""

    blocked_qs = request.user.blocking.values_list("blocked__id", flat=True)
    users = User.objects.filter(
        Q(id__in=blocked_qs)
        & (Q(full_name__icontains=query) | Q(username__icontains=query))
    )
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_card_data(request):
    return Response(
        {
            "visitors": request.user.posts.count(),
            "engagement": request.user.likes.count() + request.user.comments.count(),
            "follower": request.user.followers.count(),
        },
        status.HTTP_200_OK,
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_engagement_data(request):
    filter = request.query_params.get("filter") or "30days"
    if filter == "7days":
        days = 7
    elif filter == "3months":
        days = 90
    else:
        days = 30

    end_date = timezone.now()
    start_date = end_date - datetime.timedelta(days)

    likes_data = (
        Like.objects.filter(
            Q(post__author=request.user) & Q(created_at__gte=start_date)
        )
        .annotate(date=TruncDate("created_at"))
        .values("date")
        .annotate(likes=Count("id"))
        .values("date", "likes")
    )
    comments_data = (
        Comment.objects.filter(
            Q(post__author=request.user) & Q(created_at__gte=start_date)
        )
        .annotate(date=TruncDate("created_at"))
        .values("date")
        .annotate(likes=Count("id"))
        .values("date", "likes")
    )

    likes_dict = {like["date"]: like["likes"] for like in likes_data}
    comments_dict = {comment["date"]: comment["likes"] for comment in comments_data}

    delta = end_date.date() - start_date.date()
    all_dates = [
        start_date.date() + datetime.timedelta(days=i) for i in range(delta.days + 1)
    ]

    engagement_data = []
    for date in all_dates:
        data = {
            "date": date,
            "likes": likes_dict.get(date, 0),
            "comments": comments_dict.get(date, 0),
        }
        engagement_data.append(data)

    return Response(engagement_data, status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_followers_data(request):
    filter = request.query_params.get("filter") or "30days"
    if filter == "7days":
        days = 7
    elif filter == "3months":
        days = 90
    else:
        days = 30

    end_date = timezone.now()
    start_date = end_date - datetime.timedelta(days)

    followers_qs = (
        Follow.objects.filter(Q(author=request.user) & Q(created_at__gte=start_date))
        .annotate(date=TruncDate("created_at"))
        .values("date")
        .annotate(followers=Count("id"))
        .values("date", "followers")
    )

    followers_dict = {
        follower["date"]: follower["followers"] for follower in followers_qs
    }

    delta = end_date.date() - start_date.date()
    all_dates = [
        start_date.date() + datetime.timedelta(days=i) for i in range(delta.days + 1)
    ]

    followers_data = []
    for date in all_dates:
        data = {
            "date": date,
            "followers": followers_dict.get(date, 0),
        }
        followers_data.append(data)

    return Response(followers_data, status.HTTP_200_OK)
