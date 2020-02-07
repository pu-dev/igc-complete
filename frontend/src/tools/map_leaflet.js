import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const MapBoxAccessToken = 'pk.eyJ1IjoicHVyYmFuc2tpNzciLCJhIjoiY2p6eWxoZXFrMTJ3czNkcTlseDFkc2F5YSJ9.disndnZW969IhepNVg6fhA';


class MapLeaflet {
  constructor() {
    this.createMap()
  }

  createMap() {
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
      accessToken: MapBoxAccessToken
    }).addTo(this.map);
  }

  drawTrack(track, color, weight=2, zoomTo=false) {
    let polyline = L.polyline(track, {
      color: color,
      weight: weight,
      opacity: 1,
    });

    let ret = polyline.addTo(this.map)
        console.log(zoomTo)

    if (zoomTo) {
      this.map.fitBounds(polyline.getBounds());
    }
    return ret;
  }

  removeTrack(track) {
    track.remove();
  }

  addTrack(track) {
    track.addTo(this.map);
  }

}


export default MapLeaflet;