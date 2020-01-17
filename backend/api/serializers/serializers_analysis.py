from rest_framework import serializers

class CoordsSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    lng = serializers.FloatField()
  

class CircleSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    fixes = CoordsSerializer(many=True)


class AnalysisSerializer(serializers.Serializer):
    fixes = CoordsSerializer(many=True)
    circles = CircleSerializer(many=True)

