from django.contrib import admin
from profile_app.models import Block, Follow


# Register your models here.
@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ("id", "author__full_name", "user__full_name")
    ordering = [
        "-created_at",
    ]


@admin.register(Block)
class BlockAdmin(admin.ModelAdmin):
    list_display = ("id", "blocker__full_name", "blocked__full_name", "blocked_at")
    readonly_fields = ("id",)
    ordering = [
        "-blocked_at",
    ]
