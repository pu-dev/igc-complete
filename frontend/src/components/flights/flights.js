import React from 'react';
import Config from '../../config.js'
import Button from '../items/button.js'

/*
* Flight
*/

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const flight = this.props.flight;
    this.props.onFlightChange(flight.id);
  }

  render() {
    const flight = this.props.flight;

    return (
      <React.Fragment>
        <Button
          onClick={this.handleClick}
        >
          {flight.id} {flight.date} {flight.pilot} {flight.glider_id} {flight.glider_type}
        </Button>
        <br/>
      </React.Fragment>
    )
  }
}


/*
* FlightList
*/

class FlightList extends React.Component {
  render() {
    const flights = this.props.flights.map((flight) => 
      <Flight 
        key={flight.id} 
        flight={flight}
        onFlightChange={this.props.onFlightChange}
      />
    );

    return (
      <div>
        {flights}
      </div>
    );
  }
}


/*
* Flights
*/

class Flights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }

  fetchFlights() {
    fetch(Config.url.flights())
      .then(res => res.json())
      .then((data) => {
          this.setState({flights: data})
      })
      .catch(function(error){
        console.error('Error while feching notes: ', error)
      })
  }

  componentDidMount() {
    this.fetchFlights();
  }

  render() {
    return (
        <FlightList
          flights={this.state.flights}
          onFlightChange={this.props.onFlightChange}
        />
    )
  }
}

export default Flights;
