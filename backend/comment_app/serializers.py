from rest_framework import serializers
from auth_app.serializers import UserSerializer
from comment_app.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_replies(self, obj):
        serializer = CommentSerializer(
            obj.replies.all(), many=True, context=self.context
        )
        return serializer.data
