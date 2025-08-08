import uuid
from django.db import models
from post_app.models import Post
from django.contrib.auth import get_user_model


User = get_user_model()


class Comment(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
