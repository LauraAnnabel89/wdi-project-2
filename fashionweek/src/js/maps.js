const googleMap = googleMap || {};

googleMap.mapSetup = function() {
  let canvas = document.getElementById("map-canvas");
  let mapOptions = {
    zoom:       13,
    center:     new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId:  google.maps.mapTypeId.ROADMAP
  };
  this.map = new google.maps.Maps(canvas, mapOptions);
};

$(googleMap.mapSetup.bind(googleMap));
