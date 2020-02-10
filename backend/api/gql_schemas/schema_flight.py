from django.db.models import Q
import graphene
from graphene_django import DjangoObjectType
from gliding.circle.extractor import CircleExtractor
from api.models.models_flight import Fix
from api.models.models_flight import Flight


'''
GQL types definitions
'''

class FixType(DjangoObjectType):
    class Meta:
        model = Fix

    count = graphene.Int()

    f_lat = graphene.Float()

    f_lng = graphene.Float()

    def count(parent, info):
        return len(parent)

    def resolve_f_lat(self, info):
        return self.f_lat

    def resolve_f_lng(self, info):
        return self.f_lng


class CircleType(graphene.ObjectType):
    diameter = graphene.Float()

    height_delta = graphene.Int()

    distance = graphene.Int()

    vario_average = graphene.Float()

    speed = graphene.Float()

    fixes_count = graphene.Int()

    fixes = graphene.List(FixType)

    def resolve_diameter(self, info, **kwargs):
        return self.diameter_calculated

    def resolve_height_delta(self, info, **kwargs):
        return self.height_delta

    def resolve_distance(self, info, **kwargs):
        return self.distance

    def resolve_vario_average(self, info, **kwargs):
        return self.vario_average

    def resolve_speed(self, info, **kwargs):
        return self.speed

    def resolve_fixes_count(self, info, **kwargs):
        return self.fixes_count

    def resolve_fixes(self, info, **kwargs):
        return self.fixes


class FlightStatsType(graphene.ObjectType):

    fixes_count = graphene.Int()

    def resolve_fixes_count(parent, info, **kwargs):
        return parent.get('fixesCount')


class FlightType(DjangoObjectType):
    class Meta:
        model = Flight

    circles = graphene.List(CircleType)

    stats = graphene.Field(FlightStatsType)


    def resolve_circles(parent, info, **kwargs):
        fixes = parent.fixes.all()
        circles = CircleExtractor(fixes).get_circles()
        return circles

    def resolve_stats(parent, info, **kwargs):
        fixes = parent.fixes.all()
        return dict(
            fixesCount=len(fixes)
        )



'''
GQL queries definitions
'''

class QueryFlights:
    flights = graphene.List(
        FlightType,
        loaded=graphene.Boolean(),
        pks=graphene.List(graphene.Int),
        pilots=graphene.List(graphene.String),
    )

    def resolve_flights(self, info, **kwargs):
        # Everything
        filters = Q(id__gt=0)

        # Get flights which finished loading        
        loaded = kwargs.get('loaded')
        if loaded is not None:
            filters = filters & Q(loaded=loaded)

        # Filter by id's
        pks = kwargs.get('pks')
        if pks:
            pks_filters = None
            for pk in pks:
                if pks_filters:
                    pks_filters = pks_filters | Q(id=pk)
                else:
                    pks_filters = Q(id=pk)

            filters = filters & pks_filters

        return Flight.objects.all().filter(filters)


class Query(QueryFlights, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)
