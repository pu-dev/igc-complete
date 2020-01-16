import React from 'react';
// import logo from './logo.svg';
import './app.css';

import UI from '../ui/ui.js'
import Flights from '../flights/flights.js'
import Map from '../map/map.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFlightChange = this.handleFlightChange.bind(this);
    
    this.state = {
      flight_id: null
    }
  }

  handleFlightChange(flight_id) {
    this.setState({flight_id: flight_id});
  }

  render() {
    return (
      <React.Fragment>
        <UI
          flights={
            <Flights 
              onFlightChange={this.handleFlightChange}
            />
          }

          map={
            <Map
              flight_id={this.state.flight_id}
            />
          }

        />
      </React.Fragment>
    )
  }
}


export default App;
