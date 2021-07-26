from jwt_auth.serializer import UserSerializer
from .common import SightingSerializer

class PopulatedSightingSerializer(SightingSerializer):
    owner = UserSerializer
