from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied


from .models import Sighting
from .serializers.common import SightingSerializer


class SightingListView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly, )    

    def get(self, _request):
        sightings = Sighting.objects.all()
        serialized_sightings = SightingSerializer(sightings, many=True)
        return Response(serialized_sightings.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        sighting_to_add = SightingSerializer(data=request.data)
        if sighting_to_add.is_valid():
            sighting_to_add.save()
            return Response(sighting_to_add.data, status=status.HTTP_201_CREATED)
        return Response(sighting_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SightingDetailView(APIView):
    
    # NEED TO ADD ANOTHER / DIFFERENT PERMISSION CLASS - ALLOW MORE THAN JUST THE OWNER TO EDIT IT
    
    def get_sighting(self, pk):
        try:
            return Sighting.objects.get(pk=pk)
        except Sighting.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that sighting")

    def get(self, _request, pk):
        sighting = self.get_sighting(pk=pk)
        serialized_sighting = SightingSerializer(sighting)
        return Response(serialized_sighting.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            sighting_to_delete = self.get_sighting(pk=pk)
        except Sighting.DoesNotExist:
            raise NotFound()
        if sighting_to_delete.owner != request.user:
            raise PermissionDenied()
        sighting_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            sighting_to_edit = self.get_sighting(pk=pk)
        except Sighting.DoesNotExist:
            raise NotFound()
        updated_sighting = SightingSerializer(sighting_to_edit, data=request.data)
        if updated_sighting.owner != request.user:
            raise PermissionDenied()
        updated_sighting.save()
        return Response(updated_sighting.data, status=status.HTTP_202_ACCEPTED)
        # return Response(updated_sighting.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
