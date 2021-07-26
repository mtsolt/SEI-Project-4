from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied


from .models import Survey
from .serializers.common import SurveySerializer
from .serializers.populated import PopulatedSurveySerializer


class SurveyListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    
    def get(self, _request):
        surveys = Survey.objects.all()
        serialized_surveys = PopulatedSurveySerializer(surveys, many=True)
        return Response(serialized_surveys.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['user'] = request.user.id
        survey_to_add = SurveySerializer(data=request.data)
        if survey_to_add.is_valid():
            survey_to_add.save()
            return Response(survey_to_add.data, status=status.HTTP_201_CREATED)
        return Response(survey_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SurveyDetailView(APIView):
    # NEED TO ADD ANOTHER / DIFFERENT PERMISSION CLASS - ALLOW MORE THAN JUST THE OWNER TO EDIT IT


    def get_survey(self, pk):
        try:
            return Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Survey")

    def get(self, _request, pk):
        survey = self.get_survey(pk=pk)
        serialized_survey = PopulatedSurveySerializer(survey)
        return Response(serialized_survey.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        try:
            survey_to_delete = self.get_survey(pk=pk)
        except Survey.DoesNotExist:
            raise NotFound()
        if survey_to_delete.owner != request.user:
            raise PermissionDenied()
        survey_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        try:
            survey_to_edit = self.get_survey(pk=pk)
        except Survey.DoesNotExist:
            raise NotFound()
        updated_survey = SurveySerializer(survey_to_edit, data=request.data)
        if updated_survey.owner != request.user:
            raise PermissionDenied()
        updated_survey.save()
        return Response(updated_survey.data, status=status.HTTP_202_ACCEPTED)

    # def delete(self, request, pk):
    #     survey_to_delete = self.get_survey(pk=pk)
    #     survey_to_delete.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)

    # def put(self, request, pk):
    #     survey_to_edit = self.get_survey(pk=pk)
    #     updated_survey = SurveySerializer(survey_to_edit, data=request.data)
    #     if updated_survey.is_valid():
    #         updated_survey.save()
    #         return Response(updated_survey.data, status=status.HTTP_202_ACCEPTED)
    #     return Response(updated_survey.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
    