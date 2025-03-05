from rest_framework.response import Response
from rest_framework.decorators import api_view
from drf_spectacular.utils import extend_schema
from .serializers import UserSignUpSerializer
from rest_framework import status


@extend_schema(
    tags=["Authentication"],
    request=UserSignUpSerializer,
    responses={201: UserSignUpSerializer},
    parameters=[],
)
@api_view(["POST"])
def signup(request):
    """
    Signup view for user creation
    """
    serializer = UserSignUpSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(tags=["Authentication"])
@api_view(["POST"])
def login(request):
    """
    Login view for user creation
    """
    ...
