const Colors = [
  // Red
  [
    'red', 
  //   // 'darkred', 
    'maroon', 
    'tomato'
  ],

  // Blue
  [
    'blue',
    'darkblue',
    'blueviolet'
  ],

  // Yellow
  [
    '#00FF00',
    '#228B22',
    '#556B2F'
  ],

  // Purple
  [
    '#FF00FF',
    '#9400D3',
    '4B0082'
  ],

  // Maroon
  [
    '#A52A2A',
    '#D2691E',
    '#800000'
  ]
]


class MapDrawer {

  constructor(mapObj) {
    this.map = mapObj;

    this.tmp = 1;
    this.layers = {
      flights: {},
      circles: {},
    }
  }

  getLayerDef(layer) {
    return     {
      layer: layer,
      visible: true 
    }
  }

  addLayerFlight(layer, flight_id) {
    this.layers.flights[flight_id] = this.getLayerDef(layer);
  }

  addLayerCircle(layer, circle_id, flight_id) {
    this.layers.circles[`${flight_id}__${circle_id}`] = this.getLayerDef(layer);
  }

  drawTrack(fixes, color="red", lineSize, zoomTo=false) {
    let latLng = [];
    for (let fix of fixes) {
      latLng.push([fix.fLat, fix.fLng])
    }

    const track = this.map.drawTrack(latLng, color, lineSize, zoomTo);
    return track;
  }

  drawFlight(flight, color, zoomTo) {
    const lineSize = 2;
    const track = this.drawTrack(flight.fixes, color, lineSize, zoomTo);
    this.addLayerFlight(track, flight.id);
  }

  drawFlights(flights) {
    for (let i=0; i<flights.length; i++) {
      const flight = flights[i]; 

      const colorId1 = i % Colors.length;
      const colorId2 = Math.floor(i/Colors.length) % Colors[0].length;
      const color = Colors[colorId1][colorId2];

      let zoomTo = false;
      if (i === flights.length-1) {
        zoomTo = true;
      }

      this.drawFlight(flight, color, zoomTo);
    }
  }

  drawCircle(circle, flight, color) {
    const track = this.drawTrack(circle.fixes, color);
    // circle.id = 1231
    console.log(circle.id)
    // this.addLayerCircles(track, circle.id, flight.id);

  }

  drawCircles(flight) {
    const circles = flight.circles;

    for (let i=0; i<circles.length; i++) {
      const circle = circles[i]; 
      const colorId1 = i % Colors.length;
      const colorId2 = Math.floor(i/Colors.length) % Colors[0].length;
      const color = Colors[colorId1][colorId2];

      this.drawCircle(circle, flight, color);
    }
  }

  drawFlightsCircles(flights) {
    for (const flight of flights) {
      this.drawCircles(flight);
    }
  }

  toggleFlightVisible(flight) {
    let flightTrack = this.layers.flights[flight.id];
    if (flightTrack.visible) {
      flightTrack.visible = false;
      this.map.removeTrack(flightTrack.layer);
    }
    else {
      flightTrack.visible = true;
      this.map.addTrack(flightTrack.layer);
    }
  }

  toggleCirclesVisible(flight) {
    this.drawCircles(flight)
    // let circlesTrack = this.layers.circles[flight.id];
    // if (flightTrack.visible) {
    //   flightTrack.visible = false;
    //   this.map.removeTrack(flightTrack.layer);
    // }
    // else {
    //   flightTrack.visible = true;
      // this.map.addTrack(flightTrack.layer);
    // }
  }

  // removeTrack(flight) {
  //   this.map.removeTrack(this.draws.flight[flight.id]);
  // }

}


export default MapDrawer;