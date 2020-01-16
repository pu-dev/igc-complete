import React from 'react';


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
        <a 
         onClick={this.handleClick}
        >
         
        


        <div>
          {this.props.flight.date}
        </div>
        <div>
          {this.props.flight.pilot}
        </div>
        <div>
          {this.props.flight.glider_id}
        </div>
        <div>
          {this.props.flight.glider_type}
        </div>
        </a>
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
