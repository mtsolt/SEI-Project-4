from django.db import models

# Create your models here.

class Sighting(models.Model):
    image = models.CharField(max_length=200, default=None)
    image2 = models.CharField(max_length=200, default=None, null=True, blank=True)
    image3 = models.CharField(max_length=200, default=None, null=True, blank=True)
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

    def  __str__(self):
        return f"Sighting: {self.number_of} {self.amphibian}"
        