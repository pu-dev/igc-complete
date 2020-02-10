from django.db import models
from gliding.coords import Coords

class Flight(models.Model):
    date = models.DateField(blank=False)

    pilot = models.CharField(max_length=64, blank=True)

    glider_id = models.CharField(max_length=16, blank=True)

    glider_type = models.CharField(max_length=32, blank=True, default="")

    loaded = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return 'date:{} pilot:{} loaded:{}'.format(self.date, self.pilot, self.loaded)

class Fix(models.Model):
    class Valid(models.TextChoices):
        VALID = 'valid'
        WARNING = 'nav-warning'

    flight = models.ForeignKey(Flight, related_name='fixes', on_delete=models.CASCADE)

    time = models.TimeField()

    lat = models.CharField(max_length=8)

    lng = models.CharField(max_length=9)

    baro_alt = models.IntegerField()

    gps_alt = models.IntegerField(null=True, blank=True)

    @property
    def f_lat(self):
        return Coords.lat_to_float(self.lat)

    @property
    def f_lng(self):
        return Coords.lng_to_float(self.lng) 

    @property
    def coords(self):
        return Coords(self.lat, self.lng)

    @property
    def time_in_seconds(self):
        t = self.time
        return t.hour*60*60 + t.minute*60 + t.second
    
    @property
    def dict(self):
        return dict(
            lat=self.f_lat,
            lng=self.f_lng,
            time=self.time
        )

    def __str__(self):
        out = 'lat:{}, lng:{}, time:{}'.format(self.lat, self.lng, self.time)
        return out