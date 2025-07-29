import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


class Post(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=399)
    slug = models.SlugField(max_length=999, unique=True)
    content = models.TextField()

    def generate_slug(self):
        base_slug = slugify(self.title)
        suffix = uuid.uuid4().hex[:8]
        self.slug = f"{base_slug}-{suffix}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.generate_slug()
        super().save(*args, **kwargs)
