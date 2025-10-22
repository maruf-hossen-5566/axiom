from urllib import request
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from utils.helpers import validate_image


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Email must be provided.")
        if not username:
            raise ValueError("Username must be provided.")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self.create_user(email, username, password, **extra_fields)


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    avatar = models.ImageField(
        upload_to="avatar/", validators=[validate_image], null=True, blank=True
    )
    email = models.EmailField("email address", unique=True)
    full_name = models.CharField("full name", max_length=99)
    location = models.CharField("location", max_length=99, blank=True)
    website = models.URLField("website url", max_length=99, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "full_name"]

    objects = UserManager()  # type: ignore

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.full_name

    def get_following_ids(self):
        return self.following.values_list("author__id", flat=True)

    def get_blocked_ids(self):
        return self.blocking.values_list("blocked__id", flat=True)

    def get_follower_count(self):
        return self.followers.count()

    def get_following_count(self):
        return self.following.count()
