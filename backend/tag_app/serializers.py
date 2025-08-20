from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = "__all__"
