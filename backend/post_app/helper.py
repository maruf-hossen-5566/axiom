from io import BytesIO
from PIL import Image
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile


def validate_image(image):
    limit_mb = 1
    if image.size > limit_mb * 1024 * 1024:
        raise ValidationError(f"Image file size should be under {limit_mb} MB.")


def optimize_image(image_field):
    img = Image.open(image_field)

    img_io = BytesIO()

    save_kwargs = {
        "optimize": True
    }

    if img.format == "JPEG":
        save_kwargs["quality"] = 85
        save_kwargs["progressive"] = True

    img.save(img_io, format=img.format, **save_kwargs)
    new_image = ContentFile(img_io.getvalue(), name=image_field.name)
    return new_image
