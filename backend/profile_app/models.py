import uuid
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Follow(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    created_at = models.DateTimeField(auto_now_add=True)


class Block(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    blocker = models.ForeignKey(User, related_name="blocking", on_delete=models.CASCADE)
    blocked = models.ForeignKey(
        User, related_name="blocked_by", on_delete=models.CASCADE
    )
    blocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("blocker", "blocked")

    def __str__(self):
        return f"{self.blocker} blocked {self.blocked}"
