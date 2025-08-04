from django.contrib import admin
from .models import Post, Thumbnail


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "title")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Thumbnail)
class ThumbnailAdmin(admin.ModelAdmin):
    list_display = ("id", "post__title")