from .views import *
from django.urls import path

urlpatterns = [
    path("add/", add, name="add_post"),
    path("add/thumbnail/", add_thumbnail, name="add_thumbnail"),
    path("delete/thumbnail/", delete_thumbnail, name="delete_thumbnail"),
    path("delete/<uuid:pk>/", delete, name="delete_post"),
    path("", get, name="get_posts"),
    path("<str:author_name>/<str:slug>/", get, name="get_post"),
]
