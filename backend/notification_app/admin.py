from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "is_read", "created_at")
    ordering = [
        "-created_at",
    ]
    search_fields = ("actor__full_name", "user__full_name")
