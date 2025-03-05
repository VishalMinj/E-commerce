from django.urls import path
from . import views

urlpatterns = [
    path('login/',views.login,name='login-endpoint'),
    path('signup/',views.signup,name='signup-endpoint'),
]
