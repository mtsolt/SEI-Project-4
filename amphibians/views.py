from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound 
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Amphibian
from .serializers.common import AmphibianSerializer
from .serializers.populated import PopulatedAmphibianSerializer


class AmphibianListView(APIView):
    # FIGURE OUT THE PERMISSION CLASS FOR THIS - IDEALLY, ANYONE CAN VIEW, BUT ONLY ADMIN CAN ADJUST/DELETE <<<https://www.django-rest-framework.org/api-guide/permissions/#how-permissions-are-determined

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
    # FIGURE OUT THE PERMISSION CLASS FOR THIS - IDEALLY, ANYONE CAN VIEW INDIVIUAL, BUT ONLY ADMIN CAN ADJUST/DELETE <<<https://www.django-rest-framework.org/api-guide/permissions/#how-permissions-are-determined

    def get_amphibian(self, pk):
        try:
            return Amphibian.objects.get(pk=pk)
        except Amphibian.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Amphibian")

    def get(self, _request, pk):
        amphibian = self.get_amphibian(pk=pk)
        serialized_amphibian = PopulatedAmphibianSerializer(amphibian)
        return Response(serialized_amphibian.data, status=status.HTTP_200_OK)


    def delete(self, _request, pk):
        amphibian_to_delete = self.get_amphibian(pk=pk)
        amphibian_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        amphibian_to_edit = self.get_amphibian(pk=pk)
        updated_amphibian = AmphibianSerializer(amphibian_to_edit, data=request.data)
        if updated_amphibian.is_valid():
            updated_amphibian.save()
            return Response(updated_amphibian.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_amphibian.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    # def post(self, request):
    #     request.data['owner'] = request.user.id
    #     show_to_add = ShowSerializer(data=request.data)
    #     if show_to_add.is_valid():
    #         show_to_add.save()
    #         return Response(show_to_add.data, status=status.HTTP_201_CREATED)
    #     return Response(show_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)