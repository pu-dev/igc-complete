import React from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Config from '../../config.js';

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;
    // return <Wrapper width="100" height="420px" id="map" />


class IGC {
  /**
   * Parse string representation for latitude and longitude.
   * @param {string} lat Latitude.
   * @param {string} lng Longitude.
   * @return {array} Array of numeric representation of latitude and longitude.
   */
  static parseLatLong(lat, lng) {
    var latitude;

    latitude = parseFloat(lat.substring(0, 2));
    latitude += parseFloat(lat.substring(2, 7)) / 60000.0;

    if (lat.charAt(7) === 'S') {
        latitude = -latitude;
    }

        
    var longitude;

    longitude = parseFloat(lng.substring(0, 3));
    longitude += parseFloat(lng.substring(3, 8)) / 60000.0;

    if (lng.charAt(8) === 'W') {
        longitude = -longitude;
    }

    return [latitude, longitude];
  }  
}


class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: null
    };
  }

  createMap() {
   if (typeof this.map != 'undefined') {
      this.map.remove()
    }

    this.map = L.map('map', {
      center: [58, 16],
      zoom: 14,
      zoomControl: false
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      detectRetina: true,
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoicHVyYmFuc2tpNzciLCJhIjoiY2p6eWxoZXFrMTJ3czNkcTlseDFkc2F5YSJ9.disndnZW969IhepNVg6fhA'
    }).addTo(this.map);
  }

  componentDidMount() {
    this.fetchFlight();
  }

  fetchFlight() {
    fetch(Config.url.flight(this.props.flight_id))
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
    this.createMap()

    const fixes = this.state.flight.fixes;

    var lat_lng = [];
    for (var fix of fixes) {
      lat_lng.push(IGC.parseLatLong(fix.lat, fix.lng))
    }
    this.drawTrack(lat_lng);
  }

  componentDidUpdate(prevProps) {
    const flight_id = this.props.flight_id;
    if (flight_id !== prevProps.flight_id) {
      this.fetchFlight();
    }
  }

  drawTrack(track) {
    var polyline = L.polyline(track, {
      color: 'red',
      weight: 1.5,
      opacity: 1,
    });

    polyline.addTo(this.map)
    this.map.fitBounds(polyline.getBounds());

        
  }


  render() {
    return <Wrapper width="100" height="420px" id="map" />
  }

}

export default Map;