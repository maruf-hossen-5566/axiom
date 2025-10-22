from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "full_name")
    ordering = [
        "-date_joined",
    ]
    search_fields = ("full_name", "email")
