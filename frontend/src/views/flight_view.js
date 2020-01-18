import React from 'react';
import Map from '../components/map/map.js'
import Button from '../components/items/button.js';
import Config from '../config.js';

import Stats from '../components/stats.js';

class FlightView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: null
    };
  }

  componentDidMount() {
    this.fetchFlight();
  }


  fetchFlight() {
    // fetch(Config.url.flight(this.props.flight_id))
    fetch(Config.url.flightAnalysis(this.props.flight_id))
      .then(res => res.json())
      .then((data) => {
        this.setState({flight: data});
        this.flightDidLoad();
      })
      .catch(function(error){
        console.error('Error while feching notes: ', error)
      });
  }

  flightDidLoad() {
    // this.createMap();


    // (() => {
    //   const fixes = this.state.flight.fixes;
    //   var lat_lng = [];
  
    //   for (var fix of fixes) {
    //     lat_lng.push([fix.lat, fix.lng])
    //   }

    //   this.drawTrack(lat_lng);
    // })();

    // (() => {
    //   const circles = this.state.flight.circles;
     
    //   var i = 0
    //   for (var cirlce of circles) {
    //     var lat_lng = [];
    //     for (var fix of cirlce.fixes) {
    //       lat_lng.push([fix.lat, fix.lng])
    //     }
    //     if (i==0) {
    //       this.drawTrack(lat_lng, 'green', false);
    //       i=1
    //     }
    //     else {
    //      this.drawTrack(lat_lng, 'yellow', false); 
    //     }
    //   }

    // })();
  }

  render() {
    const flight = this.state.flight;

    if (flight == null) {
      return <div>loading</div>;
    }

    return (
      <div>
        
        <Map
          flight_id={this.props.flight_id}
        />

        <Button onClick={this.props.onBackClick}>
          Back
        </Button>

        <Stats
          stats={flight.stats}

        />

      </div>
    )
  }
}

export default FlightView;