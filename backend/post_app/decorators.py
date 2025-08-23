from functools import wraps
from rest_framework.response import Response
from .models import Post
from django.shortcuts import get_object_or_404
from rest_framework import status


def author_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        post_id = request.data.get("post_id") or request.data.get("post")

        post = get_object_or_404(Post, id=post_id)

        if post.author != request.user:
            return Response(
                {
                    "detail": "Access Denied – You don’t have permission to perform this action."
                },
                status.HTTP_403_FORBIDDEN,
            )
        response = view_func(request, *args, **kwargs)
        return response

    return wrapper


def post_published_required(view_func):
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        post_id = request.data.get("post_id") or request.data.get("post")
        get_object_or_404(Post, id=post_id, published=True)

        response = view_func(request, *args, **kwargs)
        return response

    return wrapper
