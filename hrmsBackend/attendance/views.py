from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status

from .models import Attendance
from employees.models import Employee


class AttendanceAPIView(APIView):

    def __init__(self):
        self.employee_id = None
        self.date = None
        self.attendance_status = None
        self.body = None


    def get(self, request):
        self.request = request
        self.parse_input()
        return self.make_context()

    def parse_input(self):
        self.employee_id = self.request.GET.get("employee_id")
        print(self.employee_id)
    def make_context(self):
        try:
            qs = Attendance.objects.filter(
                employee__id=self.employee_id
            ).select_related("employee")

            data = [
                {
                    "id": att.id,
                    "employee_id": att.employee.id,
                    "employee_name": att.employee.full_name,
                    "date": att.date,
                    "status": att.status,
                }
                for att in qs
            ]

            return JsonResponse(
                {"status": 0, "data": data},
                status=status.HTTP_200_OK,
                safe=False
            )

        except Exception as e:
            return JsonResponse(
                {"status": 2, "error_msg": f"Something went wrong: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        self.body = request.data
        self.parse_post_input()
        return self.create_attendance()

    def parse_post_input(self):
        self.employee_id = self.body.get("employee_id")
        self.date = self.body.get("date")
        self.attendance_status = self.body.get("status")

    def create_attendance(self):
        # Required fields check
        if not all([self.employee_id, self.date, self.attendance_status]):
            return JsonResponse(
                {
                    "status": 1,
                    "error": "employee_id, date and status are required"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate employee
        try:
            employee = Employee.objects.get(id=self.employee_id)
        except Employee.DoesNotExist:
            return JsonResponse(
                {"status": 1, "error": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent duplicate attendance
        if Attendance.objects.filter(
            employee=employee,
            date=self.date
        ).exists():
            return JsonResponse(
                {
                    "status": 1,
                    "error": "Attendance already marked for this date"
                },
                status=status.HTTP_409_CONFLICT
            )

        attendance = Attendance.objects.create(
            employee=employee,
            date=self.date,
            status=self.attendance_status
        )

        return JsonResponse(
            {
                "status": 0,
                "message": "Attendance marked successfully",
                "id": attendance.id
            },
            status=status.HTTP_201_CREATED
        )


class AttendanceDeleteAPIView(APIView):
    """
    DELETE -> delete attendance by id
    """

    def delete(self, request, pk):
        try:
            attendance = Attendance.objects.get(pk=pk)
            attendance.delete()

            return JsonResponse(
                {"status": 0, "message": "Attendance deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )

        except Attendance.DoesNotExist:
            return JsonResponse(
                {"status": 1, "error": "Attendance not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return JsonResponse(
                {"status": 2, "error_msg": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )