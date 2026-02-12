//begin script when window loads
window.onload = setMap();

//Example 1.3 line 4...set up choropleth map
function setMap() {
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

    //translate europe TopoJSON
    var midwestStates = topojson.feature(midwestData, midwestData.objects.midwestStates),
        usStates = topojson.feature(statesData, statesData.objects.usStates);

    //examine the results
    console.log(midwestStates);
    console.log(usStates);
}
