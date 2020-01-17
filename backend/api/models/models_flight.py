from django.db import models


class Flight(models.Model):
    date = models.DateField(blank=False)

    pilot = models.CharField(max_length=64, blank=True)

    glider_id = models.CharField(max_length=16, blank=True)

    glider_type = models.CharField(max_length=32, blank=True, default="")

    class Meta:
        ordering = ['-date']


class Fix(models.Model):
    class Valid(models.TextChoices):
        VALID = 'valid'
        WARNING = 'nav-warning'

    flight = models.ForeignKey(Flight, related_name='fixes', on_delete=models.CASCADE)

    time = models.TimeField()

    lat = models.CharField(max_length=8)

    lng = models.CharField(max_length=9)

    pressuer_alt = models.IntegerField()

    gps_alt = models.IntegerField(null=True, blank=True)
