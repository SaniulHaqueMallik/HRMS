from django.urls import path
from .views import AttendanceAPIView, AttendanceDeleteAPIView

urlpatterns = [
    path("", AttendanceAPIView.as_view()),
    path("delete/<int:pk>/", AttendanceDeleteAPIView.as_view()),

]
