from rest_framework import serializers
from .models import Tag
from django.db.models import Count


class TagSerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = Tag
        fields = "__all__"

    def get_post_count(self, obj):
        return obj.tags.count()
