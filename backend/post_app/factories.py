import random
import factory
from django.contrib.auth import get_user_model
from .models import Post, Tag
from faker import Faker

from auth_app.factories import UserFactory

User = get_user_model()
fake = Faker()

users = list(User.objects.all())


class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    author = factory.SubFactory(UserFactory)
    title = " ".join(fake.sentences(nb=2))
    content = ",".join(fake.paragraphs(nb=random.randint(7, 10)))


class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tag

    name = fake.word()


# from post_app.factories import PostFactory
# from django.contrib.auth import get_user_model
# from faker import Faker
# import random
# import json

# fake = Faker()

# User = get_user_model()
# users = list(User.objects.all())

# for user in users:
#     title = " ".join(fake.sentences(nb=2))
#     paras = []
#     for _ in range(random.randint(5, 10)):
#         para = f"{fake.paragraph(nb_sentences=random.randint(5, 10))}"
#         paras.append({"type": "paragraph","content": [{"type": "text", "text": para}]})
#     content = json.dumps({"type": "doc","content": paras})
#     PostFactory.create(author=user, title=title, content=content)


# ---------------------------------------------------

# from post_app.factories import TagFactory
# TagFactory.create_batch(1000)
# from faker import Faker

# fake = Faker()

# tags = fake.words(nb=900, unique=True)

# for tag in tags:
#     TagFactory.create(name=tag.capitalize())
