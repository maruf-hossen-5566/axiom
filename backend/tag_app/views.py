import time
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from post_app.models import Post
from post_app.serializers import PostSerializer
from dashboard_app.urls import CustomPagination
from .serializers import TagSerializer
from .models import Tag
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Count


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_tags_for_post_submit(request):
    query = request.data.get("query") or ""
    exclude = request.data.get("exclude") or []

    tags = Tag.objects.filter(Q(name__istartswith=query) | Q(name__icontains=query)).exclude(id__in=exclude).annotate(
        post_count=Count("tags__id")).order_by("-post_count")[:5]

    serializer = TagSerializer(tags, many=True, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_tags(request):
    tags = Tag.objects.all()

    paginator = CustomPagination()
    paginator.page_size = 15
    result_page = paginator.paginate_queryset(tags, request)
    serializer = TagSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_tag(request, slug):
    tag = get_object_or_404(Tag, slug=slug)
    post_qs = Post.objects.filter(tags__id=tag.id)

    paginator = CustomPagination()
    paginator.page_size = 15
    result_page = paginator.paginate_queryset(post_qs, request)
    post_serializer = PostSerializer(result_page, many=True, context={"request": request})
    tag_serializer = TagSerializer(tag, context={"request": request})
    paginated_response = paginator.get_paginated_response(post_serializer.data)
    response = {"tag": tag_serializer.data, "posts": paginated_response.data}
    return Response(response, status.HTTP_200_OK)
