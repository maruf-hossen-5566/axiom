from django.urls import path
from .views import *

urlpatterns = [
    path("all/", get_all, name="get_notifications"),
    path("like/", get_all, name="get_notifications"),
    path("comment/", get_all, name="get_notifications"),
    path("delete/", delete, name="delete_notifications"),
]
