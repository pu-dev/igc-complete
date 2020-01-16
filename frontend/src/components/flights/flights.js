import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  color: palevioletred;
  font-size: 0.75em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


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
    return (
      <React.Fragment>
        <Button
          onClick={this.handleClick}
        >
          {this.props.flight.date} {this.props.flight.pilot} {this.props.flight.glider_id} {this.props.flight.glider_type}
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
    fetch("http://localhost:7000/api/1.0/flights/")
      .then(res => res.json())
      .then((data) => {
          console.log(data)
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
