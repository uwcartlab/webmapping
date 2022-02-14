//declare map variable globally so all functions have access
var map;

//step 1 create map
function createMap(){
    
    //create the map
    map = L.map('map', {
        center: [0, 0],
        zoom: 1
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);

    //call getData function
    getData();
};

//Step 3: Add circle markers for point features to the map
function createPropSymbols(data){
    //create marker options
    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);
};

//Step 2: Import GeoJSON data
function getData(map){
    //load the data
    fetch("data/MegaCities.geojson")
        .then(function(response){
            if (!response.ok) {
				throw new Error("HTTP error, status = " + response.status);
			}
            return response.json();
        })
        .then(function(json){
            createPropSymbols(json);
        })
};

document.addEventListener('DOMContentLoaded',createMap)