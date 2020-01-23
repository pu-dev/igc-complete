import React from 'react';
// import logo from './logo.svg';
import './app.css';

import Flights from '../flights/flights.js'
import FlightView from '../../views/view_flight.js';

import ViewGraph from '../../views/view_graph.js';
import ViewFlights from '../../views/view_flight.js';

import 'bootstrap/dist/css/bootstrap.min.css';

const Views = Object.freeze({
    FLIGHTS:   Symbol("flights"),
    MAP:  Symbol("map"),
    GRAPH_STATS: Symbol("graph_stats"),
    // GREEN: Symbol("green")
});






class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFlightChange = this.handleFlightChange.bind(this);
    
    this.handleMapBackClick = this.handleMapBackClick.bind(this);

    this.handleCompareFlights = this.handleCompareFlights.bind(this);

    // Bind clicks
    // this.onCompareFlights = this.onCompareFlights.bind(this);

    this.constructViewMap();

    this.state = {
      flightId: 4,
      view: Views.FLIGHTS
    }

  }

  constructViewMap() {


    const viewFlights = () => {
      return <ViewFlights
        handleCompareFlights={this.handleCompareFlights}
      />;
    };


    const viewFlightMap = () => {
      return <FlightView
        flightId={this.state.flightId}
        onBackClick={this.handleMapBackClick}
      />;
    };

    const viewGraphStats = () => {
      return <ViewGraph
        flightsIds={this.flighstIds}

      />
    };

    this.viewMap = ViewsMap(this);
    this.viewMap.addView(Views.FLIGHTS, viewFlights);
    this.viewMap.addView(Views.MAP, viewFlightMap);
    this.viewMap.addView(Views.GRAPH_STATS, viewGraphStats);
  }


  handleCompareFlights(flightsIds) {
    console.log(flightsIds)
    this.flighstIds = flightsIds;
    this.setState({
      // flightId: flightId,
      view: Views.GRAPH_STATS});
  }

  handleFlightChange(flightId) {
    this.setState({
      flightId: flightId,
      view: Views.MAP});
  }

  handleMapBackClick() {
    this.setState({
      flightId: null,
      view: Views.FLIGHTS});
  }

  displayView() {



    // var viewsMap = new Map();
    // viewsMap.set(Views.FLIGHTS, viewFlights.bind(this));
    // viewsMap.set(Views.MAP, viewFlightMap.bind(this));
    // viewsMap.set(Views.GRAPH_STATS, viewGraphStats.bind(this));



    // var renderFn = viewsMap.get(this.state.view);
    // return renderFn();

  }

  render() {
    const viewMap = this.viewMap;
    const view = this.state.view;

    // return this.viewMap.render(this.state.view);
    return viewMap.renderView(view);
  }
}


const ViewsMap = (cls) => {
  var viewMap = new Map();

  var self = {};
  self.addView = function(view, fn) {
    viewMap.set(view, fn.bind(cls));
  }

  self.getView = function(viewId) {
    return viewMap.get(viewId);
  }

  self.renderView = function(viewId) {
        return self.getView(viewId)();
      }

      return self;
    }

export default App;
