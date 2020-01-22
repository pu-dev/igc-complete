import jmespath
import json
import logging
import math

from gliding.circle.circle import Circle

logger = logging.getLogger(__name__)


# import collections # requires Python 2.7 -- see note below if you're using an earlier version
# def merge_dict(d1, d2):
#     """
#     Modifies d1 in-place to contain values from d2.  If any value
#     in d1 is a dictionary (or dict-like), *and* the corresponding
#     value in d2 is also a dictionary, then merge them in-place.
#     """
#     for k,v2 in d2.items():
#         v1 = d1.get(k) # returns None if v1 has no value for this key
#         if ( isinstance(v1, collections.Mapping) and 
#              isinstance(v2, collections.Mapping) ):
#             merge_dict(v1, v2)
#         else:
#             d1[k] = v2

class Stats:

    FLOAT_PRECISION = 2

    STATS_DEFINITION = (
        dict(
            property='diameter_calculated',
            range=[100, 150, 200, 250, 300],

            label_stats_mean='Diameter bong',
            label_stats_ranges=' range Diameter bong'
        ),
        

        dict(
            property='vario_average',
            range=[0.0, 1.0, 2.0, 3.0, 4.0],
            
            label_stats_mean='var bong',
            label_stats_ranges=' range vario bong'

        ),
        
        # dict(
        #     property='vario_average',
        #     
        #     label='vario_average bong'
        # ),

        # vario in time

        # dict(
            # property='distance',
            # ranges=[50, 100, 150, 200, 250, 300]
        # ),
        # 'distance',
        # 'height_delta',
        # 'time_total',
        # 'vario_average',
        # 'fixes_count'
    )

    def __init__(self, owned_circles):
        self.__owned_circles = owned_circles
        self.__stats = None


    @property
    def stats(self):
        self.__calculate_stats()
        return self.__stats

    def __calculate_stats(self):
        """
        Function calculates stats per flight.
        Once calculated they are cached.
        Data returned is not prepared for viewing with graph library. It has to
        be rearranged.
        """

        if self.__stats is not None:
            return

        stats = []
        meta = {}
        
        for stats_def in self.STATS_DEFINITION:
            property_stat_ranges = stats_def.get('range')
            circle_property = stats_def.get('property')

            meta[circle_property] = dict(
                range_def=property_stat_ranges
            )

        for owned_circles in self.__owned_circles:
            flight_id = owned_circles.get('flight').id
            flight_date = str(owned_circles.get('flight').date)
            pilot_name = owned_circles.get('flight').pilot
            circles = owned_circles.get('circles')

            flight_info=dict(
                flight_id=flight_id,
                flight_date=flight_date,
                pilot_name=pilot_name
            )
                
            flight_stats = dict()

            flight_data = dict(
                flight_info=flight_info,
                flight_stats=flight_stats
            )

            stats.append(flight_data)

            for stats_def in self.STATS_DEFINITION:
                property_stat_ranges = stats_def.get('range')
                circle_property = stats_def.get('property')
                circles_property_values = [getattr(circle, circle_property) for circle in circles]

                flight_stats[circle_property] = self.__calculate_mean_stats(circles_property_values)
                

                range_stats = self.__calculate_ranges_stats(
                    circles_property_values,
                    property_stat_ranges
                )

                flight_stats[circle_property]['range_count_values'] = (
                    range_stats.get('range_count_stats')
                )

                flight_stats[circle_property]['range_count_weighted_values'] = (
                    range_stats.get('range_count_weighted_stats')
                )
                
                flight_stats[circle_property]['range_mean_values'] = (
                    range_stats.get('range_mean_value_stats')
                )

        self.__stats = dict(
            meta=meta,
            data=stats
        )

        logger.debug('Stats calculated: {}'.format(json.dumps(self.__stats, indent=3)))

    def __calculate_ranges_stats(self, values, range_):
        stats_count = [0] * (len(range_)+1)
        stats_value = [0] * (len(range_)+1)

        for value in values:
            in_range = False
            for i in range(len(range_)):
                
                if value <= range_[i]:
                    stats_count[i] += 1
                    stats_value[i] += value

                    in_range = True
                    break

            if in_range is False:
                stats_count[-1] += 1
                stats_value[-1] += value

        stats_mean_value = [
            round(stats_value[i]/stats_count[i], self.FLOAT_PRECISION)
            if stats_value[i] != 0 else 0
            for i in range(len(stats_count)) 
        ]

        total_count = len(values)

        stats_weighted = [
            round(count/total_count * 100, self.FLOAT_PRECISION) for count in stats_count
        ]

        return dict(
            # count of items in a range
            range_count_stats=stats_count,

            # count of items in a range / total items - percentage
            range_count_weighted_stats=stats_weighted,

            # mean value in a range
            range_mean_value_stats=stats_mean_value)


    def __calculate_mean_stats(self, values):
        value_min = min(values)
        value_max = max(values)

        value_count = len(values)
        value_total = sum(values)
        value_avg = value_total / value_count

        stats_generated = dict(
            average=round(value_avg, self.FLOAT_PRECISION),
            min=round(value_min, self.FLOAT_PRECISION),
            max=round(value_max, self.FLOAT_PRECISION),
        )

        return stats_generated


    @property
    def stats_for_graphs(self):
        return dict(
            stats_properties_processed=self.__search_property_names(),
            stats_series_keys=self.__search_flight_descriptor(),
            stats_mean=self.stats_mean,
            stats_ranges_count=self.stats_ranges_count,
            stats_ranges_count_weighted=self.stats_ranges_count_weighted,
            stats_ranges_mean_value=self.stats_ranges_mean_values,
        )

    @property
    def stats_mean(self):
        stats_data = self.stats
        stats_generated = dict()
        
        flight_descriptor = self.__search_flight_descriptor()

        for prop_def in self.STATS_DEFINITION:

            prop_stats = []
            prop_name = prop_def.get('property')
            prop_label = prop_def.get('label_stats_mean')

            stats_generated[prop_name] = dict(
                label=prop_label,
                values=prop_stats,
            )
            

            for stat_name in ('min', 'average', 'max'):
                stat_values = self.__search_stat_values(prop_name, stat_name)

                stat = dict(zip(flight_descriptor, stat_values))
                stat['id'] =  stat_name

                prop_stats.append(stat)

        return stats_generated
    
    @property
    def stats_ranges_count(self):
        return self.__stats_ranges_base(self.__search_range_count_values)

    @property
    def stats_ranges_count_weighted(self):
        return self.__stats_ranges_base(self.__search_range_count_weighted_values)

    @property
    def stats_ranges_mean_values(self):
        return self.__stats_ranges_base(self.__search_range_mean_values)

    def __stats_ranges_base(self, get_range_fn):
        def get_range_description(ind):
            range_label = None
            if ind == 0:
                range_label = "x <= {}".format(range_def[ind])
            elif ind < len(range_value) - 1:
                range_label = "{} < x <= {}".format(
                range_def[ind-1], range_def[ind])
            else:
                range_label = "{} < x".format(range_def[ind-1])

            return range_label

        stats_data = self.stats
        stats_generated = dict()

        flight_descriptor = self.__search_flight_descriptor()

        for prop_def in self.STATS_DEFINITION:

            prop_name = prop_def.get('property')
            prop_label = prop_def.get('label_stats_ranges')
            range_def = prop_def.get('range')

            range_values = get_range_fn(prop_name)

            property_range_calculated = [None] * len(range_values[0])

            stats_generated[prop_name] = dict()

            for i in range(len(range_values)):
                range_value = range_values[i]
                for j in range(len(range_value)):
                    value = range_value[j]
                    if property_range_calculated[j]:
                        property_range_calculated[j].update({flight_descriptor[i]: value})
                    else:
                        property_range_calculated[j] = {
                            'id':  get_range_description(j),
                            flight_descriptor[i]: value
                        }
            
            stats_generated[prop_name] = dict(
                label=prop_label,
                values=property_range_calculated,
            )

        logger.debug('Stats ranges calculated: {}'.format(json.dumps(stats_generated, indent=3)))
        return stats_generated        


    def __search_pilot_names(self):
        stats_search_path = 'data[*].flight_info.pilot_name'
        return jmespath.search(stats_search_path, self.stats)
     
    def __search_stat_values(self, property_name, stat_name):
        stats_search_path = 'data[*].flight_stats.{property}.{stat_name}'
        stats_search_path = stats_search_path.format(property=property_name, stat_name=stat_name)
        return jmespath.search(stats_search_path, self.stats)

    def __search_flight_ids(self):
        stats_search_path = 'data[*].flight_info.flight_id'
        return jmespath.search(stats_search_path, self.stats)
    
    def __search_flight_dates(self):
        stats_search_path = 'data[*].flight_info.flight_date'
        return jmespath.search(stats_search_path, self.stats)

    def __search_flight_descriptor(self):
        pilot_names = self.__search_pilot_names()
        flight_ids = self.__search_flight_ids()
        flight_dates= self.__search_flight_dates()

        flight_descriptor = []
        for i in range(len(pilot_names)):

            tmp = '{}; {}; {}'.format(flight_ids[i], pilot_names[i], flight_dates[i])
            flight_descriptor.append(tmp)
        # flight_descriptor = ['{}; {}; {}'.format(flight_id, pilot_name, flight_date) 
        #     for flight_id, pilot_name in zip(flight_ids, pilot_names)]

        return flight_descriptor

    def __search_range_base(self, property_name, range_type):
        stats_search_path = 'data[*].flight_stats.{property}.{range_type}'
        stats_search_path = stats_search_path.format(
            property=property_name,
            range_type=range_type
        )
        return jmespath.search(stats_search_path, self.stats)

    def __search_range_count_values(self, property_name):
        return self.__search_range_base(property_name, 'range_count_values')

    def __search_range_count_weighted_values(self, property_name):
        return self.__search_range_base(property_name, 'range_count_weighted_values')

    def __search_range_mean_values(self, property_name):
        return self.__search_range_base(property_name, 'range_mean_values')

    def __search_property_names(self):
        prop_names = [prop_def.get('property') for prop_def in self.STATS_DEFINITION ]
        return prop_names







