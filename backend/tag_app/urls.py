from django.urls import path
from .views import *

urlpatterns = [
    path("add/", get_tags, name="add_tag"),
    path("", get_tags, name="get_tags"),
    path("<str:slug>/", get_tags, name="get_tag"),
]
