import math

class Coords:

    @staticmethod
    def FromFix(fix):
        return Coords(fix.lat, fix.lng)

    def __init__(self, lat, lng):
        self.__lat = lat
        self.__lng = lng

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

# this.getDistance = function(coordDst) {
        
#         var KM_LAT = 111; // each latitude separated 111km apart
#         var KM_LONG = 111.321; // distance on equator
        
#         var distance = {};
        
#         {
#             var latitudeDist = Math.abs(this.latitude - coordDst.latitude) * KM_LAT * 1000;
#             distance['horizontal'] = latitudeDist;          
#         }
        
#         {   
#             var latitudeInRad = Math.PI / 180 * (this.latitude + coordDst.latitude) / 2;
#             var radcos = Math.cos(latitudeInRad);
        
#             var longitudeDist = radcos * Math.abs(this.longitude - coordDst.longitude) * KM_LONG * 1000;
            
#             distance['vertical'] = longitudeDist;
#         }
            
#         {
#             var dh = distance['horizontal'];
#             var dv = distance['vertical'];
            
#             var diagDist = Math.sqrt( dh * dh + dv * dv);
            
#             distance['diagonal'] = diagDist;
#         }
        
#         {
#             var pitagoras = Math.sqrt( (this.latitude - coordDst.latitude)**2 + (this.longitude - coordDst.longitude)**2);
#             distance['pitagoras'] = pitagoras;
#         }

#         return distance;
#     }
#     return this;
    

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