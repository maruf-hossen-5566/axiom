from rest_framework import serializers
from .models import Post, Thumbnail
from auth_app.serializers import UserSerializer
from django.contrib.auth import get_user_model

from tag_app.serializers import TagSerializer

from tag_app.models import Tag

User = get_user_model()


class ThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thumbnail
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    slug = serializers.ReadOnlyField()
    thumbnail = ThumbnailSerializer(read_only=True)
    thumbnail_id = serializers.PrimaryKeyRelatedField(
        queryset=Thumbnail.objects.all(),
        write_only=True,
        source="thumbnail",
        required=False,
    )
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source="author"
    )
    like_count = serializers.SerializerMethodField(method_name="get_like_count")
    comment_count = serializers.SerializerMethodField(method_name="get_comment_count")
    is_liked = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    tags_ids = serializers.PrimaryKeyRelatedField(source="tags", queryset=Tag.objects.all(), write_only=True, many=True)

    class Meta:
        model = Post
        fields = "__all__"
        extra_kwargs = {
            "title": {"error_messages": {"blank": "Title must be provided."}},
            "content": {"error_messages": {"blank": "Content must be provided."}},
        }

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_comment_count(self, obj):
        return obj.comments.filter(parent__isnull=True).count()

    def get_is_liked(self, obj):
        request = self.context.get("request")

        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False
