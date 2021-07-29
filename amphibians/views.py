from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied
from .models import Amphibian
from .serializers.common import AmphibianSerializer
from .serializers.populated import PopulatedAmphibianSerializer


class AmphibianListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        amphibians = Amphibian.objects.all()
        serialized_amphibians = PopulatedAmphibianSerializer(amphibians, many=True)
        return Response(serialized_amphibians.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        amphibian_to_add = AmphibianSerializer(data=request.data)
        if amphibian_to_add.is_valid():
            amphibian_to_add.save()
            return Response(amphibian_to_add.data, status=status.HTTP_201_CREATED)
        return Response(amphibian_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class AmphibianDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_amphibian(self, pk):
        try:
            return Amphibian.objects.get(pk=pk)
        except Amphibian.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Amphibian")

    def get(self, _request, pk):
        amphibian = self.get_amphibian(pk=pk)
        serialized_amphibian = PopulatedAmphibianSerializer(amphibian)
        return Response(serialized_amphibian.data, status=status.HTTP_200_OK)


    def delete(self, request, pk):
        try:
            amphibian_to_delete = self.get_amphibian(pk=pk)
        except Amphibian.DoesNotExist:
            raise NotFound()
        if amphibian_to_delete.owner != request.user:
            raise PermissionDenied()
        amphibian_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            amphibian_to_edit = self.get_amphibian(pk=pk)
        except Amphibian.DoesNotExist:
            raise NotFound()
        updated_amphibian = AmphibianSerializer(amphibian_to_edit, data=request.data)
        if updated_amphibian.owner != request.user:
            raise PermissionDenied()
        updated_amphibian.save()
        return Response(updated_amphibian.data, status=status.HTTP_202_ACCEPTED)
        # return Response(updated_amphibian.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
