from django.db import models

# Create your models here.

class Sighting(models.Model):
    image = models.CharField(max_length=200, default=None)
    number_of = models.PositiveIntegerField(default=None)
    amphibian = models.ForeignKey(
        "amphibians.Amphibian",
        related_name = "Sightings",
        on_delete = models.CASCADE
    )
    location = models.ForeignKey(
        "surveys.Survey",
        related_name = "Amphibian_Found",
        on_delete = models.CASCADE
    )
    