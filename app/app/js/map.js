var autocompletePickUp, autocompleteDestination, latPickUp, lngPickUp, latDestination, lngDestination, total = 0 ,autocompletePickUpName, autocompleteDestinationName, duration;
var map, index = 0;
var markers = [];

function initAutocomplete() {
    autocompletePickUp = new google.maps.places.Autocomplete(
        document.getElementById('autocompletePickUp'), {types: ['geocode']});

    autocompleteDestination = new google.maps.places.Autocomplete(
        document.getElementById('autocompleteDestination'), {types: ['geocode']});

    autocompletePickUp.setFields(['address_component', 'geometry']);
    autocompleteDestination.setFields(['address_component', 'geometry']);

    autocompletePickUp.addListener('place_changed', fillInAddressPickUp);
    autocompleteDestination.addListener('place_changed', fillInAddressDestination);

    initMap();

}

function fillInAddressPickUp() {

    var place = autocompletePickUp.getPlace();

    if (place == null) {
        console.log("Adresa pickup null");
    } else {
        latPickUp = place.geometry.location.lat();
        lngPickUp = place.geometry.location.lng();
       
        autocompletePickUpName = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[2].long_name;
    }
}

function fillInAddressDestination() {

    var place = autocompleteDestination.getPlace();

    if (place == null) {
        console.log("Adresa destinatie null");
    } else {
        latDestination = place.geometry.location.lat();
        lngDestination = place.geometry.location.lng();
        autocompleteDestinationName = place.address_components[0].long_name + ', ' + place.address_components[1].long_name + ', ' + place.address_components[2].long_name;
    }
}

function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
     map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 45.943161, lng: 24.96676}
    });
    directionsRenderer.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };

    document.getElementById('autocompleteDestination').addEventListener("change", () =>
        setTimeout(onChangeHandler, 300));

}

function addMarker(lat,lng,name,color){
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += color + "-dot.png";
    var myLatlng = new google.maps.LatLng(lat,lng);
    var mapOptions = {
        zoom: 15,
        center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:name,
        icon:url
    });
    markers.push(marker);
// To add the marker to the map, call setMap();
    marker.setMap(map);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    directionsService.route(
        {
            origin: new google.maps.LatLng(latPickUp, lngPickUp),
            destination: new google.maps.LatLng(latDestination, lngDestination),
            travelMode: 'DRIVING',
            drivingOptions: {
                departureTime: new Date(Date.now()),
                trafficModel: 'optimistic'
            }
        },
        function (response, status) {
            if (status === 'ZERO_RESULTS') {
                window.alert('Nici o rută nu a putut fi găsită între origine și destinație pentru Masina');
            } else if (status === 'OK') {
                directionsRenderer.setDirections(response);
                computeTotalDistance(directionsRenderer.getDirections());
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}

function computeTotalDistance(result) {
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
        total += myroute.legs[i].distance.value;
    }

    total = total / 1000;
    document.getElementById('distance').innerHTML = "Distanta: " + total + " km";
    document.getElementById('duration').innerHTML = "Timp estimativ: " + myroute.legs[0].duration.text;
    document.getElementById("latPickUp").innerHTML = "Latitudine Origine: " + latPickUp;
    document.getElementById("lngPickUp").innerHTML = "Longitudine Origine: " + lngPickUp;
    document.getElementById("latDestination").innerHTML = "Latitudine Destinatie: " + latDestination;
    document.getElementById("lngDestination").innerHTML = "Longitudine Destinatie: " + lngDestination;
    document.getElementById("price").innerHTML = "Pret: " + total*1.3 + " Lei";
}



