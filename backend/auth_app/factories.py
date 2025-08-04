import factory
from django.contrib.auth import get_user_model

User = get_user_model()


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker("user_name")
    email = factory.Faker("email")
    full_name = factory.Faker("name")
    password = factory.PostGenerationMethodCall("set_password", "defaultpassword")



users = UserFactory.create_batch(10)
