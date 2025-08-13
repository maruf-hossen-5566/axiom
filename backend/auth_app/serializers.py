from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="Username already taken."
            )
        ],
        error_messages={
            "blank": "Username cannot be blank.",
        },
    )
    email = serializers.EmailField(
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="This email is already registered."
            )
        ],
        error_messages={
            "blank": "Email cannot be blank.",
            "invalid": "Enter a valid email address.",
        },
    )
    full_name = serializers.CharField(
        max_length=99, error_messages={"blank": "Fullname cannot be blank."}
    )
    password = serializers.CharField(
        write_only=True,
        error_messages={
            "blank": "Password cannot be blank.",
        },
    )

    class Meta:
        model = User
        fields = ("full_name", "username", "email", "password")

    def validate_password(self, value):
        validate_password(value, user=self.instance)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            full_name=validated_data["full_name"],
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    follower_count = serializers.SerializerMethodField(method_name="get_follower_count")
    following_count = serializers.SerializerMethodField(
        method_name="get_following_count"
    )

    class Meta:
        model = User
        exclude = [
            "password",
            "groups",
            "user_permissions",
            "is_staff",
            "is_superuser",
            "first_name",
            "last_name",
        ]

    def get_follower_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()
