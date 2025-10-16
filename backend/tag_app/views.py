from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_list_or_404, get_object_or_404
from .serializers import TagSerializer
from .models import Tag
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Count


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def get_tags(request, slug=None):
    query = request.data.get("query", "")
    exclude_ids = request.data.get("exclude", [])

    if slug:
        tag = get_object_or_404(Tag, slug=slug)
        serializer = TagSerializer(tag, context={"request": request})
        return Response(serializer.data, status.HTTP_200_OK)

    tags = (
        Tag.objects.filter(Q(name__istartswith=query) | Q(name__icontains=query))
        .exclude(id__in=exclude_ids)
        .annotate(post_count=Count("tags__id"))
        .order_by("-post_count")[:5]
    )

    serializer = TagSerializer(tags, many=True, context={"request": request})
    return Response({"tags": serializer.data}, status.HTTP_200_OK)
