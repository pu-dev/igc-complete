const AppView = Object.freeze({
  
  FLIGHTS: "#flights_list",
  FLIGHT_UPLOAD: "#flight_upload",
  ANALYSIS: "#flights_analysis",
  MAP: "#flights_map",
  ABOUT: "#about",

  Map: () => {
    var viewMap = new Map();

    var self = {};
    self.addView = function(view, fn) {
      viewMap.set(view, fn);
    }

    self.getView = function(viewId) {
      return viewMap.get(viewId);
    }

    self.renderView = function(viewId) {
      return this.getView(viewId)();
    }

   return self;
  }
});

export default AppView;
