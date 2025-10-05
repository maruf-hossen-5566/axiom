from django.contrib import admin
from comment_app.models import Comment, CommentLike


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("id", "author__full_name", "content", "created_at")
    readonly_fields = ("id",)
    search_fields=("post__title",)
    ordering = [
        "-created_at",
    ]


@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "comment__id","created_at")
    readonly_fields = ("id",)
    ordering = [
        "-created_at",
    ]
