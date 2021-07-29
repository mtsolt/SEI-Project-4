from django.db import models
# Create your models here

class Survey(models.Model):
    HABITAT_CHOICES=(
    ('1', 'Natural Pond'),
    ('2', 'Man-Made Pond'),
    ('3', 'Natural Stream'),
    ('4', 'Marsh'),
    ('5', 'River'),
    )

    LAND_CHOICES=(
    ('1', 'Woodland'),
    ('2', 'Open Field'),
    ('3', 'Garden'),
    ('4', 'Urban'),
    )

    COUNTY_CHOICES=(
    ('1', 'Avon'),
    ('2', 'Bedfordshire'),
    ('3', 'Berkshire'),
    ('4', 'Buckinghamshire'),
    ('5', 'Cambridgeshire'),
    ('che', 'Cheshire'),
    ('cle', 'Cleveland'),
    ('cor', 'Cornwall'),
    ('cd', 'County Durham'),
    ('cum', 'Cumbria'),
    ('der', 'Derbyshire'),
    ('dev', 'Devon'),
    ('dor', 'Dorset'),
    ('es', 'East Sussex'),
    ('esx', 'Essex'),
    ('glo', 'Gloucestershire'),
    ('ham', 'Hampshire'),
    ('here', 'Herefordshire'),
    ('hert', 'Hertfordshire'),
    ('iow', 'Isle of Wight'),
    ('ken', 'Kent'),
    ('lan', 'Lancashire'),
    ('lei', 'Leicestershire'),
    ('lin', 'Lincolnshire'),
    ('lon', 'London'),
    ('mer', 'Merseyside'),
    ('mid', 'Middlesex'),
    ('norf', 'Norfolk'),
    ('nh', 'North Humberside'),
    ('ny', 'North Yorkshire'),
    ('northam', 'Northamptonshire'),
    ('northum', 'Northumberland'),
    ('not', 'Nottinghamshire'),
    ('oxf', 'Oxfordshire'),
    ('shr', 'Shropshire'),
    ('som', 'Somerset'),
    ('sh', 'South Humberside'),
    ('sy', 'South Yorkshire'),
    ('sta', 'Staffordshire'),
    ('suf', 'Suffolk'),
    ('sur', 'Surrey'),
    ('tw', 'Tyne and Wear'),
    ('war', 'Warwickshire'),
    ('wm', 'West Midlands'),
    ('ws', 'West Sussex'),
    ('wy', 'West Yorkshire'),
    ('wil', 'Wiltshire'),
    ('wor', 'Worcestershire'),
    ('clw', 'Clwyd'),
    ('dyf', 'Dyfed'),
    ('gwe', 'Gwent'),
    ('gwy', 'Gwynedd'),
    ('mg', 'Mid Glamorgan'),
    ('sg', 'South Glamorgan'),
    ('wg', 'West Glamorgan'),
    ('pow', 'Powys'),
    ('abe', 'Aberdeenshire'),
    ('ang', 'Angus'),
    ('arg', 'Argyll'),
    ('ayr', 'Ayrshire'),
    ('banf', 'Banffshire'),
    ('ber', 'Berwickshire'),
    ('but', 'Buteshire'),
    ('cai', 'Caithness'),
    ('cla', 'Clackmannanshire'),
    ('dum', 'Dumfriesshire'),
    ('dun', 'Dunbartonshire'),
    ('el', 'East Lothian'),
    ('fif', 'Fife'),
    ('inv', 'Inverness-shire'),
    ('kinc', 'Kincardineshire'),
    ('kinr', 'Kinross-shire'),
    ('kir', 'Kirkcudbrightshire'),
    ('lan', 'Lanarkshire'),
    ('mid', 'Midlothian'),
    ('mor', 'Moray'),
    ('nai', 'Nairnshire'),
    ('ork', 'Orkney'),
    ('pee', 'Peebleshire'),
    ('per', 'Perthshire'),
    ('ren', 'Renfrewshire'),
    ('rc', 'Ross and Cromarty'),
    ('rox', 'Roxburghshire'),
    ('sel', 'Selkirkshire'),
    ('she', 'Shetland'),
    ('tir', 'tirlingshire'),
    ('sut', 'Sutherland'),
    ('wl', 'West Lothian'),
    ('wig', 'Wigtownshire'),
    ('none', 'None')
    )

    text = models.TextField(max_length=300)
    spotted_on = models.DateTimeField()
    location_x = models.CharField(max_length=15, null=True, blank=True)
    location_y = models.CharField(max_length=15, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    water_habitat = models.CharField(max_length= 15, choices=HABITAT_CHOICES, default='natpond')
    land_habitat = models.CharField(max_length= 15, choices=LAND_CHOICES, default='wood')
    county = models.CharField(max_length= 30, choices=COUNTY_CHOICES, default='none')
    user = models.ForeignKey(
        "jwt_auth.User",
        related_name = "Surveys_Submitted",
        on_delete = models.PROTECT
    )

    def  __str__(self):
        return f"Survey in {self.county} by {self.user} at {self.spotted_on}"
