from rest_framework import serializers
from auth_app.serializers import UserSerializer
from comment_app.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = "__all__"
