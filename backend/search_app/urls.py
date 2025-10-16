from django.urls import path
from .views import *

urlpatterns = [
    path("", search_all, name="search_all"),
    path("posts/", search_posts, name="search_posts"),
    path("users/", search_users, name="search_users"),
    path("tags/", search_tags, name="search_tags"),
]
