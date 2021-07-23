from django.urls import path
from .views import SurveyListView, SurveyDetailView

urlpatterns = [
    path('', SurveyListView.as_view()),
    path('<int:pk>/', SurveyDetailView.as_view())
]
