from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from post_app.models import Post
from .models import Bookmark
from post_app.decorators import post_published_required
from django.shortcuts import get_object_or_404


@api_view(["POST"])
@post_published_required
@permission_classes([IsAuthenticated])
def add(request):
    post_id = request.data.get("post_id")
    obj = Bookmark.objects.filter(post__id=post_id, post__published=True)

    if obj.exists():
        obj.delete()
        message = "Bookmark removed."
    else:
        post = get_object_or_404(Post, id=post_id, published=True)
        Bookmark.objects.create(post=post, author=request.user)
        message = "Bookmark saved."

    bookmarked_ids = request.user.bookmarks.values_list("post__id", flat=True)
    return Response({"detail": message, "bookmarked_ids": bookmarked_ids}, status.HTTP_200_OK)
