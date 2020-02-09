import logging
from rest_framework import parsers
from rest_framework import response
from rest_framework import status
from rest_framework import views
from rest_framework import viewsets
from rest_framework import generics

from gliding.igc import IGC
from api.serializers import serializers_igc
from api.models import models_flight


logger = logging.getLogger(__name__)


class FlighUploadView(views.APIView):
    parser_classes = (parsers.FileUploadParser, )
    serializer_class = serializers_igc.FlightCreateSerializer

    def post(self, request, format=None):
        file = request.body.decode('utf-8').split('\r\n')
        igc = IGC(file)

        igc_data = {}
        igc_data.update(igc.header.data)
        igc_data['fixes'] = igc.track.data

        serializer = self.serializer_class(data=igc_data)
        serializer.is_valid(raise_exception=True)
        flight = serializer.save()

        return response.Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class FlightHeaderListView(generics.ListAPIView):
    queryset = models_flight.Flight.objects.all()
    serializer_class = serializers_igc.FlightHeaderSerializer


class FlightGetView(generics.RetrieveAPIView):
    queryset = models_flight.Flight.objects.all()
    serializer_class = serializers_igc.FlightGetSerializer




