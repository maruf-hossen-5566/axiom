from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver

User = get_user_model()
