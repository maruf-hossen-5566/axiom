from .views import *
from django.urls import path

urlpatterns = [
    # Thumbnail
    path("add/thumbnail/", add_thumbnail, name="add_thumbnail"),
    path("delete/thumbnail/", delete_thumbnail, name="delete_thumbnail"),
    path("delete/", delete, name="delete_post"),
    # Like
    path("like/", like, name="like_post"),
    # Post
    path("more-from-author/", more_from_author, name="more_from_author"),
    path("more-to-read/", more_to_read, name="more_to_read"),
    path("", get, name="get_posts"),
    path("add/", add, name="add_post"),
    path("<str:author_name>/<str:slug>/", get, name="get_post"),
]
