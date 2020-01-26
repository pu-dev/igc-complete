import graphene
from graphene_django import DjangoObjectType
from api.models.models_flight import Flight


class FlightType(DjangoObjectType):
    class Meta:
        model = Flight


class Query(graphene.ObjectType):
    flight = graphene.Field(FlightType, 
        id=graphene.Int())

    flights = graphene.List(FlightType,
        pilot=graphene.String())

    all_flights = graphene.List(FlightType)


    def resolve_flight(self, info, **kwargs):
        id = kwargs.get('id')
        if id:
            return Flight.objects.get(pk=id)

        return None

    def resolve_flights(self, info, **kwargs):
        pilot = kwargs.get('pilot')
        if pilot:
            return Flight.objects.all().filter(pilot=pilot)

        return None

    def resolve_all_flights(self, info):
        return Flight.objects.all()


schema = graphene.Schema(query=Query)