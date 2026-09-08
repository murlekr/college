"""
Root URL configuration for the college_backend project.

/admin/          Django admin panel
/api/auth/...     Authentication endpoints (register, login, refresh, me)
/api/students/... Student CRUD endpoints
/api/schema/      Raw OpenAPI schema (JSON)
/api/docs/        Swagger UI
/api/redoc/       ReDoc UI
"""

from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    # Authentication + Student CRUD APIs (defined in students app)
    path('api/', include('students.urls')),

    # API documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
