from rest_framework import serializers
from .models import Post, Thumbnail


class PostSerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()

    class Meta:
        model = Post
        fields = "__all__"


class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = "__all__"