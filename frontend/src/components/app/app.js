import React from 'react';
// import logo from './logo.svg';
import './app.css';

import Flights from '../flights/flights.js'
import FlightView from '../../views/flight_view.js';


const Views = Object.freeze({
    FLIGHTS:   Symbol("flights"),
    MAP:  Symbol("map"),
    // GREEN: Symbol("green")
});


class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFlightChange = this.handleFlightChange.bind(this);
    
    this.handleMapBackClick = this.handleMapBackClick.bind(this);

    this.state = {
      flight_id: null,
      view: Views.FLIGHTS
    }
  }

  handleFlightChange(flight_id) {
    this.setState({
      flight_id: flight_id,
      view: Views.MAP});
  }

  handleMapBackClick() {
    this.setState({
      flight_id: null,
      view: Views.FLIGHTS});
  }

  renderFlights() {
    return <Flights onFlightChange={this.handleFlightChange}/>;
  }

  renderFlight() {
    return <FlightView
      flight_id={this.state.flight_id}
      onBackClick={this.handleMapBackClick}
    />;
  }

  render() {
    if (this.state.view == Views.FLIGHTS) {

    return this.renderFlights();
    
  }
  else
  {
    return this.renderFlight();
  }
}

}


export default App;
