from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Student


class UserSerializer(serializers.ModelSerializer):
    """Read-only representation of a Django User, used in responses."""

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Handles new user sign-up, including password confirmation."""

    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8, label='Confirm password')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password2': "Passwords don't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        # create_user() takes care of securely hashing the password.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user


class LoginSerializer(serializers.Serializer):
    """Used only to document the login request body in Swagger."""

    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


class StudentSerializer(serializers.ModelSerializer):
    """Serializes Student model instances for the CRUD API."""

    class Meta:
        model = Student
        fields = [
            'id', 'name', 'email', 'phone',
            'department', 'year', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_phone(self, value):
        digits = value.replace('+', '').replace(' ', '').replace('-', '')
        if not digits.isdigit():
            raise serializers.ValidationError('Phone number must contain only digits.')
        if len(digits) < 7:
            raise serializers.ValidationError('Phone number is too short.')
        return value
