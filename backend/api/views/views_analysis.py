import logging
from rest_framework import response
from rest_framework import status
from rest_framework import views
from gliding.circle.extractor import CircleExtractor
from gliding.circle.stats import Stats as CircleStats
from api.models import models_flight

logger = logging.getLogger(__name__)


class AnalysisFlightsView(views.APIView):

    def get(self, request, pks, format=None):
        pks = pks[:-1].split('/')
        stats_data = []

        for flight_id in pks:
            fixes = models_flight.Fix.objects.filter(flight__id=flight_id)
            flight = models_flight.Flight.objects.get(id=flight_id)
            circles  = CircleExtractor(fixes).get_circles()

            tmp = dict(
                flight=flight,
                circles=circles)

            stats_data.append(tmp)

        stats = CircleStats(stats_data)

        return response.Response(
            stats.stats_for_graphs,
            status=status.HTTP_200_OK
        )
