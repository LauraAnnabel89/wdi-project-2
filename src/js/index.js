const App = App || {};

App.init = function() {
  this.apiUrl = window.location.origin;
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
  $('.modal').on('show.bs.modal', this.showBarberModal);

  if(this.getToken()){
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

App.showBarberModal = function() {
  let button = $(event.target).parent();
  let modal  = $(this);
  let id     = button.data("id");

App.ajaxRequest(`${App.apiUrl}/barbers/${id}`, "GET", null, (data) => {
  let barber = data.barber;
  modal.find('.modal-title').text(barber.name);
  modal.find('.modal-body').html(`<p>${barber.vibe}</p>
    <img id="barberslist" src="${barber.image}">
    <p>${barber.description}</p>
    <p>${barber.otherServices}</p>
    <p>${barber.website}</p>`);
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
      styles: [{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#C6E2FF"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#C5E3BF"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#D1D1B8"}]}]
    };
    this.map = new google.maps.Map(canvas, mapOptions);
    this.getBarbers(this.loopThroughBarbers);
};

App.addBarber = function() {
  event.preventDefault();
  $.ajax({
      method: "POST",
      url: "http://localhost:3000/api/barbers",
      data: $(this).serialize()
    }).done(data => {
      googleMap.createMarkerForBarber(null, data.barber);
      $('form').reset().hide();
  });
};

App.getBarbers = function(callback){
  return this.ajaxRequest(`${this.apiUrl}/barbers`, "GET", null, callback);
};

App.loopThroughBarbers = function(data) {
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
      icon:     icon,
      animation: google.maps.Animation.DROP,
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
      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Passwor  Confirmation">
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
    <img id="photobooth" src="images/photobooth.jpg">
    </div>
    <div class="col-md-4">
    <div class="cardOne">
    <h4 class="card-titleOne">What every gentleman should own...according to Tom Ford</h4>
    <img id="tomford" class="card-img-top two" src="images/tomford.jpg" alt="Card image cap">
    <div class="card-block">
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    Read More...
    </button>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabaria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" id="myModalLabel">What every gentleman should own...according to Tom Ford</h4>
    </div>
    <div class="modal-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisialiquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cildolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="col-md-4">
    <img id="brushes" src="images/brushes.jpg">
    </div>
    </div>
    </div>
    <div id="editorial-container" class="container">
    <div class="row">
    <div class="col-md-4">
    <div class="cardTwo">
    <h4 class="card-titleTwo">The Best of...Whisky Cocktails</h4>
    <img id="bartender" class="card-img-top two" src="images/bartender.jpg" alt="Card image cap">
    <div class="card-block">
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    Read More...
    </button>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLa aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" id="myModalLabel">The Best of...Whisky Cocktails</h4>
    </div>
    <div class="modal-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut l  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="col-md-4">
    <img id="bearded" src="images/bearded.jpg">
    </div>
    <div class="col-md-4">
    <img id="wallbrushes" src="images/wallbrushes.jpg">
    </div>
    </div>
    </div>
    <div id="editorial-container" class="container">
    <div class="row">
    <div class="col-md-4">
    <img id="quote" src="images/quote.jpg">
    </div>
    <div class="col-md-4">
    <img id="logo" src="images/logo.jpg">
    </div>
    <div class="col-md-4">
    <div class="cardThree">
    <h4 class="card-titleThree">Beard care 101</h4>
    <img id="beardcare" class="card-img-top one" id="" src="images/beardcare.jpg" alt="Card image caclass="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    <div class="card-block">
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    Read More...
    </button>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabaria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" id="myModalLabel">Beard care 101</h4>
    </div>
    <div class="modal-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisialiquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cildolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div id="editorial-container" class="container">
    <div class="row">
    <div class="col-md-4">
    <img id="handsome" src="images/handsome.jpg">
    </div>
    <div class="col-md-4">
    <div class="cardFour">
    <h4 class="card-titleFour">London Collection Mens - The Outerwear Round Up</h4>
    <img id="coats" class="card-img-top one" id="" src="images/coats.jpg" alt="Card image cap">
    <div class="card-block">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
    Read More...
    </button>
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabaria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" id="myModalLabel">London Collection Mens - The Outerwear Round Up</h4>
    </div>
    <div class="modal-body">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labet dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisialiquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cildolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary editorialButton" data-dismiss="modal">Close</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div class="col-md-4">
    <img id="sign" src="images/sign.jpg">
    </div>
    </div>
    </div>
      `);
    };

App.allBarbers = function() {
    event.preventDefault();
    this.getBarbers((data) => {
    this.$main.html(`
        <ul class="row"></ul>
      `);
      let $ul = this.$main.find("ul");
      $.each(data.barbers, (i, barber) => {
      $ul.append(`
        <li class="col-md-4">
        <ul class="tile">
        <li>
        <a href="#" data-toggle="modal" data-target=".modal" data-id="${barber._id}">
        <img id="barberslist" src="${barber.image}">
        <h5 id="babersnames">${barber.name}</h5>
        </a>
        </li>
        </ul>
        </li>
          `);
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
