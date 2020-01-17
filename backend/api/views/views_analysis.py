import logging
from rest_framework import response
from rest_framework import status
from rest_framework import views
from gliding.igc import IGC
from gliding.analysis import Analyzer
from api.models import models_flight
from api.serializers.serializers_analysis import AnalysisSerializer


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
        fixes_data = [fix.dict for fix in fixes]


        # Get calculated circles.
        #
        analyzer = Analyzer(fixes)
        circles  = analyzer.get_circles()

        circles_data = [
            dict(id=i, fixes=circles[i].dict) for i in range(len(circles))]
   
        data = dict(
            fixes=fixes_data,
            circles=circles_data
        )

        serializer = AnalysisSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        return response.Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
