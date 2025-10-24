import time

from comment_app.models import Comment, CommentLike, Post
from comment_app.serializers import CommentSerializer
from django.contrib.auth import get_user_model
from django.db.models import Count, ExpressionWrapper, IntegerField, F
from django.shortcuts import get_object_or_404
from post_app.urls import post_published_required
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from utils.helpers import get_first_error

User = get_user_model()


@api_view(["POST"])
def get(request):
    sort = request.data.get("sort", None)
    post_id = request.data.get("post")

    if sort and sort == "new":
        comments = Comment.objects.filter(post__id=post_id, parent__isnull=True).order_by("-created_at")
    else:
        comments = Comment.objects.filter(post__id=post_id, parent__isnull=True).annotate(
            like_count=Count("likes"),
            reply_count=Count("replies")
        ).annotate(
            engagement=ExpressionWrapper(F("like_count") + F("reply_count"), output_field=IntegerField())).order_by(
            "-engagement")

    serializer = CommentSerializer(comments, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["POST", "PUT"])
@post_published_required
@permission_classes([IsAuthenticated])
def add(request):
    post_id = request.data.get("post")

    if not post_id:
        return Response(
            {"detail": "Post ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    serializer = CommentSerializer(data=request.data, context={"request": request})

    post = get_object_or_404(Post, id=post_id)

    if post.disable_comment:
        return Response(
            {"detail": "Comments are disabled."}, status.HTTP_400_BAD_REQUEST
        )

    if request.method == "PUT":
        comment_id = request.data.get("id")
        comment_object = get_object_or_404(Comment, id=comment_id)
        serializer = CommentSerializer(
            comment_object, data=request.data, context={"request": request}
        )

    if serializer.is_valid():
        print("In Data: ", serializer.initial_data.get("to"))
        extra = {"author": request.user}
        to = serializer.initial_data.get("to")

        if to:
            extra["to"] = get_object_or_404(User, id=to)

        comment = serializer.save(**extra)
        data = {
            "comment_count": post.get_comment_count(),
            "comment": serializer.data,
        }
        if comment and comment.parent:
            data["parent_reply_count"] = comment.parent.replies.count()

        return Response(data, status.HTTP_200_OK)

    first_error = get_first_error(serializer.errors)
    return Response({"detail": first_error}, status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@post_published_required
@permission_classes([IsAuthenticated])
def delete(request):
    comment_id = request.data.get("comment_id")

    comment = get_object_or_404(Comment, id=comment_id, author=request.user)
    comment.delete()

    data = {}
    if comment.parent:
        data["parent"] = comment.parent.id
        comment.parent.refresh_from_db()
        data["parent_reply_count"] = comment.parent.replies.count()

    comment_count = comment.post.get_comment_count()

    data["comment_count"] = comment_count
    return Response(data, status.HTTP_200_OK)


@api_view(["POST"])
@post_published_required
@permission_classes([IsAuthenticated])
def like(request):
    comment_id = request.data.get("comment_id")
    comment_obj = get_object_or_404(Comment, id=comment_id)

    is_liked = request.user.comment_likes.filter(comment__id=comment_id)

    if is_liked.exists():
        is_liked.delete()
    else:
        CommentLike.objects.create(author=request.user, comment=comment_obj)

    serializer = CommentSerializer(comment_obj, context={"request": request})
    data = {"comment": serializer.data}

    if comment_obj.parent is not None:
        data["parent"] = comment_obj.parent.id

    return Response(data, status.HTTP_200_OK)
