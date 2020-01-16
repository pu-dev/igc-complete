import logging
import re

class IGCPart:
    """
    Base class for all classes which represents certain IGC file sections. 
    Example of derived classes: Header, Track.
    """
    def add_record(self, record):
        raise('Implement me!')


class Header(IGCPart):
    """
    Composes IGC header out of IGC H-records.
    """

    logger = logging.getLogger(__name__)


    attr_mnemonic = {
        'DTE' : 'date',
        'PLT' : 'pilot',
        'GID' : 'glider_id',
        'GTY' : 'glider_type',
        'CCL' : 'competition_class',
        'CID' : 'competition_id',
        'FTY' : 'logger_type',
    }

    def __init__(self):
        self.attr_value = {}


    def __getattr__(self, name):
        if name in self.attr_mnemonic.values():
            return self.attr_value.get(name)
        raise AttributeError(name)


    def __setattr__(self, name, value):
        if name in self.attr_mnemonic.values():
            # post process
            # might migrate to something smarter if more will come
            if name == 'date':
                value = '20{}-{}-{}'.format(value[4:6], value[2:4], value[0:2])
            self.attr_value[name] = value
        else:
            super().__setattr__(name, value)
        

    def add_record(self, record):
        mnemonic = record[2:5]
        if mnemonic not in self.attr_mnemonic:
            self.logger.warning(
                "no mapping for mnemonic: {}, "
                "raw record: {}".format(mnemonic, record))
            return

        pattern = re.compile(r'H(?P<source>[A-Z])(?P<mnemonic>[A-Z]{3}).*:(?P<value>[\d\w -]+)')
        matched = pattern.match(record)
        if matched is None:
            self.logger.warning(
                "Found mnemonic: {},"
                "but failed to process raw record: {}".format(mnemonic, record))
            return

        attr_name = self.attr_mnemonic.get(mnemonic)
        attr_value = matched.group('value')
        self.__setattr__(attr_name, attr_value)


    @property
    def data(self):
        return {
            x : self.attr_value.get(x) for x in self.attr_mnemonic.values()
        }


    def __str__(self):
        out = (
            '{} : {}'.format(x, self.attr_value.get(x)) 
            for x in self.attr_mnemonic.values()
        )
        return '; '.join(out)


class Fix:
    """
    Simple IGC Fix data storage class.
    """
    def __init__(self, time, lat, lng, valid, pressuer_alt, 
        gps_alt = None, fix_accurancy = None, engine_rpm = None):

        self.time = '{}:{}:{}'.format(time[0:2], time[2:4], time[4:6])
        self.lat = lat
        self.lng = lng
        self.valid = valid
        self.pressuer_alt = pressuer_alt
        self.gps_alt = gps_alt
        self.fix_accurancy = fix_accurancy
        self.engine_rpm = engine_rpm


    def data(self):

        display_fields = ('time', 'lat', 'lng', 'valid', 'pressuer_alt', 'gps_alt')
        return {
            x : getattr(self, x) for x in display_fields
        }

    def __str__(self):

        display_fields = ('time', 'lat', 'lng', 'valid', 'pressuer_alt', 'gps_alt')
        out = (
            '{} : {}'.format(x, getattr(self, x))
            for x in display_fields
        )
        return '; '.join(out)


class Track(IGCPart):
    """
    Composes IGC Track out of IGC B-records.
    """

    def __init__(self):
        self.fix = []

    def add_record(self, record):

        time = record[1:7]
        lat = record[7:15]
        lng = record[15:24]
        valid = record[24:25]
        pressuer_alt = record[25:30]


        gps_alt = None
        fix_accurancy = None

        if len(record) >= 35:
            gps_alt = record[30:35]
       
        if len(record) >= 38:
            fix_accurancy = record[35:38]

        fix = Fix(
            time=time,
            lat=lat,
            lng=lng,
            valid=valid,
            pressuer_alt=pressuer_alt,
            gps_alt=gps_alt,
            fix_accurancy=fix_accurancy)

        self.fix.append(fix)

    @property
    def data(self):
        return [fix.data() for fix in self.fix]

    def __str__(self):
        out = []
        for i in range(10):
            out.append(str(self.fix[i]))

        return '\n'.join(out)


class IGC:
    """
    Class representation of processed IGC data.
    """

    logger = logging.getLogger(__name__)


    def __init__(self, igc_data):
        self.__header = Header()
        self.__track = Track()
        self.__parse(igc_data)

    def __parse(self, igc_data):
        obj_map = {
            'H' : self.header,
            'B' : self.track
        }

        for record in igc_data:
            record = record.decode('ascii')
            record_type = record[0]
               
            if record_type in obj_map:
                obj_map.get(record_type).add_record(record) 
            else:
                self.logger.warning(
                    "Unknown IGC record type: {}, "
                    "raw record: {}".format(record_type, record))

    @property
    def header(self):
        return self.__header

    @property
    def track(self):
        return self.__track
    



# def parse_igc_data(igc_data):
#     igc.Header()
#     igc.Track()

#     obj_map = {
#         'H' : header,
#         'B' : track
#     }

#     for record in igc_data:
#         record = record.decode('ascii')
#         record_type = record[0]
           
#         if record_type in obj_map:
#             obj_map.get(record_type).add_record(record) 
#         else:
#             logger.warning(
#                 "Unknown IGC record type: {}, "
#                 "raw record: {}".format(record_type, record))
