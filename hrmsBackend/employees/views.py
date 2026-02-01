from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework import status
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from .models import Employee


class EmployeeAPIView(APIView):

    def __init__(self):
        self.body = None

    def get(self, request):
        return self.make_context()

    def post(self, request):
        self.body = request.data
        return self.create_employee()

    def make_context(self):
        try:
            employees = Employee.objects.all()

            data = [
                {
                    "id": emp.id,
                    "employee_id": emp.employee_id,
                    "full_name": emp.full_name,
                    "email": emp.email,
                    "department": emp.department,
                    "created_at": emp.created_at,
                }
                for emp in employees
            ]

            return JsonResponse(
                {"status": 0, "data": data},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return JsonResponse(
                {"status": 2, "error_msg": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create_employee(self):
        required_fields = ["employee_id", "full_name", "email", "department"]

        for field in required_fields:
            if not self.body.get(field):
                return JsonResponse(
                    {"status": 1, "error": f"{field} is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        try:
            validate_email(self.body["email"])
        except ValidationError:
            return JsonResponse(
                {"status": 1, "error": "Invalid email format"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if Employee.objects.filter(employee_id=self.body["employee_id"]).exists():
            return JsonResponse(
                {"status": 1, "error": "Employee ID already exists"},
                status=status.HTTP_409_CONFLICT
            )

        if Employee.objects.filter(email=self.body["email"]).exists():
            return JsonResponse(
                {"status": 1, "error": "Email already exists"},
                status=status.HTTP_409_CONFLICT
            )

        employee = Employee.objects.create(
            employee_id=self.body["employee_id"],
            full_name=self.body["full_name"],
            email=self.body["email"],
            department=self.body["department"],
        )

        return JsonResponse(
            {
                "status": 0,
                "message": "Employee created successfully",
                "id": employee.id,
            },
            status=status.HTTP_201_CREATED
        )


class EmployeeDeleteAPIView(APIView):

    def delete(self, request, pk):
        try:
            employee = Employee.objects.get(pk=pk)
            employee.delete()

            return JsonResponse(
                {"status": 0, "message": "Employee deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )

        except Employee.DoesNotExist:
            return JsonResponse(
                {"status": 1, "error": "Employee not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return JsonResponse(
                {"status": 2, "error_msg": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
