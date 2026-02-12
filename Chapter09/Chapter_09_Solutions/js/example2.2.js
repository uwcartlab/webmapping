//begin script when window loads
window.onload = setMap();

//Example 1.3 line 4...set up choropleth map
function setMap() {
    //map frame dimensions
    var width = 960,
        height = 460;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on the Midwest
    var projection = d3
        .geoAlbers()
        .center([-11.97, 46.33])
        .rotate([85.45, 4.33, 3.1])
        .parallels([8.41, 47.50])
        .scale(1600)
        .translate([width / 2, height / 2]);   

    var path = d3.geoPath().projection(projection);

    //use Promise.all to parallelize asynchronous data loading
    var promises = [
        d3.csv("data/greatLakesEnergyStats.csv"),
        d3.json("data/midwestStates.topojson"),
        d3.json("data/usStates.topojson"),
    ];
    Promise.all(promises).then(callback);
}

function callback(data) {
    var csvData = data[0],
        midwestData = data[1],
        statesData = data[2];

    //translate midwest states TopoJSON
    //midwest states requires .features at the end of the declaration, since we will be styling each feature individually
    var midwestStates = topojson.feature(midwestData, midwestData.objects.midwestStates).features,
        usStates = topojson.feature(statesData, statesData.objects.usStates);

}
