from rest_framework import serializers
from ..models import Amphibian

class AmphibianSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Amphibian
    fields = '__all__'