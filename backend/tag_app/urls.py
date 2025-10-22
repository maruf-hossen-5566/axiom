from django.urls import path
from .views import *

urlpatterns = [
    path("add/", get_tags, name="add_tag"),
    path("", get_tags, name="get_tags"),
    path("submit/", get_tags_for_post_submit, name="get_tags_for_post_submit"),
    path("<str:slug>/", get_tag, name="get_tag"),
]
