from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.LoginView, name="login-endpoint"),
    path("signup/", views.SignupView, name="signup-endpoint"),
    path("verify-email/", views.VerifyEmailView, name="verify-email-endpoint"),
]
