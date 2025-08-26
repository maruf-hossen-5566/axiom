from django.contrib import admin
from .models import Bookmark


@admin.register(Bookmark)
class BookmarkAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "post__title", "created_at")
    ordering = [
        "-created_at",
    ]
