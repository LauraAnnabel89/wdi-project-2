const googleMap = googleMap || {};

googleMap.api_url = "http://localhost:3000/api";

googleMap.init = function(){
  this.mapSetup();
  this.eventListeners();
};

googleMap.eventListeners = function () {
  $('main').on('submit', 'form', this.addBarber);
};

googleMap.addBarber = function() {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/api/restaurants",
    data: $(this).serialize()
  }).done(data => {
    console.log(data.barber);
    googleMap.createMarkerForBarber(null, data.barber);
    $('form').reset().hide();
  });
};


googleMap.mapSetup = function() {
 let canvas     = document.getElementById("map-canvas");
 let mapOptions = {
   zoom:      13,
   center:    new google.maps.LatLng(51.506178,-0.088369),
   mapTypeId: google.maps.mapTypeId.ROADMAP
 };
 this.map = new goole.maps.Map(canvas, mapOptions);
 this.getBarbers();
};

googleMap.getBarbers = function() {
  return $.get(`${this.api_url}/barbers`).done(this.loopThroughBarbers.bind(this));
};

googleMap.loopThroughBarbers = function(data) {
  return $.each(data.barbers, this.createMarkerForBarber.bind(this));
};

googleMap.createMarkerForBarber = function(index, barber) {
  let latlng = new google.maps.LatLng(barber.lat, barber.lng);
  let marker = new google.maps.Marker({
    position: latlng,
    map:      this.map,
  });
};

$(googleMap.init.bind(googleMap));

console.log("yo");

const App = App || {};

App.init = function() {
  this.apiUrl = "http://localhost:3000/api";
  this.$main  = $("main");

  $(".register").on("click", this.register.bind(this));
  $(".login").on("click", this.login.bind(this));
  $(".logout").on("click", this.logout.bind(this));
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
