from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound 


from .models import Survey
from .serializers.common import SurveySerializer
from .serializers.populated import PopulatedSurveySerializer

class SurveyListView(APIView):
    
    def get(self, _request):
        surveys = Survey.objects.all()
        serialized_surveys = PopulatedSurveySerializer(surveys, many=True)
        return Response(serialized_surveys.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        survey_to_add = SurveySerializer(data=request.data)
        if survey_to_add.is_valid():
            survey_to_add.save()
            return Response(survey_to_add.data, status=status.HTTP_201_CREATED)
        return Response(survey_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SurveyDetailView(APIView):
    
    def get_survey(self, pk):
        try:
            return Survey.objects.get(pk=pk)
        except Survey.DoesNotExist:
            raise NotFound(detail="🆘 Can't find that Survey")

    def get(self, _request, pk):
        survey = self.get_survey(pk=pk)
        serialized_survey = PopulatedSurveySerializer(survey)
        return Response(serialized_survey.data, status=status.HTTP_200_OK)


    def delete(self, _request, pk):
        survey_to_delete = self.get_survey(pk=pk)
        survey_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        survey_to_edit = self.get_survey(pk=pk)
        updated_survey = SurveySerializer(survey_to_edit, data=request.data)
        if updated_survey.is_valid():
            updated_survey.save()
            return Response(updated_survey.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_survey.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)