from django.db import models

# Create your models here.

class Amphibian(models.Model):
    TYPE_CHOICES = (
    ('newt', 'Newt'),
    ('toad', 'Toad'),
    ('frog', 'Frog'),
    )

    NATIVE_CHOICES = (
      ('native', 'Native'),
      ('non-native', 'Non-Native'),
    )

    common_name = models.CharField(max_length=50, default=None)
    scientific_name = models.CharField(max_length=50, default=None)
    type = models.CharField(max_length= 10, choices=TYPE_CHOICES, default='newt')
    image = models.CharField(max_length=50, default=None)
    native = models.CharField(max_length= 20, choices=NATIVE_CHOICES, default='native')


    def __str__(self):
        return f"{self.common_name} - {self.scientific_name}"