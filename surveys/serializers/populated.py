from .common import SurveySerializer
from sightings.serializers.populated import PopulatedSightingSerializer
# from counties.serializers.common import CountySerializer


class PopulatedSurveySerializer(SurveySerializer):
    Amphibian_Found = PopulatedSightingSerializer(many=True)
    # county = CountySerializer(many=True)
    