
class Circle:
    def __init__(self, fixes):
        self.__fixes = fixes

    @property
    def dict(self):
        out = []

        for f in self.__fixes:
            out.append(f.dict)

        return out