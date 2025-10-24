from django.db.models.signals import post_save
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from comment_app.models import Comment
from .models import Notification
from post_app.models import Like

User = get_user_model()


@receiver(post_save, sender=Like)
def create_notification_for_like(sender, instance, created, *args, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.post.author,
            actor=instance.user,
            post=instance.post,
        )


@receiver(post_save, sender=Comment)
def create_notification_for_comment(sender, instance, created, *args, **kwargs):
    if created:
        n = Notification(
            user=instance.post.author,
            actor=instance.author,
            post=instance.post,
            content=instance.content,
            reference=instance.id,
            type="comment"
        )

        if instance.parent:
            n.user = instance.parent.author
            n.actor = instance.author
            n.type = "reply"

        if instance.to:
            n.user = instance.to
            n.actor = instance.author

        n.save()
