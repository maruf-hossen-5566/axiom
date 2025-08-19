import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils import timezone
from utils.helpers import validate_image
from .helper import optimize_image

User = get_user_model()


class Post(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=399)
    thumbnail = models.OneToOneField(
        "Thumbnail", on_delete=models.CASCADE, blank=True, null=True
    )
    slug = models.SlugField(max_length=999, unique=True)
    content = models.TextField()
    tags = models.ManyToManyField("Tag", related_name="tags", blank=True, null=True)
    published_at = models.DateTimeField(default=timezone.now)

    def generate_slug(self):
        base_slug = slugify(self.title)
        suffix = uuid.uuid4().hex[:8]
        self.slug = f"{base_slug}-{suffix}"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.generate_slug()
        super().save(*args, **kwargs)

    def get_like_count(self):
        count = self.likes.count()
        return count

    def get_comment_count(self):
        count = self.comments.count()
        return count


class Thumbnail(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="thumbnails"
    )
    image = models.ImageField(upload_to="thumbnails/", validators=[validate_image])
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if self.image:
            self.image = optimize_image(self.image)
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.image:
            self.image.delete(save=False)
        super().delete(*args, **kwargs)


class Like(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    created_at = models.DateTimeField(auto_now_add=True)


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=299, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
