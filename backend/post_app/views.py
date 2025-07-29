from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Post
from .serializers import PostSerializer


@api_view(["GET"])
def get(request, author_name=None, slug=None):
    if author_name and slug:
        post = get_object_or_404(Post, author__username=author_name, slug=slug)
        serializer = PostSerializer(post, context={request: request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    posts = get_list_or_404(Post)
    serializer = PostSerializer(posts, many=True, context={request: request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST", "PUT"])
def add(request):
    data = request.data.copy()
    data["author"] = request.user.id or data["author"]

    serializer = PostSerializer(data=data)

    if request.method == "PUT":
        pk = data.get("id")
        post = get_object_or_404(Post, id=pk)
        serializer = PostSerializer(post, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete(request, pk):
    post = get_object_or_404(Post, id=pk)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
