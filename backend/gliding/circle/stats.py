import jmespath
import json
import logging
import math

from gliding.circle.circle import Circle
from .stats_definitions import STATS_DEFINITION

logger = logging.getLogger(__name__)


class StatsCalculator:
    FLOAT_PRECISION = 2

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
        
        for stats_def in STATS_DEFINITION:
            property_stat_ranges = stats_def.get('range')
            circle_property = stats_def.get('property')
            display_text = stats_def.get('display_text')

            meta[circle_property] = dict(
                range_def=property_stat_ranges,
                display_text=display_text
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

            for stats_def in STATS_DEFINITION:
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


class StatsDisplayer:
    LABELS = dict(
        stats_mean=dict(
            info="Minimum, average and maximum.",
            diameter_calculated=dict(
                info="Mininum, average and maximum circle diameter among all circles.",
                info_long="",
                x_axis_legend="",
                y_axis_legend="circle diameter"
            ),
            vario_average=dict(
                info="Infor for diameterd",
                sub="bong",
                x_axis_legend="mean",
                y_axis_legend="mean"
            ),
        ),

        stats_ranges_count=dict(
            info="Value distribution.",
            diameter_calculated=dict(
                info="Number of circles with diameters within a specific diameter range.",
                info_long=(
                    "If circle diameter is within "
                    "specific diameter range (X axis), value for this range "
                    "(Y axis) is increased by one. "
                ),
                x_axis_legend="circle diameter ranges (meters)",
                y_axis_legend="circles diameters count"
            ),
            vario_average=dict(
                info="Infor for diameterd",
                sub="bong",
                x_axis_legend="mean",

                y_axis_legend="mean"
            ),
        ),

        stats_ranges_count_weighted=dict(
            info="Weighted value distribution.",
            diameter_calculated=dict(
                info="Percentage of all circles with diameters within a specific diameter range.",
                info_long=(
                    "If circle diameter is within "
                    "specific diameter range (X axis), value for this range "
                    "is increased by one. Then for each range, "
                    "amount of circles from that range is devided by the "
                    "total amount of circles, and multiply by 100 (Y axis)."
                ),
                x_axis_legend="circle diameter ranges (meters)",
                y_axis_legend="circle diameters percentage"
            ),
            vario_average=dict(
                info="Infor for diameterd",
                sub="bong",
                x_axis_legend="mean",
                y_axis_legend="mean"
            ),
        ),

        stats_ranges_mean_value=dict(
            info="Mean value distribution.",
            diameter_calculated=dict(
                info="Average value of a circle diameter within a specific range.",
                info_long=(
                    "For each circle, find range (Y axis) which matches circle diamater. "
                    "Then add value of circle diamater to the value of the "
                    "current value of the found range. Then for each range, devide "
                    "its value by the amount circles which matched this range. "
                ),
                x_axis_legend="circle diameter ranges (meters)",
                y_axis_legend="circle diameter mean value (in meters)"
            ),
            vario_average=dict(
                info="Infor for diameterd",
                sub="bong",
                x_axis_legend="mean",
                y_axis_legend="mean"
            ),

        )
    )

    def __init__(self, stats):
        self.stats = stats

    def __get_property_labels(self):

        prop_names = [None] * len(STATS_DEFINITION)
        prop_display_texts = [None] * len(STATS_DEFINITION)

        for i in range(len(STATS_DEFINITION)):
            prop_def = STATS_DEFINITION[i]
            prop_names[i] = prop_def.get('property')
            prop_display_texts[i] = prop_def.get('display_text')

        return dict(
            names=prop_names,
            display_texts=prop_display_texts)

    @property
    def labels(self):
        labels = dict(
            properties=self.__get_property_labels()
        )
        labels.update(self.LABELS)
        return labels

    @property
    def flight_descriptor(self):
        return self.__search_flight_descriptor()

    @property
    def stats_mean(self):
        stats_data = self.stats
        stats_generated = dict()
        
        for prop_def in STATS_DEFINITION:

            prop_stats = []
            prop_name = prop_def.get('property')
            prop_label = prop_def.get('label_stats_mean')

            stats_generated[prop_name] = dict(
                label=prop_label,
                values=prop_stats,
            )

            for stat_name in ('min', 'average', 'max'):
                stat_values = self.__search_stat_values(prop_name, stat_name)

                stat = dict(zip(self.flight_descriptor, stat_values))
                stat['id'] =  stat_name

                prop_stats.append(stat)

        return stats_generated
    
    @property
    def stats_ranges_count(self):
        return self.__stats_ranges_base(
            self.__search_range_count_values
        )

    @property
    def stats_ranges_count_weighted(self):
        return self.__stats_ranges_base(
            self.__search_range_count_weighted_values
        )

    @property
    def stats_ranges_mean_values(self):
        return self.__stats_ranges_base(
            self.__search_range_mean_values
        )

    def __stats_ranges_base(self, get_range_fn):
        def get_range_description(ind):
            range_label = None
            if ind == 0:
                range_label = "x <= {}".format(range_def[ind])
            elif ind < len(range_value) - 1:
                range_label = "{} < x <= {}".format(
                range_def[ind-1], range_def[ind])
            else:
                range_label = "x > {}".format(range_def[ind-1])

            return range_label

        stats_data = self.stats
        stats_generated = dict()

        for prop_def in STATS_DEFINITION:

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
                        property_range_calculated[j].update({
                            self.flight_descriptor[i]: value
                        })
                    else:
                        property_range_calculated[j] = {
                            'id':  get_range_description(j),
                            self.flight_descriptor[i]: value
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
            tmp = '{}____{}____{}'.format(flight_ids[i], pilot_names[i], flight_dates[i])
            flight_descriptor.append(tmp)

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

    # def __search_property_display_text(self, property_name):
        # return self.stats.get('meta').get(property_name).get('display_text')


class Stats:
    def __init__(self, owned_circles):
        self.__stats = StatsCalculator(owned_circles).stats
        self.__displayer = StatsDisplayer(self.__stats)
        # print(json.dumps(self.__stats, indent=3))

    @property
    def stats_for_graphs(self):
        # print(self.__displayer.meta)
            # stats_mean=
            # )
        return dict(
            labels=self.__displayer.labels,
            stats_series_keys=self.__displayer.flight_descriptor,
            stats_mean=self.__displayer.stats_mean,
            stats_ranges_count=self.__displayer.stats_ranges_count,
            stats_ranges_count_weighted=self.__displayer.stats_ranges_count_weighted,
            stats_ranges_mean_value=self.__displayer.stats_ranges_mean_values,
        )

