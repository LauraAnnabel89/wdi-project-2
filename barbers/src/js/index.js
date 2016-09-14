const App = App || {};

App.init = function() {
  this.apiUrl = "http://localhost:3000/api";
  this.$main  = $("main");
  this.eventListeners();
};

App.eventListeners = function() {
  $(".register").on("click", this.register.bind(this));
  $(".login").on("click", this.login.bind(this));
  $(".logout").on("click", this.logout.bind(this));
  $(".mapSetup").on("click", this.mapSetup.bind(this));
  $(".homePage").on("click", this.homePage.bind(this));
  $(".allBarbers").on("click", this.allBarbers.bind(this));
  $(".editorialPage").on("click", this.editorialPage.bind(this));
  $(".usersIndex").on("click", this.usersIndex.bind(this));
  this.$main.on("submit", "form", this.handleForm);


  if(this.getToken()){
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.loggedInState = function() {
  $(".loggedOut").hide();
  $(".loggedIn").show();
  this.mapSetup();
  this.allBarbers();
  this.homePage();
  this.editorialPage();
};

App.mapSetup = function(){
  this.$main.html(`<div id="map-canvas"></div>`);
  let canvas = document.getElementById('map-canvas');

  let mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.506178,-0.088369),
    styles: [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": "0"
              },
              {
                  "color": "#000000"
              },
              {
                  "gamma": "1.00"
              },
              {
                  "weight": "0.01"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#fafafa"
              },
              {
                  "weight": "0.01"
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#f2f2f2"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#fafafa"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#ffffff"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              }
          ]
      }
  ]
  };
  this.map = new google.maps.Map(canvas, mapOptions);
  this.getBarbers();
};

App.addBarber = function() {
  console.log(Barber);
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/api/barbers",
    data: $(this).serialize()
  }).done(data => {
    console.log(data.barber);
    googleMap.createMarkerForBarber(null, data.barber);
    $('form').reset().hide();
  });
};

App.getBarbers = function (){
  return this.ajaxRequest(`${this.apiUrl}/barbers`, "GET", null, this.loopThroughBarbers);
};

App.loopThroughBarbers = function(data) {
  console.log("loopThroughBarbers", data.barbers);
  return $.each(data.barbers, App.createMarkerForBarber);
};

App.createMarkerForBarber = function(index, barber) {
  let latlng = new google.maps.LatLng(barber.lat, barber.lng);
  let marker = new google.maps.Marker({
    position: latlng,
    map:      App.map,
    icon: "./images/bmarker.jpg",
    // animation: google.maps.Animation.DROP
  });
  App.addInfoWindow(barber, marker);
};

App.addInfoWindow = function(barber, marker) {
  google.maps.event.addListener(marker, "click", () => {
    if (typeof this.infowindow != "undefined") this.infowindow.close();
    this.infowindow = new google.maps.InfoWindow({
      content: `
      <div id="infowindow">
      <h2>${ barber.name } </h2>
      <img src = ${ barber.image } />
      <p> ${ barber.vibe } </p>
      <a href="${ barber.website}"> ${ barber.website } </a
      </div>
      `});
      this.infowindow.open(this.map, marker);
    });
  };

  App.loggedOutState = function() {
    $(".loggedOut").show();
    $(".loggedIn").hide();
    this.register();
  };

  App.register = function() {
    if (event) event.preventDefault();
    this.$main.html(`
      <h2>Register</h2>
      <form method="post" action="/register">
      <div class="form-group">
      <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
      <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
      </form>`
    );
  };

  App.login = function() {
    event.preventDefault();
    this.$main.html(`
      <h2>Login</h2>
      <form method="post" action="/login">
      <div class="form-group">
      <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
      <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
      </form>
      `);
    };

    App.homePage = function() {
      event.preventDefault();
      this.$main.html(`
        <div id="home">
        <h1>A Cut Above The Rest</h1>
        <img id="chair" src="images/chair.jpg">
        </di>
        `);
        // $("nav").hide();
      };

      App.editorialPage = function() {
        event.preventDefault();
        this.$main.html(`
          <div class="container">
          <div class="row">
          <div class="col-md-4">
          <div class="card">
          <img class="card-img-top" id="" src="..." alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">Beard care 101</h4>
          <a href="#" class="btn btn-primary">Read More...</a>
          </div>
          </div>
          </div>
          <div class="col-md-4">
          <div class="card">
          <img class="card-img-top" src="images/bartender.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">Cocktails to impress</h4>
          <a href="#" class="btn btn-primary">Read More...</a>
          </div>
          </div>
          </div>
          <div class="col-md-4">
          <div class="card">
          <img class="card-img-top" src="images/coats.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">Coats roundup for AW16</h4>
          <a href="#" class="btn btn-primary">Read More...</a>
          </div>
          </div>
          </div>
          <div class="row">
          <div class="col-md-4">
          <img src"">
          <div class="card">
          <img class="card-img-top" src="images/tomford.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">What a man should own...according to Tom Ford</h4>
          <a href="#" class="btn btn-primary">Read More...</a>
          </div>
          </div>
          </div>
          <div class="col-md-4">
          <div class="card">
          <img class="card-img-top" src="..." alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">Where to eat in Dalston</h4>
          <a href="#" class="btn btn-primary">Read More...</a>
          </div>
          </div>
          </div>
          <div class="col-md-4 editorialTwo">
          <div class="card">
          <img class="card-img-top" src="..." alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">How to wear a pocket-square</h4>
          <a href="#" class="btn btn-primary">Read More...</a>
          </div>
          </div>
          </div>
          </div>
          </div>`);
        };

        App.allBarbers = function() {
          event.preventDefault();
          // getBarbers();
          this.$main.html(`
            <h1>All Barbers</h1>
            `);
          };

          App.logout = function() {
            event.preventDefault();
            this.removeToken();
            this.loggedOutState();
          };

          App.usersIndex = function(){
            if (event) event.preventDefault();
            let url = `${this.apiUrl}/users`;
            return this.ajaxRequest(url, "get", null, this.mapSetup.bind(this));
          };


          App.handleForm = function(){
            event.preventDefault();

            let url    = `${App.apiUrl}${$(this).attr("action")}`;
            let method = $(this).attr("method");
            let data   = $(this).serialize();

            return App.ajaxRequest(url, method, data, (data) => {
              console.log(data);
              if (data.token) {
                App.setToken(data.token);
                App.loggedInState();
              }
            });
          };

          App.ajaxRequest = function(url, method, data, callback){
            return $.ajax({
              url,
              method,
              data,
              beforeSend: this.setRequestHeader.bind(this)
            })
            .done(callback)
            .fail(data => {
              console.log(data);
            });
          };

          App.setRequestHeader = function(xhr, settings) {
            return xhr.setRequestHeader("Authorization", `Bearer ${this.getToken()}`);
          };

          App.setToken = function(token){
            return window.localStorage.setItem("token", token);
          };

          App.getToken = function(){
            return window.localStorage.getItem("token");
          };

          App.removeToken = function(){
            return window.localStorage.clear();
          };

          $(App.init.bind(App));
