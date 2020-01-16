from django.contrib.auth.models import User
# from deployment.dbsetup import DBSetupBase


class DBSetupDevelopment:

    def __init__(self):
        self.create_test_users()
        # self.create_test_jogs()


    @classmethod
    def create_test_users(cls):
        global User

        User.objects.create_superuser('admin', 'admin@example.com', '1')

    
DBSetupDevelopment()
