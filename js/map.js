/*
 ***********************************
 * map init and manipulate
 * author: Xiaoyan Liao
 * create at: 2018-04-26
 ***********************************
 */
var map;
var service;
var infowindow;
var markers = [];
var $result = $('#result');
var $myplace=$('#myplace');
var current_location = {lat: 37.793986, lng: -122.4469131}; 
var streetview_url = `https://maps.googleapis.com/maps/api/streetview?size=640x640&heading=151.78&
                    pitch=-0.76&key=AIzaSyCOaQ5CUM0SfR6IIyVuu4qRpvc_p0og9yQ&location=`;

function initMap() { 
    map = new google.maps.Map(document.getElementById('map'), {
        center: current_location,
        zoom: 13
    });

    service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();

}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var latitude = placeLoc.lat();
    var longitude = placeLoc.lng(); 
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });

    markers.push(marker);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        $result.empty();
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
            //My key only allow me query 10 results
            getPlaceDetail(results[i].place_id);
        }
        
    }
}

function imageCallback(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        var photos = place.photos;
        var photo_url;
        if (!photos) {
            photo_url = getStreetViewImg(place.geometry.location);
        } else {
            photo_url = photos[0].getUrl({'maxWidth': 600, 'maxHeight': 800});
        }
        $imgDiv = createImgCard(place.name, photo_url, true);
        $result.append($imgDiv);
    }
}

function getStreetViewImg(location) {
    var loca_str = location.lat() + ',' + location.lng();
    return streetview_url + loca_str
}

function getPlaceDetail(placeID) {
    var request = {
        placeId: placeID
    };
    service.getDetails(request, imageCallback);
}

$(document).ready(function() {
    $('#searchBtn').click(function() {
        $result.show();
        $myplace.hide();
        poi_name = $('#poiName').val();
        setMapOnAll(null);
        markers = [];
        //TODO: query by page, get next page token
        service.nearbySearch({
            location: current_location,
            radius: 5000,
            keyword: poi_name,
            rankby: 'distance',
            hasNextPage: true
        }, callback);
    });

    $('#showPlaceBtn').click(function() {
        $result.hide();
        $myplace.show();
        showMyPlaces();
    })
})