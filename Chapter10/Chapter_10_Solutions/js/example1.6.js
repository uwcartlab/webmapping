//wrap everything is immediately invoked anonymous function so nothing is in clobal scope
(function (){

	//pseudo-global variables
	var attrArray = ["varA", "varB", "varC", "varD", "varE"]; //list of attributes
	var expressed = attrArray[0]; //initial attribute


	//begin script when window loads
	window.onload = setMap();

	//Example 1.3 line 4...set up choropleth map
	function setMap(){

	    //map frame dimensions
	    var width = 960,
	        height = 460;

	    //create new svg container for the map
	    var map = d3.select("body")
	        .append("svg")
	        .attr("class", "map")
	        .attr("width", width)
	        .attr("height", height);

	    //create Albers equal area conic projection centered on France
	    var projection = d3.geoAlbers()
	        .center([0, 46.2])
	        .rotate([-2, 0, 0])
	        .parallels([43, 62])
	        .scale(2500)
	        .translate([width / 2, height / 2]);

	    var path = d3.geoPath()
	        .projection(projection);

	    //use Promise.all to parallelize asynchronous data loading
	    var promises = [d3.csv("data/unitsData.csv"),
	                    d3.json("data/EuropeCountries.topojson"),
	                    d3.json("data/FranceRegions.topojson")
	                   ];
	    Promise.all(promises).then(callback);

	    function callback(data){
			var csvData = data[0], europe = data[1], france = data[2];

	        setGraticule(map,path);

	        //translate europe TopoJSON
	        var europeCountries = topojson.feature(europe, europe.objects.EuropeCountries),
	            franceRegions = topojson.feature(france, france.objects.FranceRegions).features;

	        //add Europe countries to map
	        var countries = map.append("path")
	            .datum(europeCountries)
	            .attr("class", "countries")
	            .attr("d", path);

	        franceRegions = joinData(franceRegions, csvData);

	        var colorScale = makeColorScale(csvData);

	        setEnumerationUnits(franceRegions,map,path,colorScale);

	    };

	    
	};

	function setGraticule(map,path){
		var graticule = d3.geoGraticule()
	            .step([5, 5]); //place graticule lines every 5 degrees of longitude and latitude

	        //create graticule background
	        var gratBackground = map.append("path")
	            .datum(graticule.outline()) //bind graticule background
	            .attr("class", "gratBackground") //assign class for styling
	            .attr("d", path) //project graticule

	        //create graticule lines
	        var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
	            .data(graticule.lines()) //bind graticule lines to each element to be created
	            .enter() //create an element for each datum
	            .append("path") //append each element to the svg as a path element
	            .attr("class", "gratLines") //assign class for styling
	            .attr("d", path); //project graticule lines
	}

	function joinData(franceRegions,csvData){
		//loop through csv to assign each set of csv attribute values to geojson region
	        for (var i=0; i<csvData.length; i++){
	            var csvRegion = csvData[i]; //the current region
	            var csvKey = csvRegion.adm1_code; //the CSV primary key

	            //loop through geojson regions to find correct region
	            for (var a=0; a<franceRegions.length; a++){

	                var geojsonProps = franceRegions[a].properties; //the current region geojson properties
	                var geojsonKey = geojsonProps.adm1_code; //the geojson primary key

	                //where primary keys match, transfer csv data to geojson properties object
	                if (geojsonKey == csvKey){

	                    //assign all attributes and values
	                    attrArray.forEach(function(attr){
	                        var val = parseFloat(csvRegion[attr]); //get csv attribute value
	                        geojsonProps[attr] = val; //assign attribute and value to geojson properties
	                    });
	                };
	            };
	        };
	        return franceRegions;
	}

	function makeColorScale(data){
	    var colorClasses = [
	        "#D4B9DA",
	        "#C994C7",
	        "#DF65B0",
	        "#DD1C77",
	        "#980043"
	    ];

	    //create color scale generator
	    var colorScale = d3.scaleThreshold()
	        .range(colorClasses);

	    //build array of all values of the expressed attribute
	    var domainArray = [];
	    for (var i=0; i<data.length; i++){
	        var val = parseFloat(data[i][expressed]);
	        domainArray.push(val);
	    };

	    //cluster data using ckmeans clustering algorithm to create natural breaks
	    var clusters = ss.ckmeans(domainArray, 5);
	    //reset domain array to cluster minimums
	    domainArray = clusters.map(function(d){
	        return d3.min(d);
	    });
	    //remove first value from domain array to create class breakpoints
	    domainArray.shift();

	    //assign array of last 4 cluster minimums as domain
	    colorScale.domain(domainArray);

	    return colorScale;
};

	function setEnumerationUnits(franceRegions, map, path, colorScale){
	    //add France regions to map
	    var regions = map.selectAll(".regions")
	        .data(franceRegions)
	        .enter()
	        .append("path")
	        .attr("class", function(d){
	            return "regions " + d.properties.adm1_code;
	        })
	        .attr("d", path)
	        .style("fill", function(d){
	            return colorScale(d.properties[expressed]);
	        });
};

})();