from django.urls import path

from .views import *

urlpatterns = [
    path("signup/", signup, name="register_user"),
    path("login/", login, name="login_user"),
    path("get/", get, name="get_users"),
    path("get/<uuid:pk>/", get, name="get_user"),
    path("delete/<uuid:pk>/", delete, name="delete_user"),
]
