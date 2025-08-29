from rest_framework import serializers
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    post_count = serializers.ReadOnlyField()

    class Meta:
        model = Tag
        fields = "__all__"
