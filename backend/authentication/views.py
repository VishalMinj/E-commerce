from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from django.urls import reverse
from rest_framework.decorators import api_view, renderer_classes
from drf_spectacular.utils import extend_schema, OpenApiParameter
from .serializers import UserSignUpSerializer, UserLoginSerializer
from .utils import (
    verify_token,
    generate_verification_token,
    send_mail,
    get_tokens_for_user,
)


@extend_schema(
    tags=["Authentication"],
    request=UserSignUpSerializer,
    responses={201: UserSignUpSerializer},
)
@api_view(["POST"])
def SignupView(request):
    """
    Signup view for user creation
    Saving the user and sending the verification email
    """
    serializer = UserSignUpSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Sending the verification email
        token = generate_verification_token(user)
        verification_url = f"{request.scheme}://{request.get_host()}{reverse('verify-email-endpoint')}?token={token}"
        subject = "Verify Your Email"
        template_name = "email_verification.html"
        message = f"Click the link to verify your email: {verification_url}"
        send_mail(subject, message, user.email, verification_url, template_name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=["Authentication"],
    request=UserLoginSerializer,
    responses={201: UserLoginSerializer},
)
@api_view(["POST"])
def LoginView(request):
    """
    Login view for user creation
    """
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.instance
        tokens = get_tokens_for_user(user)
        data = UserLoginSerializer(user).data
        response = Response(
            data,
            status=status.HTTP_200_OK,
        )
        response.set_cookie("access", tokens["access"], httponly=True)
        response.set_cookie("refresh", tokens["refresh"], httponly=True)
        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    tags=["Authentication"],
    responses={
        200: {
            "description": "Email successfully verified!",
            "example": {"message": "Email successfully verified!"},
        },
        400: {
            "description": "Invalid or expired token.",
            "example": {"error": "Invalid or expired token."},
        },
    },
    parameters=[
        OpenApiParameter(
            name="token",
            description="The email verification token received in the email",
            required=True,
            type=str,
            location=OpenApiParameter.QUERY,
        )
    ],
)
@api_view(["GET"])
@renderer_classes([TemplateHTMLRenderer, JSONRenderer])
def VerifyEmailView(request):
    """
    Verify email view, to verify the email of the user
    """
    token = request.query_params.get("token")
    user = verify_token(token)
    if user:
        user.is_verified = True
        user.save()
        data = {"message": "Email successfully verified!"}
        if request.accepted_renderer.format == "html":
            return Response(
                data,
                template_name="verification_response.html",
            )
        return Response(data, status=status.HTTP_200_OK)
    if request.accepted_renderer.format == "html":
        return Response(
            {"error": "Invalid or expired token."},
            template_name="verification_response.html",
        )
    return Response(
        {"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST
    )
