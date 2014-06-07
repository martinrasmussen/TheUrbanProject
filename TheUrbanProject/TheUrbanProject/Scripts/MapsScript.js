/// <reference path="jquery-1.3.2-vsdoc2.js" />
/// <reference path="google-maps-3-vs-1-0.js" />
var markers = [];
var map;
var currentPosition;

//var session = '<%=Session["Users"]%>';

//Gets the session variable set in the Maps.apsx script tag
var users = session;

$(document).ready(function () {

    var numbers = [];

    for (var i = 0; i < users.length; i++) {
        if (!isNaN(users[i])) {
            numbers.push(users[i]);;

        } 
    };


    console.log('numbers; ',numbers);

    console.log(users);
    var mapOptions = {
        zoom: 4,
        panControl: false,
        zoomControl: true,
        scaleControl: true
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    _SetupSearchBoxFunctionalities();

    // Has to be fetched like this, otherwise it can't be added to the map.controls
    var button = (document.getElementById('btnCheck'));
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(button);

    getCurrentLocation();
});

function createMarker() {
    var marker = new google.maps.Marker({
        map: map,
        position: currentPosition
    });
}

function getCurrentLocation() {
    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            currentPosition = pos;


            createMarker();

            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

function _SetupSearchBoxFunctionalities() {
    var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631));
    map.fitBounds(defaultBounds);


    // Create the search box and link it to the UI element.
    var input = /** @type {HTMLInputElement} */(
        document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var searchBox = new google.maps.places.SearchBox(
      /** @type {HTMLInputElement} */(input));

    // Listen for the event fired when the user selects an item from the
    // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            bounds.extend(place.geometry.location);
        }
        map.fitBounds(bounds);
        map.setZoom(12);

    });
    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);

    });

}
