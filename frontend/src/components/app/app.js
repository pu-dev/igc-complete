import React from 'react';
// import logo from './logo.svg';
import './app.css';

import Flights from '../flights/flights.js'
import FlightView from '../../views/view_flight.js';

import ViewGraph from '../../views/view_graph.js';


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


    // Bind clicks
    this.clickOnViewGraphStats = this.clickOnViewGraphStats.bind(this);

    this.state = {
      flightId: 4,
      view: Views.GRAPH_STATS
    }
  }


  clickOnViewGraphStats(flightId) {
    this.setState({
      flightId: flightId,
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

    const viewFlights = () => {
      return <Flights onFlightChange={this.clickOnViewGraphStats}/>;
    };

    const viewFlightMap = () => {
      return <FlightView
        flightId={this.state.flightId}
        onBackClick={this.handleMapBackClick}
      />;
    };

    const viewGraphStats = () => {
      return <ViewGraph
        flightId={this.state.flightId}

      />
    };


    var viewsMap = new Map();
    viewsMap.set(Views.FLIGHTS, viewFlights.bind(this));
    viewsMap.set(Views.MAP, viewFlightMap.bind(this));
    viewsMap.set(Views.GRAPH_STATS, viewGraphStats.bind(this));



    var renderFn = viewsMap.get(this.state.view);
    return renderFn();

  }

  render() {
    return this.displayView();
  }
}


export default App;
