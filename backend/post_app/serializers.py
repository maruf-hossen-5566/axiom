from rest_framework import serializers
from .models import Post, Thumbnail
from auth_app.serializers import UserSerializer
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

User = get_user_model()


class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()
    thumbnail = ThumbnailSerializer(read_only=True)
    thumbnail_id = serializers.PrimaryKeyRelatedField(queryset=Thumbnail.objects.all(), write_only=True,
                                                      source="thumbnail", required=False)
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True,
                                                   source="author")

    class Meta:
        model = Post
        fields = "__all__"
        extra_kwargs = {
            "title": {
                "error_messages": {
                    "blank": "Title must be provided."
                }
            },
            "content": {
                "error_messages": {
                    "blank": "Content must be provided."
                }
            }
        }
