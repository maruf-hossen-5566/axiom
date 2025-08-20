import time
import uuid
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404, get_list_or_404
from .models import Like, Post, Thumbnail
from .serializers import PostSerializer, ThumbnailSerializer
from utils.helpers import get_first_error
from django.db.models import Q


@api_view(["GET"])
def get(request, author_name=None, slug=None):
    if author_name and slug:
        post = get_object_or_404(Post, author__username=author_name, slug=slug)
        is_liked = False
        if request.user.is_authenticated:
            is_liked = Like.objects.filter(post=post, user=request.user).exists()
        serializer = PostSerializer(post, context={"request": request})
        data = {
            "post": serializer.data,
            "isLiked": is_liked,
        }
        return Response(data, status=status.HTTP_200_OK)

    posts = get_list_or_404(Post.objects.order_by("-published_at"))
    serializer = PostSerializer(posts, many=True, context={"request": request})
    return Response({"posts": serializer.data}, status=status.HTTP_200_OK)


@api_view(["GET"])
def more_from_author(request):
    author_id = request.query_params.get("author_id")
    post_id = request.query_params.get("post_id")

    if not (author_id or post_id):
        return Response(
            {"detail": "Author and Post ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    posts = Post.objects.filter(~Q(id=post_id) & Q(author__id=author_id))
    serializer = PostSerializer(posts, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["GET"])
def more_to_read(request):
    author_id = request.query_params.get("author_id")
    post_id = request.query_params.get("post_id")

    if not (author_id or post_id):
        return Response(
            {"detail": "Author and Post ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    posts = Post.objects.filter(~Q(id=post_id) & ~Q(author__id=author_id))
    serializer = PostSerializer(posts, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["POST", "PUT"])
@permission_classes([IsAuthenticated])
def add(request):
    time.sleep(1)
    data = request.data.copy()
    data["author_id"] = request.user.id

    serializer = PostSerializer(data=data, context={"request": request})

    if request.method == "PUT":
        pk = data.get("id")
        post = get_object_or_404(Post, id=pk)
        serializer = PostSerializer(post, data=data, context={"request": request})

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"detail": "Post published successfully.", "post": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    first_error = get_first_error(serializer.errors)
    return Response({"detail": first_error}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_thumbnail(request):
    img = request.FILES.get("image")
    prev_id = request.data.get("prev_id")

    if prev_id:
        thumbnail = Thumbnail.objects.filter(id=prev_id)
        if thumbnail and thumbnail.first():
            if thumbnail.first().author == request.user:
                thumbnail.first().delete()
            else:
                return Response(
                    {
                        "detail": "Access Denied – You don’t have permission to perform this action."
                    },
                    status.HTTP_403_FORBIDDEN,
                )

    thumbnail = Thumbnail.objects.create(image=img, author=request.user)
    serializer = ThumbnailSerializer(thumbnail, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete_thumbnail(request):
    thumbnail_id = request.data.get("id")

    if not thumbnail_id:
        return Response(
            {"detail": "Thumbnail ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    thumbnail = Thumbnail.objects.filter(id=thumbnail_id)
    if thumbnail and thumbnail.first():
        if thumbnail.first().author == request.user:
            thumbnail.first().delete()
        else:
            return Response(
                {
                    "detail": "Access Denied – You don’t have permission to perform this action."
                },
                status.HTTP_403_FORBIDDEN,
            )

    return Response(status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete(request):
    time.sleep(1)
    post_id = request.data.get("post_id")

    if not post_id:
        return Response(
            {"detail": "Post ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    post = get_object_or_404(Post, id=post_id, author=request.user)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def like(request):
    post_id: str = request.data.get("post_id")

    if not (post_id and post_id.strip()):
        return Response(
            {"detail": "Post ID not provided."}, status.HTTP_400_BAD_REQUEST
        )

    post = get_object_or_404(Post, id=post_id)

    if post.disableComment:
        return Response({"detail": "Likes are disabled."}, status.HTTP_400_BAD_REQUEST)

    is_liked = Like.objects.filter(post=post, user=request.user)

    if is_liked.exists():
        is_liked.delete()
        is_liked = False
    else:
        Like.objects.create(user=request.user, post=post)
        is_liked = True

    data = {"is_liked": is_liked, "like_count": post.get_like_count()}

    return Response(data, status.HTTP_200_OK)
