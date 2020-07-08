import React from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ViewBase from '../../views/view_base.js';

import Loading from '../items/loading.js';

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
  }
}
`;

class MapLeaflet {



}

class Map extends ViewBase {
  constructor(props) {
    super(props);

    console.log(this.props.flightsIds)
    this.state = {
      flights: null, width: 0, height: 0
    };
      
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

  }


componentDidMount() {
  this.createMap();

  // return;
  this.fetchFlights(GqlQuery, { 'pks': this.props.flightsIds });
  // this.updateWindowDimensions();
}

componentWillUnmount() {
  window.removeEventListener('resize', this.updateWindowDimensions);
}

updateWindowDimensions() {
  this.setState({ 
    width: window.innerWidth, 
    height: window.innerHeight 
  });

  // if (this.map != null ) {
    // this.flightsDidLoad(this.state.flights);
  // }
}


createMap() {
 // if (typeof this.map != 'undefined') {
    // this.map.remove()
  // }

  this.map = L.map('map', {
    center: [58, 16],
    zoom: 14,
    zoomControl: false
  });

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', 
  {
    detectRetina: true,
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicHVyYmFuc2tpNzciLCJhIjoiY2p6eWxoZXFrMTJ3czNkcTlseDFkc2F5YSJ9.disndnZW969IhepNVg6fhA'
  }).addTo(this.map);
}

// drawTrack() {
// 
// }

flightsDidLoad(flights) {

  console.log(flights)
  // this.createMap();

//   // console.log(this.state.flights);
//   (() => {
    const fixes = flights[0].fixes;

    var mx = 1;
    var mn = 1/0;

    const colors = ['red', 'green', 'yellow', 'blue'];
    // for (var i=1; i< 2300; i++) {
    for (let i=0; i<flights.length; i++) {
      const fixes = flights[i].fixes;
      const color = colors[i];
      let lat_lng = [];

      for (var fix of fixes) {      
        lat_lng.push([fix.fLat, fix.fLng])
      }
      this.drawTrack(lat_lng, color);
    }
    // return;
    this.flights = flights;
    // this.setState({flights: flights});
  }

  componentDidUpdate(prevProps) {
    // const flight_id = this.props.flight_id;
    // if (flight_id !== prevProps.flight_id) {
      // this.fetchFlight();
    // }
  }

  drawAltTrack(track, alt) {
    // console.log(track, alt)
    var polyline = L.polyline(track, {
      color: 'red',
      weight: 0.0008*alt,
      opacity: 1,
    });

    polyline.addTo(this.map)
    // if (center_to_track) {
      this.map.fitBounds(polyline.getBounds());
    // }
  }

  drawTrack(track, color='red', center_to_track=true) {
    console.log('draw track')
    var polyline = L.polyline(track, {
      color: color,
      weight: 0.85,
      opacity: 1,
    });

    polyline.addTo(this.map)
    if (center_to_track) {
      this.map.fitBounds(polyline.getBounds());
    }
  }


mapRender() {
  const Wrapper = styled.div`
  width: 100%;
  height: ${this.state.height-150}px;

`;

    return <Wrapper id="map" />
}

render() {
  console.log("render")
   const Wrapper = styled.div`
  width: 100%;
  height: 500px;

`;
  return <Wrapper id="map" />
    // }

    // return this.renderReady();
  }




  renderReady() {
    console.log('render ready')

const Wrapper = styled.div`
  width: 100%;
  height: ${this.state.height-150}px;

`;
      const map = this.mapRender();


    return {map}
      
  }

}

export default Map;