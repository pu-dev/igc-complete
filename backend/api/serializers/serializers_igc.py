from rest_framework import serializers
from api.models import models_flight


class FlightCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating complete flight (whole IGC file).
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
                'baro_alt',
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

        extra_kwargs = {
            'pilot': { 'required': True },
            'glider_id': { 'required': True },
            'glider_type': { 'required': False },
        }

    def create(self, validated_data):
        fixes_data = validated_data.pop('fixes')
        flight = models_flight.Flight.objects.create(**validated_data)

        fixes_obj = [None] * len(fixes_data)

        for i in range(len(fixes_data)):
            fix_data = fixes_data[i]
            fixes_obj[i] = models_flight.Fix(**fix_data, flight_id=flight.id)

        models_flight.Fix.objects.bulk_create(fixes_obj)
        flight.loaded = True
        flight.save()

        return flight


class FlightGetSerializer(serializers.ModelSerializer):
    """
    Serializer for getting complete flight (whole IGC file).
    """

    class FixSerializer(serializers.ModelSerializer):
        """
        Serializer for single flight fix (IGC b-record).
        """

        lat = serializers.SerializerMethodField()

        lng = serializers.SerializerMethodField()

        class Meta:
            model = models_flight.Fix

            fields = (
                'id',
                'time',
                'lat',
                'lng',
                'baro_alt',
                'gps_alt'
                # 'valid',
            )

            read_only_fields = ('id',)

            extra_kwargs = {
                'gps_alt': {
                    'required': False,
                }
            }

        def get_lat(self, fix):
            return fix.f_lat

        def get_lng(self, fix):
            return fix.f_lng

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


class FlightHeaderSerializer(serializers.ModelSerializer):
    """
    Serializer for flight short info (IGC header).
    """

    class Meta:
        model = models_flight.Flight

        fields = (
            'id',
            'date',
            'pilot',
            'glider_id',
            'glider_type'
        )

        read_only_fields = ('id',)

