from django.urls import path
from django.urls import re_path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from rest_framework.routers import DefaultRouter
from api.views import views_flight
from api.views import views_api
from api.views import views_analysis


from api.gql_schemas.schema_flight import schema as flight_schema

urlpatterns = [
    path('upload/', views_flight.FlighUploadView.as_view()),

    path('flights/', views_flight.FlightHeaderListView.as_view()),

    path('flights/<int:pk>/', views_flight.FlightGetView.as_view()),

    re_path(
        r'^flights/(?P<pks>([0-9]+/){1,})analysis/$', 
        views_analysis.AnalysisFlightsView.as_view()
    ),

    # Analysis
    re_path(
        r'^flights/(?P<pks>([0-9]+/){1,})analysis/$', 
        views_analysis.AnalysisFlightsView.as_view()
    ),
]


# Moving away from rest to GraphQL
#
urlpatterns += [
    # fixme: csrf_exempt must go
    path('gql/flights/', 
        csrf_exempt(GraphQLView.as_view(graphiql=True, schema=flight_schema)))
]


# Swagger
#
urlpatterns += [
        # API live documentation and schema
        #
        path('docs/', views_api.ApiSchemaView.with_ui('swagger', cache_timeout=0)),
        path('docs/redoc', views_api.ApiSchemaView.with_ui('redoc', cache_timeout=0)),
        path('docs/schema.yaml', views_api.ApiSchemaView.without_ui(cache_timeout=0)),
]
