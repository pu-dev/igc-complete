from django.db import models


class Flight(models.Model):
    date = models.DateField()

    pilot = models.CharField(max_length=64, blank=False)

    glider_id = models.CharField(max_length=16, blank=False)

    glider_type = models.CharField(max_length=32, blank=False)


class Fix(models.Model):
    class Valid(models.TextChoices):
        VALID = 'valid'
        WARNING = 'nav-warning'

    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)

    time = models.TimeField()

    lat = models.CharField(max_length=8)

    lng = models.CharField(max_length=9)

    pressuer_alt = models.IntegerField()

    gps_alt = models.IntegerField(null=True, blank=True)
