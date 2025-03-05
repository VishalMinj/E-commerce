from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import CustomUserManager


class CustomUser(AbstractUser):
    """
    Custom user class for addional fields in the user model
    """

    objects = CustomUserManager()
    phone_number = models.CharField(
        verbose_name="Phone Number", max_length=10, null=True, blank=True
    )

    # email = models.EmailField(unique=True,blank=False,null=False)
    def __str__(self):
        return f"{self.username}"
