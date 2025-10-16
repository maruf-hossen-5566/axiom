import uuid
from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    logo_url = models.CharField(max_length=999, null=True, blank=True)
    slug = models.CharField(max_length=50, default="")
    name = models.CharField(max_length=25, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def generate_slug(self):
        base_slug = slugify(self.name)
        already_taken = Tag.objects.filter(slug=self.slug).exists()
        if not already_taken:
            return base_slug
        suffix = uuid.uuid4().hex[:4]
        return f"{base_slug}-{suffix}"

    def save(self, *args, **kwargs):
        self.name = self.name.title()
        self.slug = self.generate_slug()
        super().save(*args, **kwargs)
