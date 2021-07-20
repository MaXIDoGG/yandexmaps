ymaps.ready(function () {
    var map;
    ymaps.geolocation.get().then(function (res) {
        var mapContainer = $('#map'),
            bounds = res.geoObjects.get(0).properties.get('boundedBy'),
            mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
        createMap(mapState);
    }, function (e) {
        createMap({
            center: [55.751574, 37.573856],
            zoom: 2
        });
    });
    
    function createMap (state) {
        map = new ymaps.Map('map', state);
    }

    let locations = []
    let locationLinks = document.querySelectorAll('.location')

    document.querySelector('.addLocation').addEventListener('submit', (event) => {
        event.preventDefault();
        let i = locations.length
        if (i < 3) {
            let name = document.querySelector('#name').value;
            let lat = document.querySelector('#latitude').value;
            let long = document.querySelector('#longitude').value;  

            let location = {name: name, lat: lat, long: long}
            locations[i] = location
            out()
        }
    })

    let closeButtons = Array.from(document.querySelectorAll('.close'))
    for (let but in closeButtons) {
        closeButtons[but].addEventListener('click', (event) => {
            event.preventDefault()
            locations.splice(but, 1)
            out()
        })
    }

    let changeForms = Array.from(document.querySelectorAll('.changeForm'))
    for (let j in changeForms) {
        changeForms[j].addEventListener('submit', (event) => {
            event.preventDefault()
            locations[j] = {name: changeForms[j].name.value, lat: changeForms[j].lat.value, long: changeForms[j].long.value}
            out()
        })
    }

    
    for (let i in Array.from(locationLinks)) {
        Array.from(locationLinks)[i].addEventListener('click', (event) => {
            event.preventDefault()
            map.setCenter([locations[i].lat, locations[i].long], 17)
        })
    }
 
    function out() {
        locationLinks.forEach(loc => {
                loc.innerHTML = ''
            })
        map.geoObjects.removeAll()
        for (let key in locations) {
            let loc = locations[key]
            locationLinks[key].innerHTML = loc.name
            let myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [loc.lat, loc.long]
                },
                properties: {
                    iconContent: +key + 1,
                    hintContent: loc.name,
                    balloonContentHeader: loc.name,
                    balloonContentBody: `Широта: ${loc.lat}<br>Долгота: ${loc.long}`
                }
            }, {
                preset: 'islands#blackStretchyIcon',
                draggable: false
            });
            map.geoObjects.add(myGeoObject);
        }
    }

})