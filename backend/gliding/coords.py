import math

class Coords:

    # Each latitude is separated by 111km
    KM_LAT = 111

    # Distance on equator
    KM_LONG = 111.321

    # @staticmethod
    # def FromFix(fix):
    #     return Coords(fix.lat, fix.lng)

    def __init__(self, lat, lng):
        self.__lat = lat
        self.__lng = lng

    def __str__(self):
        out = 'lat: {}, lng: {}'.format(self.lat, self.lng)
        return out

    def get_bearing(self, dst):
        """
        Get bearing to another point.
        """
        d_lat = dst.lat - self.lat
        d_lng = dst.lng - self.lng
        
        if d_lat == 0:
            if d_lng >= 0:
                return 0
            else:
                return 180

        radians = abs(math.atan(d_lng/d_lat))
      
        delta = 0;
        degrees = math.degrees(radians);
        
        if dst.lng >= self.lng and dst.lat >= self.lat:
            delta = 0;
            degrees = delta + degrees;
        elif dst.lng <= self.lng and dst.lat >= self.lat:
            delta = 360;
            degrees = delta - degrees;
        elif dst.lng >= self.lng and dst.lat <= self.lat:
            delta = 180;
            degrees = delta - degrees;
        elif dst.lng <= self.lng and dst.lat <= self.lat:
            delta = 180;
            degrees = delta + degrees;
        
        return degrees;
    
    def get_bearing_delta(self, dst, dst_next):
        
        bearing = self.get_bearing(dst);
        bearing_next = dst.get_bearing(dst_next)
        
        d_bearing = None

        # If crosses 0 degree - counterclock wise              
        if bearing_next < 90 and bearing > 270:
            d_bearing = 360 - bearing + bearing_next;
        
        # if crosses 0 degree - anit clockwise
        elif bearing_next > 270 and bearing < 90:
            d_bearing = 360 - bearing_next + bearing

        else:
            d_bearing = bearing_next - bearing
        
        return d_bearing;

    def get_distance(self, dst):
        '''Distance in meters'''
        
        distance = {}
        
        #
        # Horizontal distance
        lat_dist = abs(self.lat - dst.lat) * self.KM_LAT * 1000
        distance['horizontal'] = lat_dist

        #
        # Vertical distance
        lat_in_rad = math.pi / 180 * (self.lat + dst.lat) / 2;
        rad_cos = math.cos(lat_in_rad)
        lng_dist = rad_cos * abs(self.lng - dst.lng) * self.KM_LONG * 1000
        distance['vertical'] = lng_dist

        #
        # Diagonal distance
        diag_dist = math.sqrt(lat_dist**2 + lng_dist**2)
        distance['diagonal'] = diag_dist

        #
        # Pitagoras distance
        pitagoras = math.sqrt((self.lat - dst.lat)**2 + (self.lng - dst.lng)**2)
        distance['pitagoras'] = pitagoras

        return distance;
    

    @property
    def lat(self):
        return self.lat_to_float(self.__lat)

    @property
    def lng(self):
        return self.lng_to_float(self.__lng)

    @staticmethod
    def lat_to_float(lat):
        f_lat = float(lat[0:2])
        f_lat += float(lat[2:7]) / 60000

        if lat[7] == 'S':
            f_lat = -f_lat

        return f_lat

    @staticmethod
    def lng_to_float(lng):
        f_lng = float(lng[0:3])
        f_lng += float(lng[3:8]) / 60000

        if lng[8] == 'W':
            f_lng = -f_lng

        return f_lng