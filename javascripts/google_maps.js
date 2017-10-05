function initMap() {
  var midStart = { lat: 41.850033, lng: -87.6500523 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: midStart,
    // https://snazzymaps.com/style/2/midnight-commander
    styles: [{ "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 } ] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [ { "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 } ] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#030506" }, { "lightness": 20 } ] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#142534" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#030506" }, { "lightness": 21 } ] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [ { "color": "#142534" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" }, { "lightness": 17 } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "lightness": "23" }, { "weight": "1.34" }, { "visibility": "on" }, { "gamma": "2.45" }, { "saturation": "-65" }, { "color": "#43e025" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#000000" }, { "weight": "5.10" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 18 } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#5a5a5a" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" } ] }, { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [ { "color": "#000000" } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#111111" }, { "lightness": 16 } ] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [ { "color": "#656565" } ] }, { "featureType": "transit", "elementType": "geometry", "stylers": [ { "color": "#087a0e" }, { "lightness": 19 } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#799129" } ] }, { "featureType": "transit.station", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit.station", "elementType": "labels.icon", "stylers": [ { "visibility": "on" }, { "hue": "#00dcff" }, { "saturation": "-15" }, { "lightness": "15" }, { "gamma": "0.57" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#000000" }, { "lightness": 17 } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] } ]
  });

var lineSymbol = {
  path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
  scale: 5,
  strokeColor: '#F6F4FA',
  strokeWeight: 1
};

setInterval(function () {
  let idx = satoriData.length - 1;
  if (satoriData[idx] === undefined) {
    return null;
  }
  var longitude = satoriData[idx].longitude;
  var latitude = satoriData[idx].latitude;
  var longitude2 = satoriData[idx].longitude2;
  var latitude2 = satoriData[idx].latitude2;
  var newCoord = { lat: latitude, lng: longitude };

  var image;
  if (satoriData[idx].attack_type === 'MALWARE') {
    image = './docs/images/lil_malware.png';
  } else if (satoriData[idx].attack_type === 'SMTP') {
    image = './docs/images/smtp.png';
  } else if (satoriData[idx].attack_type === 'DDOS') {
    image = './docs/images/ddos.png';
  } else if (satoriData[idx].attack_type === 'EXPLOIT_KIT') {
    image = './docs/images/exploit_kit.png';
  } else if (satoriData[idx].attack_type === 'TELNET') {
    image = './docs/images/telnet.png';
  } else if (satoriData[idx].attack_type === 'C_AND_C') {
    image = './docs/images/server.png';
  } else if (satoriData[idx].attack_type === 'SSH') {
    image = './docs/images/ssh.png';
  } else {
    image = './docs/images/lil_malware.png';
  }

  var contentString = '<div id=content> ' +
  '<b>Attacker: </b>' + satoriData[idx].attacker + '<br>' +
  '<b>City Origin:</b>' + satoriData[idx].city_origin + '<br>' +
  '<b>City Target: </b>' + satoriData[idx].city_target + '<br>' +
  '<b>Country Target: </b>' + satoriData[idx].country_target + '<br>' +
  '<b>Attack Type: </b>' + satoriData[idx].attack_type +
  '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  var newMarker = new google.maps.Marker({
    position: newCoord,
    map: map,
    icon: image
  });

  newMarker.addListener('click', function() {
    infowindow.open(map, newMarker);
  });

  var line = new google.maps.Polyline({
  path: [{lat: latitude, lng: longitude}, {lat: latitude2, lng: longitude2}],
  icons: [{
    icon: lineSymbol,
    offset: '100%'
  }],
  strokeColor: "#00ff00",
  strokeWeight: 1,
  map: map
});

moveArrow(line);

function moveArrow(line) {
  var count = 0;
  window.setInterval(function() {
    count = (count + 1) % 200;

    var icons = line.get('icons');
    icons[0].offset = (count / 2) + '%';
    line.set('icons', icons);
}, 10);
}

}, 0);
}

window.initMap = initMap;
