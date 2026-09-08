"""
Django settings for the college_backend project.

This file configures:
- MySQL database (credentials loaded from .env, never hardcoded)
- Django REST Framework with JWT authentication
- drf-spectacular for Swagger / ReDoc documentation
- django-cors-headers for React Native / mobile development
"""

from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from the .env file at the project root.
load_dotenv(BASE_DIR / '.env')


# ------------------------------------------------------------------
# Core settings
# ------------------------------------------------------------------

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-change-this-key')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'True') == 'True'

# For a beginner/local project this is left open. For production,
# replace with your actual domain(s)/IP(s), e.g. ['api.example.com'].
ALLOWED_HOSTS = ['*']


# ------------------------------------------------------------------
# Application definition
# ------------------------------------------------------------------

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',

    # Local apps
    'students',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    # CorsMiddleware must be placed as high as possible, and before
    # CommonMiddleware, so that CORS headers are added to every response.
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'


# ------------------------------------------------------------------
# Database (MySQL)
# ------------------------------------------------------------------
# All credentials come from environment variables (.env file).
# Never hardcode database credentials here.

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME', 'college_db'),
        'USER': os.getenv('DB_USER', 'root'),
        'PASSWORD': os.getenv('DB_PASSWORD', ''),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '3306'),
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}


# ------------------------------------------------------------------
# Password validation
# ------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ------------------------------------------------------------------
# Internationalization
# ------------------------------------------------------------------

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ------------------------------------------------------------------
# Static files
# ------------------------------------------------------------------

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ------------------------------------------------------------------
# Django REST Framework
# ------------------------------------------------------------------

REST_FRAMEWORK = {
    # JWT authentication is used everywhere by default.
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    # Every endpoint requires authentication unless explicitly
    # marked with AllowAny (e.g. register, login).
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    # Pagination is kept OFF so beginners get a plain JSON list back.
    'DEFAULT_PAGINATION_CLASS': None,
}


# ------------------------------------------------------------------
# Simple JWT
# ------------------------------------------------------------------

SIMPLE_JWT = {
    # Short-lived access token: safer, used on every request.
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    # Longer-lived refresh token: used to get a new access token
    # without asking the user to log in again.
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}


# ------------------------------------------------------------------
# drf-spectacular (Swagger / ReDoc)
# ------------------------------------------------------------------

SPECTACULAR_SETTINGS = {
    'TITLE': 'College CRUD API',
    'DESCRIPTION': (
        'A simple JWT-authenticated REST API for managing college students. '
        'Built with Django REST Framework for a React Native + TypeScript mobile app.'
    ),
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # Adds the "Authorize" button in Swagger UI with a Bearer token field.
    'SECURITY': [{'bearerAuth': []}],
    'COMPONENT_SPLIT_REQUEST': True,
    'SWAGGER_UI_SETTINGS': {
        'persistAuthorization': True,
    },
    'APPEND_COMPONENTS': {
        'securitySchemes': {
            'bearerAuth': {
                'type': 'http',
                'scheme': 'bearer',
                'bearerFormat': 'JWT',
                'description': (
                    'Enter your JWT access token. Example: '
                    'obtain it from /api/auth/login/ and paste only the '
                    'token value here (the word "Bearer" is added automatically).'
                ),
            }
        }
    },
}


# ------------------------------------------------------------------
# CORS (Cross-Origin Resource Sharing)
# ------------------------------------------------------------------
# This allows the React Native app (running on a different origin,
# e.g. Metro bundler on http://localhost:8081 or a device IP) to call
# this API during development.
#
# CORS_ALLOW_ALL_ORIGINS = True is convenient for local development
# with a mobile app (there is no fixed browser "origin" for native
# apps), but should be tightened for production. See README.md for
# details on configuring this safely.

CORS_ALLOW_ALL_ORIGINS = True
