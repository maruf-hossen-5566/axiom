from django.urls import path
from .views import *

urlpatterns = [
    path("get/", get_tags, name="get_tags"),
    path("get/<str:slug>/", get_tags, name="get_tag"),
]
