import time
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from dashboard_app.pagination import CustomPagination
from .models import Notification
from .serializers import NotificationSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all(request):
    tab = request.query_params.get("tab")
    notification_qs = request.user.notification_for.all()

    if tab:
        notification_qs = notification_qs.filter(type=tab)

    notification_qs = notification_qs.order_by("-created_at")
    paginator = CustomPagination()
    paginator.page_size = 16
    result_page = paginator.paginate_queryset(notification_qs, request)
    serializer = NotificationSerializer(result_page, many=True, context={"request": request})
    return paginator.get_paginated_response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def delete(request):
    pk = request.data.get("id")
    if pk:
        obj = get_object_or_404(Notification, id=pk)
        obj.delete()
        message = "Notification deleted successfully."
    else:
        request.user.notification_for.all().delete()
        message = "Notifications deleted successfully."

    return Response({"detail": message}, status.HTTP_200_OK)
