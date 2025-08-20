from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import TagSerializer
from .models import Tag


def get_tags(request, slug=None):
    if slug:
        tag = get_object_or_404(Tag, slug=slug)
        serializer = TagSerializer(tag, context={"request": request})
        return Response(serializer.data, status.HTTP_200_OK)

    tags = get_list_or_404(Tag, slug=slug)
    serializer = TagSerializer(tags, context={"request": request})
    return Response(serializer.data, status.HTTP_200_OK)
