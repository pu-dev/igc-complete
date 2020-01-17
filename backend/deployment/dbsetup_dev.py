

class DBSetupDevelopment:

    def __init__(self):
        self.create_test_users()
        self.load_test_flights()


    @classmethod
    def create_test_users(cls):
        from django.contrib.auth.models import User

        User.objects.create_superuser('admin', 'admin@example.com', '1')


    @classmethod
    def load_test_flights(cls):
        from igc_complete import settings
        from api.igc import IGC
        from api.serializers import serializers_igc
        from os import listdir
        from os.path import isfile, join
        
        igc_dir = settings.DEVELOPMENT['igc_dir']
        igc_files = [f for f in listdir(igc_dir) if isfile(join(igc_dir, f))]

        for filename in igc_files:
            print('Loading: {}'.format(filename))
            file = open('{}/{}'.format(igc_dir, filename), 'r')
            igc = IGC(file)

            igc_data = {}
            igc_data.update(igc.header.data)
            igc_data['fixes'] = igc.track.data

            serializer = serializers_igc.FlightSerializer(data=igc_data)
            serializer.is_valid(raise_exception=True)
            flight = serializer.save()


DBSetupDevelopment()
