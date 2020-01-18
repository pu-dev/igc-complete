import math
from gliding.circle import Circle
from gliding.coords import Coords

#
# This really should be reviewed
#

class Analyzer:
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
            
            coords_src = Coords.FromFix(self.__fixes[ind0])
            coords_dst = Coords.FromFix(self.__fixes[ind1])
            coords_dst_next = Coords.FromFix(self.__fixes[ind2])

            
            
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

