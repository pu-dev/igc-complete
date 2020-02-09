import React from 'react';
import ViewBase from './view_base.js';
import MapContainer from '../components/map_container.js';
import MapMenu from '../components/map_menu.js';
import MapDrawer from '../tools/map_drawer.js';
import MapLeaflet from '../tools/map_leaflet.js';

const GqlQuery = `
query ($pks: [Int]) {
  flights(pks: $pks, loaded: true) {
    id
    pilot
    date
    gliderId
    gliderType
    fixes {
      lat
      lng
      fLat
      fLng
    }
    circles {
      fixes {
        id
        lat
        lng
        fLat
        fLng
      }
    }
  }
}
`;


class ViewMap extends React.Component {
  // handleMapContainerSizeChange () {
  //    // To force update on Leaflet map.
  //    this.setState({
  //     reload: this.state.reload+1,
  //   });
  // }

  render() {
    return (
      <React.Fragment>
        <MapReamining
          flightsIds={this.props.flightsIds} />
        <MapContainer />
      </React.Fragment>
    );
  }
}


/** 
 * 
 Seperation is needed as leaflet lib needs <div id='map'>
 all the time in DOM. Updates to state of ViewMap - caused re-rendering
 therefore <div id='map'> was lost
 */

class MapReamining extends ViewBase {
  constructor(props) {
    super(props);
    this.state = {flights:null};
  }

  componentDidMount() {
    // this.fetchFlights(GqlQuery, { 'pks': [1, 2] });
    this.fetchFlights(GqlQuery, { 'pks': this.props.flightsIds });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reload !== this.props.reload && this.state.flights !== null) {
      this.mapDrawer = new MapDrawer(new MapLeaflet());
      this.mapDrawer.drawFlights(this.state.flights);
    }
  }

  flightsDidLoad(flights) {
    this.mapDrawer = new MapDrawer(new MapLeaflet());

    this.mapDrawer.drawFlights(flights);
    // this.mapDrawer.drawFlightsCircles(flights);

    this.setState({
      flights: flights,
      renderReady: true});
  }

  handleMenuClick(actionKey, flight) {
    let actionMap = {};

    actionMap.track_toggle_visible = ( () => {
      this.mapDrawer.toggleFlightVisible(flight);
    });

    actionMap.circles_toggle_visible = ( () => {
      this.mapDrawer.toggleCirclesVisible(flight);
    });

    if (actionKey in actionMap) {
      actionMap[actionKey]();
    }
    else {
      throw(Error(`${actionKey} not defined`));
    }


    // this.mapDrawer.removeTrack('');
  }

  renderReady() {
    const flights = this.state.flights;
    return (
      <MapMenu 
        flights={flights} 
        onClick={this.handleMenuClick.bind(this)}
      />
    )
  }
}

export default ViewMap;