import math
from gliding.coords import Coords


class Circle:
    def __init__(self, fixes):
        self.__fixes = fixes

    @property
    def fix_start(self):
        return self.__fixes[0]

    @property
    def fix_stop(self):
        return self.__fixes[-1]
    
    @property
    def fixes(self):
        return self.__fixes
    
    @property
    def diameter_max(self):
                
        out = dict(coords1=None, coords2=None, distance=-math.inf)
        fixes = self.fixes

        # That can be easly optimized
        #
        for i in range(len(fixes)):
            coords1 = fixes[i].coords

            for j in range(i+1, len(fixes)):
                coords2 = fixes[j].coords

                distance = coords1.get_distance(coords2).get('diagonal')

                if distance > out.get('distance'):
                    out['distance'] = distance
                    out['coords1'] = coords1
                    out['coords2'] = coords2

        return out.get('distance')

    @property
    def diameter_calculated(self):
        return round(self.distance / (2*math.pi), 1)

    @property
    def distance(self):
        fixes = self.fixes
        distance = 0

        for i in range(len(fixes)-1):
            coords1 = fixes[i].coords
            coords2 = fixes[i+1].coords
            distance += coords1.get_distance(coords2).get('diagonal')

        return distance
    
    @property
    def height_delta(self):
        gps_delta = self.fix_stop.gps_alt - self.fix_start.gps_alt 
        baro_delta = self.fix_stop.baro_alt - self.fix_start.baro_alt

        # Prefer baro alt
        if self.fix_stop.baro_alt != 0 and self.fix_start.baro_alt != 0:
            return baro_delta

        return gps_delta

    @property
    def time_total(self):
        return self.fix_stop.time_in_seconds - self.fix_start.time_in_seconds

    @property
    def vario_average(self):
        return self.height_delta / self.time_total

    @property
    def speed(self):
        mps_to_kph = 3.6
        speed = ( self.distance / self.time_total ) * mps_to_kph
        return round(speed, 1)


    @property
    def fixes_count(self):
        return len(self.fixes)

    def __str__(self):
        return 'Fixes count: {}, diameter: {}'.format(self.fixes_count, self.diameter_calculated)

