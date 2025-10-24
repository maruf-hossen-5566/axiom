import uuid
from django.db import models
from post_app.models import Post
from django.contrib.auth import get_user_model

User = get_user_model()


class Notification(models.Model):
    TYPE_CHOICES = [
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('reply', 'Reply')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="notifications")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notification_for", null=True)
    actor = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notification_by", null=True)
    type = models.CharField(max_length=7, choices=TYPE_CHOICES, default="like")
    content = models.TextField(blank=True)
    reference = models.UUIDField(blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
