//begin script when window loads
window.onload = setMap();

//Example 1.3 line 4...set up choropleth map
function setMap() {
  //map frame dimensions
  var width = 960,
    height = 460;

  //create new svg container for the map
  var map = d3
    .select("body")
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
    d3.json("data/usStates.topojson"),
    d3.json("data/midwestStates.topojson")
  ];
  Promise.all(promises).then(callback);

  function callback(data) {
    var csvData = data[0],
      statesData = data[1],
      midwestData = data[2];

    //translate midwest states TopoJSON
    //midwest states requires .features at the end of the declaration, since we will be styling each feature individually
    var usStates = topojson.feature(statesData, statesData.objects.usStates),
      midwestStates = topojson.feature(midwestData, midwestData.objects.midwestStates).features;

    console.log(csvData);
    console.log(midwestStates);

    //variables for data join
    var attrArray = ["coal_twh","gas_twh","wind_twh","solar_twh","cents_kwh","tot_twh"]; //list of attributes

    //loop through csv to assign each set of csv attribute values to geojson region
    for (var i = 0; i < csvData.length; i++) {
      var csvState = csvData[i]; //the current region
      var csvKey = csvState.state_abbr; //the CSV primary key

      //loop through geojson regions to find correct state
      for (var a = 0; a < midwestStates.length; a++) {
        var geojsonProps = midwestStates[a].properties; //the current state geojson properties
        var geojsonKey = geojsonProps.state_abbr; //the geojson primary key

        //where primary keys match, transfer csv data to geojson properties object
        if (geojsonKey == csvKey) {
          //assign all attributes and values
          attrArray.forEach(function (attr) {
            var val = parseFloat(csvState[attr]); //get csv attribute value
            geojsonProps[attr] = val; //assign attribute and value to geojson properties
          });
        }
      }
    }
    //check to make sure attributes have successfully joined
    console.log(midwestStates);

    //add US States countries to map
    var states = map
      .append("path")
      .datum(usStates)
      .attr("class", "us")
      .attr("d", path);

    //add Midwest States to map
    var midwest = map
      .selectAll(".midwest")
      .data(midwestStates)
      .enter()
      .append("path")
      .attr("class", function (d) {
        return "midwest " + d.properties.state_abbr;
      })
      .attr("d", path);
  }
}
