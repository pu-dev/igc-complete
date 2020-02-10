import React from 'react';
import Cache from '../tools/cache.js';
import ViewBase from './view_base.js';
import FlightsList from '../components/flights_list.js';
import './view_flight.css';

const GqlQuery = `
query {
  flights (loaded: true) {
    id
    pilot
    date
    gliderId
    gliderType
  }
}`;

const CacheItemName = 'flight_list';

class ViewFlights extends ViewBase {
  componentDidMount() {
    if (Cache.has(CacheItemName)) {
      this.flightsReady();
    }
    else {
      this.fetchFlights(GqlQuery);
    }
  }

  handleFlightsSelected(ids) {
    this.props.onFlightsSelected(ids);
  }

  flightsDidLoad(flights) {
    Cache.set(CacheItemName, flights);
    this.flightsReady();
  }

  flightsReady() {
    this.setState({
      flights: Cache.get(CacheItemName),
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

