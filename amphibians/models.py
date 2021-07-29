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

    IUCN_CHOICES = (
    ('EX', 'Extinct'),
    ('EW', 'Extinct in the Wild'),
    ('CR', 'Critically Endangered'),
    ('EN', 'Endangered'),
    ('VU', 'Vulnerable'),
    ('NT', 'Not Threatened'),
    ('CD', 'Conservation Dependent'),
    ('LC', 'Least Concern'),
    ('DD', 'Data Deficient'),
    ('NE', 'Not Evaluated'),
    )

    common_name = models.CharField(max_length=50, default=None)
    scientific_name = models.CharField(max_length=50, default=None)
    type = models.CharField(max_length= 10, choices=TYPE_CHOICES, default='newt')
    image = models.CharField(max_length=200, default=None)
    native = models.CharField(max_length= 20, choices=NATIVE_CHOICES, default='native')
    identification = models.TextField(default=None)
    fact = models.TextField(default=None)
    distribution = models.TextField(default=None)
    life_cycle = models.TextField(default=None)
    protection = models.TextField(default=None)
    conservation_status = models.CharField(max_length= 30, choices=IUCN_CHOICES, default='DD')
    about = models.TextField(default=None)


    def __str__(self):
        return f"{self.common_name} - {self.scientific_name}"
        