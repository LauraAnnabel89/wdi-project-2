"use strict";

// const googleMap = googleMap || {};
//
// console.log("loaded");
//
// googleMap.api_url = "http://localhost:3000/api";
//
// googleMap.init = function(){
//   this.mapSetup();
//   this.eventListeners();
// };
//
// googleMap.eventListeners = function () {
//   $('main').on('submit', 'form', this.addBarber);
// };
//
// googleMap.addBarber = function() {
//   event.preventDefault();
//   $.ajax({
//     method: "POST",
//     url: "http://localhost:3000/api/restaurants",
//     data: $(this).serialize()
//   }).done(data => {
//     console.log(data.barber);
//     googleMap.createMarkerForBarber(null, data.barber);
//     $('form').reset().hide();
//   });
// };
//
//
// googleMap.mapSetup = function() {
//  let canvas     = document.getElementById("map-canvas");
//  let mapOptions = {
//    zoom:      13,
//    center:    new google.maps.LatLng(51.506178,-0.088369),
//    mapTypeId: google.maps.mapTypeId.ROADMAP
//  };
//  this.map = new goole.maps.Map(canvas, mapOptions);
//  this.getBarbers();
// };
//
// googleMap.getBarbers = function() {
//   return $.get(`${this.api_url}/barbers`).done(this.loopThroughBarbers.bind(this));
// };
//
// googleMap.loopThroughBarbers = function(data) {
//   return $.each(data.barbers, this.createMarkerForBarber.bind(this));
// };
//
// googleMap.createMarkerForBarber = function(index, barber) {
//   let latlng = new google.maps.LatLng(barber.lat, barber.lng);
//   let marker = new google.maps.Marker({
//     position: latlng,
//     map:      this.map,
//   });
// };
//
// $(googleMap.init.bind(googleMap));


var App = App || {};

App.init = function () {
  console.log("running");
};

$(App.init.bind(App));