from rest_framework import serializers
from auth_app.serializers import UserSerializer
from comment_app.models import Comment
from django.shortcuts import get_object_or_404


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()
    to = UserSerializer(read_only=True)
    is_updated = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_is_liked(self, obj):
        request = self.context.get("request", None)
        if request and request.user.is_authenticated:
            return request.user.comment_likes.filter(comment=obj).exists()
        return False

    def get_replies(self, obj):
        serializer = CommentSerializer(
            obj.replies.all(), many=True, context=self.context
        )
        return serializer.data

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_reply_count(self, obj):
        return obj.replies.count()

    def get_is_updated(self, obj):
        return obj.updated_at > obj.created_at
