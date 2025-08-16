import uuid
from django.core.exceptions import ValidationError


def get_first_error(error):
    first_field = next(iter(error))
    first_error = error[first_field][0]
    return first_error


def validate_image(image):
    limit_mb = 1
    if image.size > limit_mb * 1024 * 1024:
        raise ValidationError(f"Image file size should be under {limit_mb} MB.")


def validate_uuid(id):
    try:
        uuid_obj = uuid.UUID(id)
    except ValueError:
        return False

    return str(uuid_obj) == id
