//create labels for the attributes to make the site more user friendly
(function () {
    //pseudo-global variables
    //wrap attributes into object notation, inlcuding a label and plain-text unit description
    var attrObjects = [{
        attr:"coal_twh",
        label:"Coal",
        unit:"TeraWatt Hours"
    },
    {
        attr:"gas_twh",
        label:"Natural Gas",
        unit:"TeraWatt Hours"
    },
    {
        attr:"wind_twh",
        label:"Wind",
        unit:"TeraWatt Hours"
    },
    {
        attr:"solar_twh",
        label:"Solar",
        unit:"TeraWatt Hours"
    },
    {
        attr:"cents_kwh",
        label:"Price",
        unit:"Cents per KwH"
    },
    {
        attr:"tot_twh",
        label:"Total",
        unit:"TerraWatt Hours"
    }]
    //create an object for different expressed variables
    var expressed = {
        x: attrObjects[4].attr,
        y: attrObjects[0].attr,
        color: attrObjects[1].attr
    }
    //move chart height/width to be global
    //chart frame dimensions
    //check size of screen, if over 700 pixels, create a chart container the entire width of the screen.
    //The chart will stack below the map
    if(window.innerWidth < 700)
        var chartWidth = window.innerWidth - 40
        //there is accompanying css that uses "media query" to control for styling at smaller screen size
    else
        var chartWidth = window.innerWidth * 0.5 - 25

    var chartHeight = window.innerHeight - 170;

    //begin script when window loads
    window.onload = setMap();

    //Example 1.3 line 4...set up choropleth map
    function setMap() {
        //map frame dimensions
        //check size of screen, if over 700 pixels, create a map container the entire width of the screen
        //the map will stack atop the chart
        if(window.innerWidth < 700)
            var width = window.innerWidth - 40
        else
            var width = window.innerWidth * 0.5 - 25

        var height = window.innerHeight - 170;

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

            createTitle();

            createDropdown(csvData, "Select Color/Size", "color");
            createDropdown(csvData, "Select X", "x");
            createDropdown(csvData, "Select Y", "y");
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
                    //update array values based on new object notation
                    attrObjects.forEach(function (attr) {
                        var val = parseFloat(csvState[attr.attr]); //get csv attribute value
                        geojsonProps[attr.attr] = val; //assign attribute and value to geojson properties
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
            //color scale will be expressed.color
            var val = parseFloat(data[i][expressed.color]);
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
				var value = d.properties[expressed.color];            
				if(value) {            	
					return colorScale(d.properties[expressed.color]);            
				} else {            	
					return "#ccc";            
				}    
			})
            .on("mouseover", function (event, d) {
                highlight(d.properties);
            })
            .on("mouseout", function (event, d) {
                dehighlight(d.properties);
            })
            .on("mousemove", moveLabel)
    }
    //function to calculate minimum and maximum data values
    //add parameter to calculate the expressed value for the chosen scale
    function getDataValues(csvData, expressedValue) {
        var max = d3.max(csvData, function(d) { 
            return parseFloat(d[expressedValue]); 
        });
        var min = d3.min(csvData, function(d) { 
            return parseFloat(d[expressedValue]); 
        });
        var range = max - min,
            adjustment = (range / csvData.length)

        return [min - adjustment, max + adjustment];
    }
    //function to create y scale
    function createYScale(csvData, chartHeight) {
        var dataMinMax = getDataValues(csvData, expressed.y)
        return yScale = d3.scaleLinear().range([0, chartHeight]).domain([dataMinMax[1], dataMinMax[0]]);
    }
    //function to create x scale
    function createXScale(csvData, chartWidth) {
        var dataMinMax = getDataValues(csvData, expressed.x)
        return xScale = d3.scaleLinear().range([0, chartWidth]).domain([dataMinMax[0], dataMinMax[1]]);
    }
    //create axes
    function createChartAxes(chart, chartHeight, yScale, xScale) {
        //add axis
        //create vertical axis generator
        var yAxisScale = d3.axisRight().scale(yScale);
        var xAxisScale = d3.axisTop().scale(xScale);

        //place axis
        var yaxis = chart.append("g")
            .attr("class", "yaxis")
            .call(yAxisScale);

        var xaxis = chart.append("g")
            .attr("class", "xaxis")//format x axis
            .attr("transform", "translate(0," + chartHeight + ")")
            .call(xAxisScale);
    }
    //function to create coordinated bubble chart
    function setChart(csvData, colorScale) {
        //create a second svg element to hold the bar chart
        var chart = d3.select("body")
            .append("svg")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
            .attr("class", "chart");

        //create a y scale to place circles proportionally
        var yScale = createYScale(csvData, chartHeight);
        //create an x scale to place circles proportionally
        var xScale = createXScale(csvData, chartWidth);
        //create axes
        createChartAxes(chart, chartHeight, yScale, xScale)

        //set circles for each state
        var circles = chart.selectAll(".circles") //create an empty selection
            .data(csvData) //here we feed in our array of data
            .enter() //one of the great mysteries of the universe
            .append("circle") //inspect the HTML--holy crap, there's some circles there
            .attr("class", "circles")
            .attr("class", function (d) {
                return "bubble " + d.state_abbr;
            })
            //calculate the size of circles
            .attr("r", function (d) {
                var min = 1, minRadius = 2.5
                //calculate the radius based on population value as circle area
                var radius = Math.pow(d[expressed.color] / min, 0.5715) * minRadius;;
                return radius;
            })
            .attr("cx", function (d, i) {
                return xScale(parseFloat(d[expressed.x]));
            })
            //place circles vertically on the chart
            .attr("cy", function (d) {
                return yScale(parseFloat(d[expressed.y]));
            })
            //color circles to match the map
            .attr("fill", function (d) {
                return colorScale(parseFloat(d[expressed.color]));
            })
            .on("mouseover", function (event, d) {
                highlight(d);
            })
            .on("mouseout", function (event, d) {
                dehighlight(d);
            })
            .on("mousemove", moveLabel);
    };
    //create page title
    function createTitle() {
        var pageTitle = d3
            .select(".navbar")
            .append("h1")
            .attr("class", "pageTitle")
            .text("Midwest Energy Dashboard")
    }
    //function to create a dropdown menu for attribute selection
    function createDropdown(csvData, selectionText, expressedAttribute) {
        //add select element
        //select .navbar instead of body
        var dropdown = d3.select(".navbar")
            .append("select")
            .attr("class", "dropdown")
            .on("change", function () {
                changeAttribute(this.value, expressedAttribute, csvData)
            });

        //add initial option
        var titleOption = dropdown.append("option")
            .attr("class", "titleOption")
            .attr("disabled", "true")
            .text(selectionText);

        //add attribute name options
        var attrOptions = dropdown.selectAll("attrOptions")
            .data(attrObjects)
            .enter()
            .append("option")
            .attr("value", function (d) { return d.attr })
            .text(function (d) { return d.label });
    };
    //dropdown change event handler
    function changeAttribute(attribute, expressedAttribute, csvData) {
        //change the expressed color attribute
        expressed[expressedAttribute] = attribute;

        //recreate the color scale
        var colorScale = makeColorScale(csvData);

        //recolor enumeration units
        var midwest = d3.selectAll(".midwest").style("fill", function (d) {
            var value = d.properties[expressed.color];
            if (value) {
                return colorScale(d.properties[expressed.color]);
            } else {
                return "#ccc";
            }
        });

        //recreate x and y scales based on the newly expressed value
        //update y scale
        var yScale = createYScale(csvData, chartHeight, expressed.y);
        //update x scale
        var xScale = createXScale(csvData, chartWidth, expressed.x);
        //update axes
        var yaxis = d3.select(".yaxis").call(d3.axisRight().scale(yScale))
        var xaxis = d3.select(".xaxis").call(d3.axisTop().scale(xScale))

        //recolor bubbles
        var circles = d3.selectAll(".bubble")
            //recolor circles to match the map
            .attr("fill", function (d) {
                return colorScale(parseFloat(d[expressed.color]));
            })
            //resize circles
            .attr("r", function (d) {
                var min = 1, minRadius = 2.5
                //calculate the radius based on population value as circle area
                var radius = Math.pow(d[expressed.color] / min, 0.5715) * minRadius;;
                return radius;
            })
            //calculate x and y scales
            .attr("cx", function (d, i) {
                return xScale(parseFloat(d[expressed.x]));
            })
            .attr("cy", function (d) {
                return yScale(parseFloat(d[expressed.y]));
            })
    }
    //function to highlight enumeration units and bars
    function highlight(props) {
        //change stroke
        var selected = d3.selectAll("." + props.state_abbr)
            .attr("class", function () {
                //get current list of classes for each element
                let elemClasses = this.classList;
                //add class "selected" to class list
                elemClasses.add("selected")
                return elemClasses;
            })
        //bring element to front
        selected.raise()
        //add info label
        setLabel(props)
    };
    //function to dehighlight enumeration units and bars
    function dehighlight(props) {
        //change stroke
        var selected = d3.selectAll("." + props.state_abbr)
            .attr("class", function () {
                //get current list of classes for each element
                let elemClasses = this.classList;
                //remove class "selected" from class list
                elemClasses.remove("selected")
                return elemClasses;
            })
        //remove info label
        d3.select(".infolabel").remove();

    };
    //function to create dynamic label
    function setLabel(props) {
        var unitLabel
        //retrieve unit label
        attrObjects.forEach(function(x){
            if (expressed.color == x.attr)
                unitLabel = x.unit
        })

        //label content
        var labelAttribute = "<h1>" + props[expressed.color] +
            "</h1><b>" + unitLabel + " " + props.state_abbr + "</b>";

        //create info label div
        var infolabel = d3.select("body")
            .append("div")
            .attr("class", "infolabel")
            .attr("id", props.state_abbr + "_label")
            .html(labelAttribute);
    };
    //function to move label
    function moveLabel(event, d) {
        //text wrapping
        var labelWidth = d3.select(".infolabel")
            .node()
            .getBoundingClientRect().width;
        //use coordinates of mousemove event to set label coordinates
        var x1 = event.clientX + 10,
            y1 = event.clientY - 75,
            x2 = event.clientX - labelWidth - 10,
            y2 = event.clientY + 25;
        //horizontal label coordinate, testing for overflow
        var x = event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1;
        //vertical label coordinate, testing for overflow
        var y = event.clientY < 75 ? y2 : y1;

        var infoLabel = d3.select(".infolabel")
            .style("top", y + "px")
            .style("left", x + "px")
    }

})();