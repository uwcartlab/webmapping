//wrap everything is immediately invoked anonymous function so nothing is in clobal scope
(function () {
	//pseudo-global variables
	var attrArray = ["coal_twh","gas_twh","wind_twh","solar_twh","cents_kwh","tot_twh"]; //list of attributes
	var expressed = attrArray[0]; //initial attribute

	//begin script when window loads
	window.onload = setMap();

	//Example 1.3 line 4...set up choropleth map
	function setMap() {
		//map frame dimensions
		var width = window.innerWidth * 0.5 - 25,
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
			var csvData = data[0], statesData = data[1], midwestData = data[2];

			//translate midwest states TopoJSON
			var usStates = topojson.feature(statesData, statesData.objects.usStates),
				midwestStates = topojson.feature(midwestData, midwestData.objects.midwestStates).features;

			//add us state to map
			var states = map.append("path")
				.datum(usStates)
				.attr("class", "us")
				.attr("d", path);

			midwestStates = joinData(midwestStates, csvData);

			var colorScale = makeColorScale(csvData);

			setChart(csvData, colorScale);

			setEnumerationUnits(midwestStates, map, path, colorScale);
		};
	};

	function joinData(midwestStates, csvData) {
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
		return midwestStates;
	}

	function makeColorScale(data) {
		var colorClasses = [
			"#D4B9DA",
			"#C994C7",
			"#DF65B0",
			"#DD1C77",
			"#980043"
		];

		//create color scale generator
		var colorScale = d3.scaleQuantile()
			.range(colorClasses);

		//build array of all values of the expressed attribute
		var domainArray = [];
		for (var i = 0; i < data.length; i++) {
			var val = parseFloat(data[i][expressed]);
			domainArray.push(val);
		};

		//assign array of expressed values as scale domain
		colorScale.domain(domainArray);

		return colorScale;
	}

	function setEnumerationUnits(midwestStates, map, path, colorScale) {
		//add midwest states regions to map
		var midwest = map
			.selectAll(".midwest")
			.data(midwestStates)
			.enter()
			.append("path")
			.attr("class", function (d) {
				return "midwest " + d.properties.state_abbr;
			})
			.attr("d", path)
			.style("fill", function (d) {
				//check to make sure a data value exists, if not set color to gray
				var value = d.properties[expressed];            
				if(value) {            	
					return colorScale(d.properties[expressed]);            
				} else {            	
					return "#ccc";            
				}    
			});
	}

	//function to create coordinated bubble chart
	function setChart(csvData, colorScale) {
		//chart frame dimensions
		var chartWidth = window.innerWidth * 0.5 - 25,
			chartHeight = 460;

		//create a second svg element to hold the bar chart
		var chart = d3.select("body")
			.append("svg")
			.attr("width", chartWidth)
			.attr("height", chartHeight)
			.attr("class", "chart");
	};

})();