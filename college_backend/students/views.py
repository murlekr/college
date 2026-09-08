from django.contrib.auth.models import User
from drf_spectacular.utils import OpenApiExample, extend_schema
from rest_framework import generics, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Student
from .serializers import (
    LoginSerializer,
    StudentSerializer,
    UserRegistrationSerializer,
    UserSerializer,
)


# ------------------------------------------------------------------
# Authentication views
# ------------------------------------------------------------------

@extend_schema(
    tags=['Authentication'],
    summary='Register a new user',
    description='Creates a new user account. Passwords are securely hashed before being stored.',
    request=UserRegistrationSerializer,
    examples=[
        OpenApiExample(
            'Register example',
            value={
                'username': 'student1',
                'email': 'student1@gmail.com',
                'password': 'password123',
                'password2': 'password123',
            },
            request_only=True,
        ),
    ],
    responses={201: UserRegistrationSerializer},
)
class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register/ - open to everyone (no login required)."""

    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                'message': 'User registered successfully',
                'user': UserSerializer(user).data,
            },
            status=status.HTTP_201_CREATED,
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Extends the default SimpleJWT serializer to also return user info."""

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data


@extend_schema(
    tags=['Authentication'],
    summary='Log in and obtain JWT tokens',
    description=(
        'Authenticates a user with username and password, and returns an '
        'access token, a refresh token, and the user profile.'
    ),
    request=LoginSerializer,
    examples=[
        OpenApiExample(
            'Login example',
            value={'username': 'student1', 'password': 'password123'},
            request_only=True,
        ),
    ],
)
class LoginView(TokenObtainPairView):
    """POST /api/auth/login/ - open to everyone (no login required)."""

    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


@extend_schema(
    tags=['Authentication'],
    summary='Get the currently logged-in user',
    description='Requires a valid JWT access token in the Authorization header.',
    responses={200: UserSerializer},
)
class MeView(APIView):
    """GET /api/auth/me/ - requires authentication."""

    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


# ------------------------------------------------------------------
# Student CRUD
# ------------------------------------------------------------------

@extend_schema(tags=['Students'])
class StudentViewSet(viewsets.ModelViewSet):
    """
    Provides full CRUD for students:

    GET    /api/students/       - list all students
    POST   /api/students/       - create a new student
    GET    /api/students/{id}/  - retrieve one student
    PUT    /api/students/{id}/  - full update
    PATCH  /api/students/{id}/  - partial update
    DELETE /api/students/{id}/  - delete

    All endpoints require a valid JWT access token.
    """

    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]
