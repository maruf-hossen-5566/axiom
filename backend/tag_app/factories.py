import uuid
from django.utils.text import slugify
import factory
from .models import Tag
from faker import Faker


fake = Faker()


class TagFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Tag

    name = fake.word()

    @factory.lazy_attribute
    def slug(self):
        base_slug = slugify(self.name)
        suffix = uuid.uuid4().hex[:8]
        slug = f"{base_slug}-{suffix}"
        return slug


# ---------------------------------------------------------------------------


# from tag_app.factories import TagFactory
# TagFactory.create_batch(900)
# from faker import Faker

# fake = Faker()

# tags = fake.words(nb=900, unique=True)

# for tag in tags:
#     TagFactory.create(name=tag.capitalize())
