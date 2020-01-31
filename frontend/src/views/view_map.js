import React from 'react';
import styled from 'styled-components';
import ViewBase from './view_base.js';

// import Loading from '../items/loading.js';
import MapContainer from '../components/map_container.js';
import MapMenu from '../components/map_menu.js';
import MapDrawer from '../tools/map_drawer.js';
import MapLeaflet from '../tools/map_leaflet.js';


const GqlQuery = `
query ($pks: [Int]) {
  flights(pks: $pks) {
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
        lat
        lng
      }
    }
  }
}
`;


class ViewMap extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   reload: 0
    // }
  }

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
    this.fetchFlights(GqlQuery, { 'pks': [1, 2] });
    // this.fetchFlights(GqlQuery, { 'pks': this.props.flightsIds });
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
    this.setState({
      flights: flights,
      renderReady: true});
  }

  handleMenu(actionKey, flight) {
    this.mapDrawer.toggleTrackVisible(flight);
    // this.mapDrawer.removeTrack('');
  }

  renderReady() {
    const flights = this.state.flights;
    return (
      <MapMenu 
        flights={flights} 
        onClick={this.handleMenu.bind(this)}
      />
    )
  }
}

export default ViewMap;