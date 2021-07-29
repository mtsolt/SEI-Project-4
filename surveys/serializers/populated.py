from .common import SurveySerializer
from sightings.serializers.populated import PopulatedSightingSerializer

class PopulatedSurveySerializer(SurveySerializer):
    Amphibian_Found = PopulatedSightingSerializer(many=True)
