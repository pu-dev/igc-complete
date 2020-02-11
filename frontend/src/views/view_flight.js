import React from 'react';
import Cache from '../tools/cache.js';
import ViewBase from './view_base.js';
import FlightsList from '../components/flights_list.js';
import './view_flight.css';


class ViewFlights extends ViewBase {

  static CacheItemName = 'flight_list';

  static GqlQuery = `
    query {
      flights (loaded: true) {
        id
        pilot
        date
        gliderId
        gliderType
      }
    }`;

  componentDidMount() {
    if (Cache.has(Cache.__flight_list)) {
      this.flightsReady();
    }
    else {
      this.fetchFlights(ViewFlights.GqlQuery);
    }
  }

  handleFlightsSelected(ids) {
    this.props.onFlightsSelected(ids);
  }

  flightsDidLoad(flights) {
    Cache.set(Cache.__flight_list, flights);
    this.flightsReady();
  }

  flightsReady() {
    this.setState({
      flights: Cache.get(Cache.__flight_list),
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

