from django.contrib import admin
from .models import Like, Post, Thumbnail


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "title")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "author__full_name", "author__username", "tags__name")
    ordering = [
        "-created_at",
    ]


@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ("id", "post__title")
    ordering = [
        "-created_at",
    ]
    readonly_fields = ("id",)


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user__full_name", "post__title", "created_at")
    search_fields = ("post__author__full_name",)
    ordering = ["-created_at"]
