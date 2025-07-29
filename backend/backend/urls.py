from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/posts/", include("post_app.urls")),
    path("api/auth/", include("auth_app.urls"))
]
