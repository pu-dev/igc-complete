from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group, User

from api.models.models_flight import Flight
from api.models.models_flight import Fix
# from api.models.models_role import Role


admin.site.unregister(User)
admin.site.unregister(Group)


# @admin.register(Jog)
# class JogAdmin(admin.ModelAdmin):
#     list_display = (
#         'id', 'owner', 'date', 'distance', 'duration', 'location', 'weather')

#     list_display_links = (
#         'id', 'owner', 'date', 'distance', 'duration', 'location')


class FixInLine(admin.TabularInline):
    model = Fix
    can_delete = False
    # radio_fields = {'role': admin.VERTICAL}
    extra = 0

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # inlines = (RoleInLine,)
    fieldsets = (
        ('User data', {
            'fields': ('username', 'password')
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser')
        }),
    )

    list_display = ('id', 'username')
#     list_display_links = list_display


# @admin.register(Role)
# class RoleAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'role')

@admin.register(Flight)
class FlightAdmin(admin.ModelAdmin):
    inlines = (FixInLine,)

    list_display = ('id', 'date', 'pilot', 'glider_id', 'glider_type')
    list_display_links = ('id', 'date', 'pilot')
