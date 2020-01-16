import React from 'react';
import logo from './logo.svg';
import './app.css';

import UI from './components/ui.js'
import Flights from './components/flights.js'
import Map from './components/map.js'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFlightChange = this.handleFlightChange.bind(this);

  }

  handleFlightChange(flight_id) {
    console.log("aspps "+flight_id)
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

            />
          }

        >


        </UI>
      </React.Fragment>
    )
  }
}


export default App;
