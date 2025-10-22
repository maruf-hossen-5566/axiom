import uuid
from django.db import models
from post_app.models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


class Notification(models.Model):
    TYPE_CHOICES = [
        ('L', 'Like'),
        ('C', 'Comment'),
        ('R', 'Reply')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="notifications")
    by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notification_by")
    n_for = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notification_for")
    content = models.TextField(default="", max_length=999)
    type = models.CharField(max_length=1, choices=TYPE_CHOICES, default="L")
    created_at = models.DateTimeField(auto_now_add=True)
