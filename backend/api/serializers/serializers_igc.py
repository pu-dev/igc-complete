from rest_framework import serializers
from api.models import models_flight


class FlightSerializer(serializers.ModelSerializer):
    """
    Serializer for complete flight (whole IGC file).
    """

    class FixSerializer(serializers.ModelSerializer):
        """
        Serializer for single flight fix (IGC b-record).
        """

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

    fixes = FixSerializer(many=True)


    class Meta:
        model = models_flight.Flight

        fields = (
            'id',
            'date',
            'pilot',
            'glider_id',
            'glider_type',
            'fixes'
        )

        read_only_fields = ('id',)

    def create(self, validated_data):
        fixes = validated_data.pop('fixes')
        flight = models_flight.Flight.objects.create(**validated_data)

        for fix in fixes:
            fix['flight_id']=flight.id
            models_flight.Fix.objects.create(**fix)

        return flight
