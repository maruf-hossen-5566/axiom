from django.contrib import admin
from .models import Like, Post, Thumbnail


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "title")
    prepopulated_fields = {"slug": ("title",)}
    ordering = [
        "-published_at",
    ]


@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ("id", "post__title")
    ordering = [
        "-created_at",
    ]


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ("id", "user__full_name", "post__title")
    ordering = ["-created_at"]


# @admin.register(Tag)
# class TagAdmin(admin.ModelAdmin):
#     list_display = ("id", "name", "created_at")
#     ordering = [
#         "-created_at",
#     ]
#     readonly_fields = ("id",)
