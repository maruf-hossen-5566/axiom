from django.contrib import admin
from comment_app.models import Comment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "author__full_name","content", "created_at")
    readonly_fields = ("id",)
    ordering = [
        "-created_at",
    ]
