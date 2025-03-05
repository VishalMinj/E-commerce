from django.contrib import admin
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.

fieldsets = UserAdmin.fieldsets
fieldsets[1][1]["fields"] = (*fieldsets[1][1]["fields"], "phone_number")


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = fieldsets


admin.site.register(CustomUser, CustomUserAdmin)
