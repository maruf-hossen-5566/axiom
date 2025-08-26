from .views import *
from django.urls import path

urlpatterns = [
    path("", get, name="get_comments"),
    path("add/", add, name="add_comment"),
    path("delete/", delete, name="delete_comment"),
    path("like/", like, name="like_comment"),
]
