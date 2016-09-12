"use strict";

var googleMap = googleMap || {};

googleMap.api_url = "http://localhost:3000/api";

googleMap.init = function () {
  this.mapSetup();
};

googleMap.mapSetup = function () {
  var canvas = document.getElementById("map-canvas");
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.506178, -0.088369),
    mapTypeId: google.maps.mapTypeId.ROADMAP
  };
  this.map = new goole.maps.Map(canvas, mapOptions);
};

$(googleMap.init.bind(googleMap));