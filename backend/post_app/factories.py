import random
import factory
from django.contrib.auth import get_user_model
from .models import Post
from faker import Faker

from auth_app.factories import UserFactory

User = get_user_model()
fake = Faker()

users = list(User.objects.all())


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    author = factory.SubFactory(UserFactory)  # type: ignore
    title = " ".join(fake.sentences(nb=2))
    content = ",".join(fake.paragraphs(nb=random.randint(7, 10)))

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            return  # do nothing if not creating instance

        if extracted:
            # if tags are passed in, add them
            for tag in extracted:
                self.tags.add(tag)


# from post_app.factories import PostFactory
# from django.contrib.auth import get_user_model
# from tag_app.models import Tag
# from faker import Faker
# import random
# import json

# fake = Faker()

# User = get_user_model()
# users = list(User.objects.all())
# tag_q = list(Tag.objects.all())

# for user in users:
#     title = " ".join(fake.sentences(nb=2))
#     paras = []
#     for _ in range(random.randint(5, 10)):
#         para = f"{fake.paragraph(nb_sentences=random.randint(5, 10))}"
#         paras.append({"type": "paragraph","content": [{"type": "text", "text": para}]})
#     content = json.dumps({"type": "doc","content": paras})
#     tags = [random.choice(tag_q) for _ in range(random.randint(2,4))]
#     PostFactory.create(author=user, title=title, content=content, tags=tags)


# from django.db.models import Q
# from post_app.models import Post

# posts = Post.objects.filter(~Q(author__username__icontains="maruf"))
# posts.delete()
