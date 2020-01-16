from rest_framework import serializers
from api.models import models_flight


class FlightHeaderSerializer(serializers.ModelSerializer):

    class Meta:
        model = models_flight.Flight

        fields = (
            'id',
            'pilot',
            'glider_id',
            'glider_type',
            'date',
        )

        read_only_fields = ('id',)


class FlightTrackSerializer(serializers.ModelSerializer):

    class Meta:
        model = models_flight.Fix

        fields = (
            'id',
            'time',
            'lat',
            'lng',
            'pressuer_alt',
            'gps_alt'
            # 'valid',
        )

        read_only_fields = ('id',)

        extra_kwargs = {
            'gps_alt': {
                'required': False,
            }
        }
