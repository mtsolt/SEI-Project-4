from django.urls import path
from .views import AmphibianListView, AmphibianDetailView

urlpatterns = [
    path('', AmphibianListView.as_view()),
    path('<int:pk>/', AmphibianDetailView.as_view())
]
