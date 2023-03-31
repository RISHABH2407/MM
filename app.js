function initMap() {

    autocomplete = new google.maps.places.Autocomplete((document.getElementById('autocomplete')),
        { types: ['geocode'] });

    // When the user selects an address from the dropdown, search for nearby places.
    autocomplete.addListener('place_changed', searchNearbyPlaces);
}

document.getElementById('type').onchange = searchNearbyPlaces

function searchNearbyPlaces() {
    document.getElementById('places').innerHTML = ''
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    console.log(place)

    // Create a map centered at the location entered in the autocomplete field.
    map = new google.maps.Map(document.getElementById('map'), {
        center: place.geometry.location,
        zoom: 15
    });

    // Perform a nearby search for places of type 'store'.
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: place.geometry.location,
        radius: '500',
        type: [document.getElementById('type').value]
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(results.length)
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    console.log(place)
    var table = document.getElementById("places");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    cell1.innerHTML = place.name;
    if (place.photos) {
        let photoUrl = place.photos[0].getUrl();
        let cell2 = row.insertCell(1)
        cell2.innerHTML = `<img width="300" height="300" src="${photoUrl}"/>`
    } else {
        let photoUrl = "https://via.placeholder.com/150"
        let cell2 = row.insertCell(1)
        cell2.innerHTML = `<img width="300" height="300" src="${photoUrl}"/>`
    }
}