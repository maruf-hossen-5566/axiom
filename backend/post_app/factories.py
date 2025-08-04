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

    author = factory.SubFactory(UserFactory)
    title = " ".join(fake.sentences(nb=2))
    content = ",".join(fake.paragraphs(nb=random.randint(7, 10)))


# from post_app.factories import PostFactory
# from django.contrib.auth import get_user_model
# from faker import Faker
# import random
#
# fake = Faker()
#
# User = get_user_model()
# users = list(User.objects.all())
#
# for user in users:
#     title = " ".join(fake.sentences(nb=2))
#     paras = []
#     for _ in range(random.randint(5, 10)):
#         para = f"<p>{fake.paragraph(nb_sentences=random.randint(5, 10))}</p>"
#         paras.append(para)
#     content = "".join(paras)
#     PostFactory.create(author=user, title=title, content=content)
