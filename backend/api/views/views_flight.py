import logging
from rest_framework import parsers
from rest_framework import response
from rest_framework import status
from rest_framework import views
from api import igc
from api.serializers.serializers_igc import FlightHeaderSerializer
from api.serializers.serializers_igc import FlightTrackSerializer

logger = logging.getLogger(__name__)

logger = logging.getLogger(__name__)


class FileUploadView(views.APIView):
    parser_classes = (parsers.FileUploadParser, )

    def post(self, request, filename, format=None):
        file = request.data.get('file')

        igc_header = igc.Header()
        igc_track = igc.Track()

        obj_map = {
            'H' : igc_header,
            'B' : igc_track
        }

        for record in file:
            record = record.decode('ascii')
            record_type = record[0]
           
            if record_type in obj_map:
                obj_map.get(record_type).add_record(record) 
            else:
                logger.warning(
                    "Unknown IGC record type: {}, "
                    "raw record: {}".format(record_type, record))

        header_serializer = FlightHeaderSerializer(data=igc_header.data)
        header_serializer.is_valid(raise_exception=True)
        flight_header = header_serializer.save()

        track_serializer = FlightTrackSerializer(data=igc_track.data(), many=True)
        track_serializer.is_valid(raise_exception=True)
        track = track_serializer.save(flight_id=flight_header.id)

        return response.Response(
            header_serializer.data,
            status=status.HTTP_201_CREATED
        )

