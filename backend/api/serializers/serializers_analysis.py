from rest_framework import serializers

class CoordsSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    lng = serializers.FloatField()
  

class CircleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    diameter_max = serializers.FloatField()
    diameter_calculated = serializers.FloatField()
    distance = serializers.FloatField()
    height_delta = serializers.IntegerField()
    time_total = serializers.IntegerField()
    vario_average = serializers.FloatField()
    fixes_count = serializers.IntegerField()
    
    # fixes = CoordsSerializer(many=True)


class StatsPropertySerializer(serializers.Serializer):
    """
    Serializer for single stats property.
    """
    class RangesSerializer(serializers.Serializer):
        id = serializers.IntegerField()
        range_start = serializers.FloatField()
        range_stop = serializers.FloatField()
        count = serializers.IntegerField()
        percentage = serializers.FloatField()

    average = serializers.FloatField()
    min = serializers.FloatField()
    max = serializers.FloatField()
    count = serializers.IntegerField()
    total = serializers.FloatField()
    
    ranges = RangesSerializer(many=True)


class StatsSerializer(serializers.Serializer):
    """
    Stats for every property of circles gatherd.
    """
    # diameter_max = StatsPropertySerializer()
    diameter_calculated = StatsPropertySerializer()
    # distance = StatsPropertySerializer()
    # height_delta = StatsPropertySerializer()
    # time_total = StatsPropertySerializer()
    # vario_average = StatsPropertySerializer()
    # fixes_count = StatsPropertySerializer()


class AnalysisSerializer(serializers.Serializer):
    """
    Whole analysis serializer.
    """
    stats = StatsSerializer()
    # fixes = CoordsSerializer(many=True)
    # circles = CircleSerializer(many=True)
