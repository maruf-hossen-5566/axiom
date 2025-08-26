from rest_framework.response import Response
from rest_framework import status
from post_app.urls import post_published_required
from utils.helpers import get_first_error
from comment_app.serializers import CommentSerializer
from comment_app.models import Comment, Post
from django.shortcuts import get_object_or_404, get_list_or_404
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.db.models import Q


@api_view(["GET"])
def get(request):
    post_id = request.query_params.get("post")
    comments = Comment.objects.filter(Q(post__id=post_id) & Q(parent__isnull=True))
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
        id = request.data.get("id")
        comment_object = get_object_or_404(Comment, id=id)
        serializer = CommentSerializer(
            comment_object, data=request.data, context={"request": request}
        )

    if serializer.is_valid():
        serializer.save(author=request.user)
        data = {
            "comment_count": get_object_or_404(
                Post, id=serializer.data.get("post")
            ).get_comment_count(),
            "comment": serializer.data,
        }
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
    return Response(status.HTTP_204_NO_CONTENT)

    # if request.user == comment.author:
    # return Response(status.HTTP_204_NO_CONTENT)

    # return Response(
    #     {"detail": "Access Denied – You don’t have permission to perform this action."},
    #     status.HTTP_403_FORBIDDEN,
    # )


@api_view(["POST"])
@post_published_required
@permission_classes([IsAuthenticated])
def like(request):
    comment_id = request.data.get("comment_id")
    pass
