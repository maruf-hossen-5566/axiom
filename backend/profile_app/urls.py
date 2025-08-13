from django.urls import path
from .views import *

urlpatterns = [
    path("follow/", follow, name="follow"),
    path("get_profile/", get_profile, name="get_profile"),
]
