from django.contrib import admin
from .models import Tag


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)
    ordering = [
        "-created_at",
    ]
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = ("id",)
