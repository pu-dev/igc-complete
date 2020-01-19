import math
from gliding.coords import Coords

class Circle:
    PROPERTIES = (
        'diameter_max', 
        'diameter_calculated',
        'distance',
        'height_delta',
        'time_total',
        'vario_average',
        'fixes_count'
    )

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
    def dict(self):
        out = dict(
            id=1,
            fixes=[fix.dict for fix in self.__fixes]
        )

        for prop in self.PROPERTIES:
            out[prop] = getattr(self, prop)

        return out

    def get_dict(self, i):
        out = self.dict
        out['id'] = i
        return out

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
    def fixes_count(self):
        return len(self.fixes)



#
# This really should be reviewed
#

class CircleExtractor:
    """
    Extracts circles from a IGC fixes.
    """
    FULL_CIRCLE_DEGREE = 360
    CHOP_TAIL_ANGLE_PROBE = 30
    MAX_ONE_CIRCLE_SECONDS = 120


    def __init__(self, fixes):
        pass
        self.__fixes = fixes

    def get_circles(self):
        """
        Idea here is to sum up bearing delta calculated between consecutive 
        IGC fixes. Once bearing delta is > (or <) 360 (or -360) we have a 
        circle. For circle we need to check if 'chopping' tail (remaing track) 
        is not needed.
        """

        fixes = self.__fixes

        d_angle = 0
        circle_count = 0
    
        circles = []

        circle_point_index = []

        store_circle = True    
    
        for i in range(len(fixes)-2):
            circle_point_index.append(i)
        
            coords_src = fixes[i].coords
            coords_dst = fixes[i+1].coords
            coords_dst_next = fixes[i+2].coords

            d_bearing = coords_src.get_bearing_delta(coords_dst, coords_dst_next)        
            d_angle += d_bearing


            # If angleDelta is greater than 360 - it means, we did full circle

            if abs(d_angle) > self.FULL_CIRCLE_DEGREE:

                circle_count += 1
                d_angle = self.chop_angle_delta(d_angle)
                
                circle_point_index.append(i+1)
                circle_point_index.append(i+2)

                # Check if need to chop circle tail
                if self.should_chop(circle_point_index):
                    outcome = self.chop(circle_point_index)
                    
                    if outcome.get('chopped'):
                        d_angle = 0
                        i = outcome.get('shift_to_index')
                        store_circle = False

                if store_circle:
                    circle_points = []
                    for ind in circle_point_index:
                        circle_points.append(fixes[ind])

                    
                    circles.append(Circle(circle_points))
                    i = i + 1

                store_circle = True
                circle_point_index = []

        return circles


    def chop(self, circle_point_index):

        chopped = False
        d_angle = 0
        
        shift_to_index = circle_point_index[len(circle_point_index) - 1]
        time_start = self.__fixes[shift_to_index].time_in_seconds
        

        # todo I believe it should be 2 not 3
        #

        for i in range(3, len(circle_point_index))[::-1]:
            
            ind0 = circle_point_index[i]
            ind1 = circle_point_index[i-1]
            ind2 = circle_point_index[i-2]
            
            coords_src = self.__fixes[ind0].coords
            coords_dst = self.__fixes[ind1].coords
            coords_dst_next = self.__fixes[ind2].coords

            
            
            d_bearing = coords_src.get_bearing_delta(coords_dst, coords_dst_next)
            d_angle = d_angle + d_bearing
            
            # Check if reset countdown
            # 

            if abs(d_angle) > self.CHOP_TAIL_ANGLE_PROBE:
                d_angle = 0
                time_start = self.__fixes[ind2].time_in_seconds
                shift_to_index = circle_point_index[i]
                continue


            time_stop = self.__fixes[ind2].time_in_seconds
            time_delta = time_start - time_stop

            # Check countdown elapsed
            # 

            if time_delta >= self.MAX_ONE_CIRCLE_SECONDS / (360 / self.CHOP_TAIL_ANGLE_PROBE ) * 2:
                chopped = True
                break

        return {'chopped' : chopped, 'shift_to_index' : shift_to_index }


    def chop_angle_delta(self, d_angle):
        sign = 1
    
        # angleDelta can be greater than 360 or smaller than -360
        if d_angle != 0:
            sign = d_angle / abs(d_angle)
    
        d_angle = sign * (abs(d_angle) - self.FULL_CIRCLE_DEGREE)
        return d_angle

    def should_chop(self, circle_point_index):
        # check if circle should be checked for chop
        time_start  = self.__fixes[circle_point_index[0]].time_in_seconds
        time_finish = self.__fixes[circle_point_index[-1]].time_in_seconds

        time_delta = (time_finish - time_start)
        
        return time_delta > self.MAX_ONE_CIRCLE_SECONDS


class Stats:
    def __init__(self, circles):
        self.__circles = circles
        self.__stats = None

    @property
    def stats(self):
        if self.__stats is None:
            stats = {}
            circles = self.__circles
            for prop in Circle.PROPERTIES:
                values = [getattr(circle, prop) for circle in circles]
                stats[prop] =self.get_stats(values)
            
            self.__stats = stats
        return self.__stats

    def get_stats(self, values):
        GROUP_COUNT = 8

        value_min = min(values)
        value_max = max(values)
        value_delta = (value_max - value_min) / GROUP_COUNT
        value_count = len(values)
        value_total = sum(values)
        value_avg = value_total / value_count

        value_count_in_group = [0] * GROUP_COUNT

        for value in values:
            i = math.floor((value - value_min) / value_delta)
            try:
                value_count_in_group[i] += 1
            except Exception as ex:
                # print("problem")
                # print("value: {}, min:{}, value_delg:{}".format(value, value_min, value_delta))
                # print("({}-{})/{}".format(value, value_min, value_delta))
                # I believe it is OK
                # 
                value_count_in_group[-1] += 1

        range_stats = [None] * GROUP_COUNT

        for i in range(GROUP_COUNT):
            range_stats[i] = dict(
                id=i,
                range_start=round(value_delta * i + value_min, 1),
                range_stop=round(value_delta * (i+1) + value_min, 1),
                count=value_count_in_group[i],
                percentage=(value_count_in_group[i]*100/value_count)
            )

        out = dict(
            average=round(value_avg, 1),
            min=round(value_min, 1),
            max=round(value_max, 1),
            count=value_count,
            total=value_total,
            ranges=range_stats
        )
        return out


