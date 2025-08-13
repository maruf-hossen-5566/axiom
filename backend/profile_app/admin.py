from django.contrib import admin
from profile_app.models import Follow


# Register your models here.
@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ("id", "author__full_name", "user__full_name")
    ordering = [
        "-created_at",
    ]
