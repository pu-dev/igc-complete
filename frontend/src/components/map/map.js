import React from 'react';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Config from '../../config.js';
import IGC from '../../igc.js';

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;



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
    this.createMap();


    (() => {
      const fixes = this.state.flight.fixes;
      var lat_lng = [];
  
      for (var fix of fixes) {
        lat_lng.push([fix.lat, fix.lng])
      }

      this.drawTrack(lat_lng);
    })();

    (() => {
      const circles = this.state.flight.circles;
     
      var i = 0
      for (var cirlce of circles) {
        var lat_lng = [];
        for (var fix of cirlce.fixes) {
          lat_lng.push([fix.lat, fix.lng])
        }
        if (i==0) {
          this.drawTrack(lat_lng, 'green', false);
          i=1
        }
        else {
         this.drawTrack(lat_lng, 'yellow', false); 
        }
      }

    })();
  }

  componentDidUpdate(prevProps) {
    const flight_id = this.props.flight_id;
    if (flight_id !== prevProps.flight_id) {
      this.fetchFlight();
    }
  }

  drawTrack(track, color='red', center_to_track=true) {
    var polyline = L.polyline(track, {
      color: color,
      weight: 1.5,
      opacity: 1,
    });

    polyline.addTo(this.map)
    if (center_to_track) {
      this.map.fitBounds(polyline.getBounds());
    }
  }


  render() {
    return <Wrapper width="100" height="120px" id="map" />
  }

}

export default Map;