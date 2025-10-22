from django.contrib import admin
from .models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("id", "type", "created_at")
    ordering = [
        "-created_at",
    ]
    search_fields = ("by__full_name", "_for__full_name")
