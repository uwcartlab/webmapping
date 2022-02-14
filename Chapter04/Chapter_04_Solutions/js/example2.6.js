var map;

//function to instantiate the Leaflet map
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
    getData(map);
};

//function to retrieve the data and place it on the map
function getData(map){
    //load the data, then map
    fetch("data/MegaCities.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(json){
            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(json, {
                //use filter function to only show cities with 2015 populations greater than 20 million
                filter: function(feature, layer) {
                    return feature.properties.Pop_2015 > 20;
                }
            }).addTo(map);
        })
};

document.addEventListener('DOMContentLoaded',createMap)
