var s = '5125209N';



function parseLatLong(lat, lng) {
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

console.log(parseLatLong(s, s))