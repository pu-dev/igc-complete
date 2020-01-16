from datetime import datetime, timedelta
from django.contrib.auth.models import User
# from api.models.models_role import Role
# from api.models.models_jog import Jog

class DBSetupBase:

    @classmethod
    def create_user(cls, username, password, is_admin=False):

        global User

        # user = User.objects.create(
        #     username=username,
        #     password=password
        # )
        user = User.objects.create_user(username, 'test@test.com', password)

        if is_admin:
            user.is_active = True
            user.is_staff = True
            user.is_admin = True



        # role.save()
        user.save()

    # @classmethod
    # def create_jog(
    #     cls,
    #     username,
    #     date,
    #     distance,
    #     duration,
    #     location):

    #     global Jog

    #     user = User.objects.get(username=username)

    #     jog_data = dict(owner=user)
    #     jog_data['date'] = cls.str_to_date(date)
    #     jog_data['distance'] = distance
    #     jog_data['duration'] = cls.str_to_duration(duration)
    #     jog_data['location'] = location

    #     Jog.objects.create(**jog_data)

    # @classmethod
    # def str_to_date(cls, date_str):
    #     global datetime
    #     return datetime.strptime(date_str, '%Y-%m-%d')

    # @classmethod
    # def str_to_duration(cls, dur_str):
    #     global timedelta
    #     tmp = datetime.strptime(dur_str, "%H:%M:%S")
    #     duration = timedelta(
    #         hours=tmp.hour,
    #         minutes=tmp.minute,
    #         seconds=tmp.second)
    #     return duration


