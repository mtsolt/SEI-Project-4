from django.db import models
# Create your models here

class Survey(models.Model):
    HABITAT_CHOICES=(
    ('natpond', 'Natural Pond'),
    ('manpond', 'Man-Made Pond'),
    ('natstrean', 'Natural Stream'),
    ('marsh', 'Marsh'),
    ('river', 'River'),
    )

    LAND_CHOICES=(
    ('wood', 'Woodland'),
    ('field', 'Open Field'),
    ('garden', 'Garden'),
    ('urban', 'Urban'),
    )

    text = models.TextField(max_length=300)
    spotted_on = models.DateTimeField()
    location_x = models.CharField(max_length=15)
    location_y = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    water_habitat = models.CharField(max_length= 15, choices=HABITAT_CHOICES, default='natpond')
    land_habitat = models.CharField(max_length= 15, choices=LAND_CHOICES, default='wood')
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name = "Surveys_Submitted",
        on_delete = models.PROTECT
    )
