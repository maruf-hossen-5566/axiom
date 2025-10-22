from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from auth_app.serializers import UserSerializer
from .models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    by = UserSerializer(read_only=True)
    n_for = UserSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
