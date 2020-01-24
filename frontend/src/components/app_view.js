const AppView = Object.freeze({
  
  FLIGHTS: "#flights_list",
  ANALYSIS: "#flights_analysis",
  MAP: "#flights_map",

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
