from .common import SurveySerializer
from sightings.serializers.common import SightingSerializer

class PopulatedSurveySerializer(SurveySerializer):
    Amphibian_Found = SightingSerializer(many=True)