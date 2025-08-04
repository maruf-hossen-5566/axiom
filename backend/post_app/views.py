import time
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Post, Thumbnail
from .serializers import PostSerializer, ThumbnailSerializer


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
@permission_classes([IsAuthenticated])
def add(request):
    time.sleep(1)
    data = request.data.copy()
    data["author"] = request.user.id or data["author"]

    serializer = PostSerializer(data=data)

    if request.method == "PUT":
        pk = data.get("id")
        post = get_object_or_404(Post, id=pk)
        serializer = PostSerializer(post, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Post published successfully.", "post": serializer.data},
                        status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_thumbnail(request):
    # post_id = request.data.get("post_id")

    img = request.FILES.get("image")

    thumbnail = Thumbnail.objects.create(image=img)
    serializer = ThumbnailSerializer(thumbnail, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_thumbnail(request):
    thumbnail_id = request.data.get("id")

    if not thumbnail_id:
        return Response({"detail": "Thumbnail ID not provided."}, status.HTTP_400_BAD_REQUEST)

    thumbnail = get_object_or_404(Thumbnail, id=thumbnail_id)
    if thumbnail:
        thumbnail.delete()
    return Response(status.HTTP_204_NO_CONTENT)


@api_view(["DELETE"])
def delete(request, pk):
    post = get_object_or_404(Post, id=pk)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)
