from django.urls import path
from rest_framework.routers import DefaultRouter
from api.views import views_flight
from api.views import views_api
from api.views import views_analysis


urlpatterns = [
    path('upload/', views_flight.FlighUploadView.as_view()),

    path('flights/', views_flight.FlightHeaderListView.as_view()),

    path('flights/<int:pk>/', views_flight.FlightGetView.as_view()),

    path('flights/<int:pk>/analysis/', views_analysis.AnalysisListView.as_view()),

]


# router = DefaultRouter()
# router.register(r'flights', views_flight.FlightView, basename='flight')
# urlpatterns += router.urls


urlpatterns += [

        # API live documentation and schema
        #
        path('docs/', views_api.ApiSchemaView.with_ui('swagger', cache_timeout=0)),
        path('docs/redoc', views_api.ApiSchemaView.with_ui('redoc', cache_timeout=0)),
        path('docs/schema.yaml', views_api.ApiSchemaView.without_ui(cache_timeout=0)),
]

