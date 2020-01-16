from api.models.models_role import Role
from deployment.dbsetup import DBSetupBase

class DBSetupProduction(DBSetupBase):
    # Encrypted: "123"
    PASSWORD_ENCRYPTED = "pbkdf2_sha256$180000$6WFFzzINkBSx$6dgnnJtNatil+GdUt2BjDNqK1KCcmLMqBL1/Rza8O60="
    
    def __init__(self):
        self.create_test_users()

    @classmethod
    def create_test_users(cls):
        global Role

        cls.create_user(
            'user',
            cls.PASSWORD_ENCRYPTED,
            Role.UserRole.USER)

        cls.create_user(
            'manager',
            cls.PASSWORD_ENCRYPTED,
            Role.UserRole.MANAGER)

        cls.create_user(
            'admin',
            cls.PASSWORD_ENCRYPTED,
            Role.UserRole.ADMIN)


DBSetupProduction()
