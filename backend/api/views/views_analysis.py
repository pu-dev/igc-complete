import logging
from rest_framework import response
from rest_framework import status
from rest_framework import views
from gliding.igc import IGC
from gliding import circle
from api.models import models_flight
from api.serializers.serializers_analysis import AnalysisSerializer
# from api.serializers.serializers_analysis import S


logger = logging.getLogger(__name__)


class AnalysisListView(views.APIView):
    def get_dataset(self, pk):
        fixes = models_flight.Fix.objects.filter(flight__id=pk)
        return fixes

    def get(self, request, pk, format=None):
        """
        REST get method.
        """

        # Get IGC fixes.
        #
        fixes = self.get_dataset(pk)
        if len(fixes) == 0:
            return response.Response(
                {'error': 'Flight id:{}, not found'.format(pk)},
                status=status.HTTP_404_NOT_FOUND
            )

        fixes_data = [fix.dict for fix in fixes]

        # Get calculated circles.
        #
        circleExtractor = circle.CircleExtractor(fixes)
        circles  = circleExtractor.get_circles()

        circles_data = [
            circles[i].get_dict(i) for i in range(len(circles))]

        stats = circle.Stats(circles)
   
        data = dict(
            fixes=fixes_data,
            circles=circles_data,
            stats=stats.stats
        )

        # print(stats.stats)
        # s = S(dat/a = stats.stats.get('diameter_calculated'))
        # s.is_valid(raise_exception=True)
        # print(s.data)

        serializer = AnalysisSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        return response.Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
