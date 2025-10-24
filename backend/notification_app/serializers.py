from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from auth_app.serializers import UserSerializer
from comment_app.serializers import CommentSerializer
from post_app.serializers import PostSerializer
from .models import Notification

User = get_user_model()


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    actor = UserSerializer(read_only=True)
    post = PostSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"
