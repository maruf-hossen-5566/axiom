import time
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .pagination import CustomPagination
from post_app.models import Post
from post_app.serializers import PostSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_posts(request):
    query = request.query_params.get("query") or ""
    sort_by = request.query_params.get("sort-by") or ""

    posts = request.user.posts.filter(title__icontains=query).order_by("-created_at")
    paginator = CustomPagination()
    paginator.page_size = 10
    result_page = paginator.paginate_queryset(posts, request)
    serializer = PostSerializer(result_page, many=True, context={"request": request})

    return paginator.get_paginated_response(serializer.data)
