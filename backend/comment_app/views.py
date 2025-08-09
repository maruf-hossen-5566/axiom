import time
from rest_framework.response import Response
from rest_framework import status
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
    comments = Comment.objects.filter(Q(post__id=post_id))
    serializer = CommentSerializer(comments, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["POST", "PUT"])
@permission_classes([IsAuthenticated])
def add(request):
    serializer = CommentSerializer(data=request.data, context={"request": request})

    if request.method == "PUT":
        id = request.data.get("id")
        comment_object = get_object_or_404(Comment, id=id)
        serializer = CommentSerializer(
            comment_object, data=request.data, context={"request": request}
        )

    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status.HTTP_200_OK)

    first_error = get_first_error(serializer.errors)
    return Response(first_error, status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated])
@api_view(["POST"])
def delete(request):
    id = request.data.get("id")
    comment = get_object_or_404(Comment, id=id)
    if request.user == comment.author:
        comment.delete()
        return Response(status.HTTP_204_NO_CONTENT)

    return Response(
        {"detail": "Access Denied – You don’t have permission to perform this action."},
        status.HTTP_403_FORBIDDEN,
    )
