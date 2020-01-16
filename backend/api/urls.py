from django.urls import path
from api.views import views_flight
# from api.views import views_account
# from api.views import views_user
# from api.views import views_jog
# from api.views import views_report
# from api.views import views_api
# from jogging_tracker import settings


urlpatterns = [
    path('flight/<str:filename>/', views_flight.FileUploadView.as_view()),


]
#     # Account
#     #
#     path('user/create', views_account.AccountCreateView.as_view()),
#     path('user/account', views_account.AccountUpdateView.as_view()),


#     # Authentication
#     #
#     path('user/login', views_auth.LoginView.as_view()),
#     path('user/logout', views_auth.LogoutView.as_view()),


#     # User account actions for managers and admins
#     #
#     path('user/account/<int:pk>', views_user.UserView.as_view({
#         'get': 'retrieve',
#         'put': 'update',
#         'delete': 'destroy'})
#     ),


#     # Users list, only for managers and admins
#     #
#     path('users', views_user.UserView.as_view({
#         'get': 'list'})
#     ),
#     path('users/<str:filter_def>', views_user.UserFilteredView.as_view({
#         'get': 'list'})
#     ),


#     # Jog (single)
#     #
#     path('jog', views_jog.JogView.as_view({
#         'post': 'create'})
#     ),
#     path('jog/<int:pk>', views_jog.JogUpdateView.as_view()),
#     path('jog/user/<int:pk>', views_jog.JogForUserCreateView.as_view()),

#     # Jogs
#     #
#     path('jogs', views_jog.JogView.as_view({
#         'get': 'list'})
#     ),
#     path('jogs/<str:filter_def>', views_jog.JogFilteredView.as_view({
#         'get': 'list'})
#     ),


#     # Jogs for user, only for admins
#     #
#     path('jogs/user/<int:pk>', views_jog.JogsForUserView.as_view({
#         'get': 'list'})
#     ),
#     path('jogs/user/<int:pk>/<str:filter_def>', views_jog.JogsForUserFilteredView.as_view({
#         'get': 'list'})
#     ),


#     # Reports
#     #
#     path('reports/jogs/weekly', views_report.ReportWeeklyView.as_view()),
#     path('reports/jogs/weekly/<str:filter_def>', views_report.ReportWeeklyFilteredView.as_view()),
# ]

# if settings.API_LIVE_DOCUMENTATION['ENABLED']:
#     urlpatterns += [

#         # API live documentation and schema
#         #
#         path('docs/', views_api.ApiSchemaView.with_ui('swagger', cache_timeout=0)),
#         path('docs/redoc', views_api.ApiSchemaView.with_ui('redoc', cache_timeout=0)),
#         path('docs/schema.yaml', views_api.ApiSchemaView.without_ui(cache_timeout=0)),
#     ]
