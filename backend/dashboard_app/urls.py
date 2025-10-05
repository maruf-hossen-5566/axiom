from django.urls import path

from .views import *

urlpatterns = [
    path("posts/", get_posts, name="get_posts"),
    path("bookmarks/", get_bookmarks, name="get_bookmarks"),
    path("followers/", get_followers, name="get_followers"),
    path("following/", get_following, name="get_following"),
]
