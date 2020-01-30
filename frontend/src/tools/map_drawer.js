const Colors = [
  [
    'red', 
    'darkred', 
    'maroon', 
    'tomato'
  ],
  [
    'blue',
    'darkblue',
    'blueviolet'
  ]
]


class MapDrawer {

  constructor(mapObj) {
    this.map = mapObj;

    this.tmp = 1;
    this.layers = {
      tracks: {

      }
    }
  }

  drawFlights(flights) {

    for (let i=0; i<flights.length; i++) {
      const flight = flights[i]; 
      const fixes = flight.fixes;

      const colorId1 = i % Colors.length;
      const colorId2 = Math.floor(i/Colors.length) % Colors[0].length;

      const color = Colors[colorId1][colorId2];

      let latLng = [];

      for (let fix of fixes) {
        latLng.push([fix.fLat, fix.fLng])
      } 

      let center = false;
      if (i == flights.length-1) {
        center = true;
      }

      this.layers.tracks[flight.id] =
        {
          layer: this.map.drawTrack(latLng, color, center),
          visible: true 
        }
    }
  }


  toggleTrackVisible(flight) {

    let track = this.layers.tracks[flight.id];
    if (track.visible) {
      track.visible = false;
      this.map.removeTrack(track.layer);
    }
    else {
      track.visible = true;
      this.map.addTrack(track.layer);
    }
  }

  removeTrack(flight) {
    // let fId = flight.id;
    this.map.removeTrack(this.draws.tracks[flight.id]);
  }

}


export default MapDrawer;