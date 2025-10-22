from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import NotificationSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all(request):
    notification_qs = request.user.notification_for.all()
    serializer = NotificationSerializer(notification_qs, many=True)
    return Response(serializer.data, status.HTTP_200_OK)
