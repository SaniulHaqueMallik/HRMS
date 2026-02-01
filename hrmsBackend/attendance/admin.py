from django.contrib import admin

# Register your models here.
from attendance.models import Attendance

class AttandanceAdmin(admin.ModelAdmin):
    list_display = ("employee_id", "date", "status", )

    def get_queryset(self, request):
        return Attendance.objects.prefetch_related("employee")

admin.site.register(Attendance, AttandanceAdmin)