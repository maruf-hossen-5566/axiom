from django.contrib import admin
from .models import Post, Thumbnail


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "title")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ["-published_at", ]

@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ("id", "post__title")
    ordering = ["-created_at",]