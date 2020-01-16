"""
Module creates API schema view via Swagger and ReDoc.
"""
from rest_framework import permissions
from drf_yasg import openapi
from drf_yasg.views import get_schema_view


ApiSchemaView = get_schema_view(
   openapi.Info(
      title="Jogging Tracker API",
      default_version='1.0',
      description="REST API that tracks jogging times of users",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="purbanski@interia.pl"),
      license=openapi.License(name="Toptal License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
