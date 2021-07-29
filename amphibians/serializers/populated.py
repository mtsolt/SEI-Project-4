from .common import AmphibianSerializer
from sightings.serializers.common import SightingSerializer

class PopulatedAmphibianSerializer(AmphibianSerializer):
    Sightings = SightingSerializer(many=True)
