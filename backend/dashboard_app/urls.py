from django.urls import path

from .views import *

urlpatterns = [
    path("posts/", get_posts, name="get_posts"),
]

