from django.urls import path
from .views import EmployeeAPIView, EmployeeDeleteAPIView

urlpatterns = [
    path("", EmployeeAPIView.as_view()),
    path("delete/<int:pk>/", EmployeeDeleteAPIView.as_view()),
]
