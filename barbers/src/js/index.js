const App = App || {};

App.init = function() {
  this.apiUrl = "http://localhost:3000/api";
  this.$main  = $("main");
  this.eventListeners();
};

App.eventListeners = function() {
  $("#loginLink").on("click", this.login.bind(this));
  $(".register").on("click", this.register.bind(this));
  $(".login").on("click", this.login.bind(this));
  $(".logout").on("click", this.logout.bind(this));
  $(".mapSetup").on("click", this.mapSetup.bind(this));
  $(".homePage").on("click", this.homePage.bind(this));
  $(".allBarbers").on("click", this.allBarbers.bind(this));
  $(".editorialPage").on("click", this.editorialPage.bind(this));
  $(".usersIndex").on("click", this.usersIndex.bind(this));
  this.$main.on("submit", "form", this.handleForm);
  $('.modal').on('show.bs.modal', this.showBarberModal);
  $("#loginLink").on("click", this.login.bind(this));

  if(this.getToken()){
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.showBarberModal = function() {
  let button = $(event.target);
  let modal  = $(this);
  let id     = button.data("id");

  App.ajaxRequest(`${App.apiUrl}/barbers/${id}`, "GET", null, (data) => {
    let barber = data.barber;
    modal.find('.modal-title').text(barber.name);
    modal.find('.modal-body').html(`<p>${barber.description}</p>`);
  });
};

App.loggedInState = function() {
  $(".loggedOut").hide();
  $(".loggedIn").show();

  this.homePage();
};

App.mapSetup = function(){
  this.$main.html(`<div id="map-canvas"></div>`);
  let canvas = document.getElementById('map-canvas');

  let mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.506178,-0.088369),
    styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
  };
  this.map = new google.maps.Map(canvas, mapOptions);
  this.getBarbers(this.loopThroughBarbers);
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

App.getBarbers = function(callback){
  return this.ajaxRequest(`${this.apiUrl}/barbers`, "GET", null, callback);
};

App.loopThroughBarbers = function(data) {
  console.log("loopThroughBarbers", data.barbers);
  return $.each(data.barbers, App.createMarkerForBarber);
};

App.createMarkerForBarber = function(index, barber) {
  let latlng = new google.maps.LatLng(barber.lat, barber.lng);

  var icon = {
    url: "/images/pin-head.png",
    scaledSize: new google.maps.Size(35, 49),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
  };

  let marker = new google.maps.Marker({
    position: latlng,
    map:      App.map,
    icon:     icon
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
        <img id="chair" src="images/chair.jpg">
        `);
      };

      App.editorialPage = function() {
        event.preventDefault();
        this.$main.html(`
          <div id="editorial-container" class="container">
          <div class="row">
          <div class="col-md-4">
          <img id="quote" src="images/quote.jpg">
          </div>
          <div class="col-md-4">
          <div class="card">
          <img id="beardcare" class="card-img-top one" id="" src="images/beardcare.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">Beard care 101</h4>
          <a href="#">Read More...</a>
          </div>
          </div>
          </div>
          <div class="col-md-4">
          <img id="brushes" src="images/brushes.jpg">
          </div>
          </div>
          </div>
          <div class="container">
          <div class="row">
          <div class="col-md-4">
          <div class="card">
          <img id="tomford" class="card-img-top two" src="images/tomford.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">What a man should own...according to Tom Ford</h4>
          <a href="#">Read More...</a>
          </div>
          </div>
          </div>
          <div class="col-md-4">
          <img id="logo" src="images/logo.jpg">
          </div>
          <div class="col-md-4">
          <div class="card">
          <img id="pocketsquare" class="card-img-top one" src="images/pocketsquare.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">How to wear a pocket-square</h4>
          <a href="#">Read More...</a>
          </div>
          </div>
          </div>
          </div>
          </div>
          <div class="container">
          <div class="row">
          <div class="col-md-4">
          <img id="bearded" src="images/bearded.jpg">
          </div>
          <div class="col-md-4">
          <img id="wallbrushes" src="images/wallbrushes.jpg">
          </div>
          <div class="col-md-4">
          <div class="card">
          <img id="bartender" class="card-img-top two" src="images/bartender.jpg" alt="Card image cap">
          <div class="card-block">
          <h4 class="card-title">The best Whiskey Cocktails</h4>
          <a href="#">Read More...</a>
          </div>
          </div>
          </div>
          </div>
          </div>
          <div class="container">
          <div class="row">
          <div class="col-md-4">
          </div>
          <div class="card">
          <div class="card-block">
          <h4 class="card-title">Cocktails to impress</h4>
          <a href="#">Read More...</a>
          </div>
          </div>
          </div>
          </div>
          `);
        };

        App.allBarbers = function() {
          event.preventDefault();
          // getBarbers();
          this.getBarbers((data) => {
            this.$main.html(`
              <h1>All Barbers</h1>
              <ul></ul>
              `);

              let $ul = this.$main.find("ul");

              $.each(data.barbers, (i, barber) => {
                $ul.append(`
                  <li><a href="#" data-toggle="modal" data-target=".modal" data-id="${barber._id}"><img src="${barber.image}"</a></li>`);
                });
              });
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
