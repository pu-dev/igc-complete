import React from 'react';
import ViewBase from './view_base.js';
import FlightsList from '../components/flights_list.js';
import './view_flight.css';

const GqlQuery = `
query {
  flights {
    id
    pilot
    date
    gliderId
    gliderType
    stats {
      fixesCount
    }
  }
}`;


class ViewFlights extends ViewBase {
  componentDidMount() {
    this.fetchFlights(GqlQuery);
  }

  handleFlightsSelected(ids) {
    this.props.onFlightsSelected(ids);
  }

  flightsDidLoad(flights) {
    this.setState({
      flights: flights,
      renderReady: true
    });
  }

  renderReady() {
    const flights = this.state.flights;

    return (
      <div className="flights-list-cont">
          <FlightsList 
            flights={flights} 
            handleFlightsSelected={this.handleFlightsSelected.bind(this)}
          />
      </div>
    )
  }
}


export default ViewFlights;

