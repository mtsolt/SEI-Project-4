from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    profile_picture = models.CharField(max_length=300, null=True, blank=True)
    verified = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.username}"
        