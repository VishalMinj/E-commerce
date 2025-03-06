from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.

fieldsets = UserAdmin.fieldsets
fieldsets[1][1]["fields"] = (*fieldsets[1][1]["fields"], "phone_number")
fieldsets[2][1]["fields"] = ("is_verified" ,* fieldsets[2][1]["fields"],)


class CustomUserAdmin(UserAdmin):
    list_display=['username','email','is_verified','is_staff']
    model = CustomUser
    fieldsets = fieldsets


admin.site.register(CustomUser, CustomUserAdmin)
