//variables we want to access from multiple functions
var map;
var dataStats = {};

function createMap() {
  //create the map
  map = L.map("map", {
    center: [0, 0],
    zoom: 1,
  });

  //add OSM base tilelayer
  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
  }).addTo(map);

  //call getData function
  getData(map);
}

function calcStats(data) {
  //create empty array to store all data values
  var allValues = [];
  //loop through each city
  for (var city of data.features) {
    //loop through each year
    for (var year = 1985; year <= 2015; year += 5) {
      //get population for current year
      var value = city.properties["Pop_" + String(year)];
      //add value to array
      allValues.push(value);
    }
  }
  //get min, max, mean stats for our array
  dataStats.min = Math.min(...allValues);
  dataStats.max = Math.max(...allValues);
  //calculate meanValue
  var sum = allValues.reduce(function (a, b) {
    return a + b;
  });
  dataStats.mean = sum / allValues.length;
}

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
  //constant factor adjusts symbol sizes evenly
  var minRadius = 6;
  //Flannery Apperance Compensation formula
  var radius = 1.0083 * Math.pow(attValue / dataStats.min, 0.5715) * minRadius;
  return radius;
}

//function to convert markers to circle markers and add popups
function pointToLayer(feature, latlng, attributes) {
  //Determine which attribute to visualize with proportional symbols
  var attribute = attributes[0];

  //create marker options
  var options = {
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  };

  //For each feature, determine its value for the selected attribute
  var attValue = Number(feature.properties[attribute]);

  //Give each feature's circle marker a radius based on its attribute value
  options.radius = calcPropRadius(attValue);

  //create circle marker layer
  var layer = L.circleMarker(latlng, options);

  //build popup content string starting with city...Example 2.1 line 24
  var popupContent = "<p><b>City:</b> " + feature.properties.City + "</p>";

  //add formatted attribute to popup content string
  var year = attribute.split("_")[1];
  popupContent +=
    "<p><b>Population in " +
    year +
    ":</b> " +
    feature.properties[attribute] +
    " million</p>";

  //bind the popup to the circle marker
  layer.bindPopup(popupContent, {
    offset: new L.Point(0, -options.radius),
  });

  //return the circle marker to the L.geoJson pointToLayer option
  return layer;
}

function createPropSymbols(data, attributes) {
  //create a Leaflet GeoJSON layer and add it to the map
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return pointToLayer(feature, latlng, attributes);
    },
  }).addTo(map);
}

function getCircleValues(attribute) {
  //start with min at highest possible and max at lowest possible number
  var min = Infinity,
    max = -Infinity;

  map.eachLayer(function (layer) {
    //get the attribute value
    if (layer.feature) {
      var attributeValue = Number(layer.feature.properties[attribute]);

      //test for min
      if (attributeValue < min) {
        min = attributeValue;
      }

      //test for max
      if (attributeValue > max) {
        max = attributeValue;
      }
    }
  });

  //set mean
  var mean = (max + min) / 2;

  //return values as an object
  return {
    max: max,
    mean: mean,
    min: min,
  };
}

function updateLegend(attribute) {
  //create content for legend
  var year = attribute.split("_")[1];
  var content = "Population in " + year;

  //replace legend content
  $("#temporal-legend").html(content);

  //get the max, mean, and min values as an object
  var circleValues = getCircleValues(attribute);

  for (var key in circleValues) {
    //get the radius
    var radius = calcPropRadius(circleValues[key]);

    $("#" + key).attr({
      cy: 59 - radius,
      r: radius,
    });

    $("#" + key + "-text").text(
      Math.round(circleValues[key] * 100) / 100 + " million"
    );
  }
}

//Step 10: Resize proportional symbols according to new attribute values
function updatePropSymbols(attribute) {
  var year = attribute.split("_")[1];
  //update temporal legend
  $("span.year").html(year);

  map.eachLayer(function (layer) {
    if (layer.feature && layer.feature.properties[attribute]) {
      //access feature properties
      var props = layer.feature.properties;

      //update each feature's radius based on new attribute values
      var radius = calcPropRadius(props[attribute]);
      layer.setRadius(radius);

      //add city to popup content string
      var popupContent = "<p><b>City:</b> " + props.City + "</p>";

      //add formatted attribute to panel content string
      var year = attribute.split("_")[1];
      popupContent +=
        "<p><b>Population in " +
        year +
        ":</b> " +
        props[attribute] +
        " million</p>";

      //update popup with new content
      popup = layer.getPopup();
      popup.setContent(popupContent).update();
    }
  });

  updateLegend(attribute);
}

function processData(data) {
  //empty array to hold attributes
  var attributes = [];

  //properties of the first feature in the dataset
  var properties = data.features[0].properties;

  //push each attribute name into attributes array
  for (var attribute in properties) {
    //only take attributes with population values
    if (attribute.indexOf("Pop") > -1) {
      attributes.push(attribute);
    }
  }

  return attributes;
}

//Create new sequence controls
function createSequenceControls(attributes){   
    
  var SequenceControl = L.Control.extend({
      options: {
          position: 'bottomleft'
      },

      onAdd: function () {
          // create the control container div with a particular class name
          var container = L.DomUtil.create('div', 'sequence-control-container');

          //create range input element (slider)
          container.insertAdjacentHTML('beforeend', '<input class="range-slider" type="range">')

          //add skip buttons
          container.insertAdjacentHTML('beforeend', '<button class="step" id="reverse" title="Reverse"><img src="img/reverse.png"></button>'); 
          container.insertAdjacentHTML('beforeend', '<button class="step" id="forward" title="Forward"><img src="img/forward.png"></button>'); 

          //disable any mouse event listeners for the container
          L.DomEvent.disableClickPropagation(container);


          return container;

      }
  });

  map.addControl(new SequenceControl());

  ///////add listeners after adding the control!///////
  //set slider attributes
  document.querySelector(".range-slider").max = 6;
  document.querySelector(".range-slider").min = 0;
  document.querySelector(".range-slider").value = 0;
  document.querySelector(".range-slider").step = 1;

  var steps = document.querySelectorAll('.step');

  steps.forEach(function(step){
      step.addEventListener("click", function(){
          var index = document.querySelector('.range-slider').value;
          //Step 6: increment or decrement depending on button clicked
          if (step.id == 'forward'){
              index++;
              //Step 7: if past the last attribute, wrap around to first attribute
              index = index > 6 ? 0 : index;
          } else if (step.id == 'reverse'){
              index--;
              //Step 7: if past the first attribute, wrap around to last attribute
              index = index < 0 ? 6 : index;
          };

          //Step 8: update slider
          document.querySelector('.range-slider').value = index;

          //Step 9: pass new attribute to update symbols
          updatePropSymbols(attributes[index]);
      })
  })

  //Step 5: input listener for slider
  document.querySelector('.range-slider').addEventListener('input', function(){
      //Step 6: get the new index value
      var index = this.value;

      //Step 9: pass new attribute to update symbols
      updatePropSymbols(attributes[index]);
  });

};

function createLegend(attributes) {
  var LegendControl = L.Control.extend({
    options: {
      position: "bottomright",
    },

    onAdd: function () {
      // create the control container with a particular class name
      var container = L.DomUtil.create("div", "legend-control-container");

      container.innerHTML = '<p class="temporalLegend">Population in <span class="year">1980</span></p>';

      //Step 1: start attribute legend svg string
      var svg = '<svg id="attribute-legend" width="160px" height="60px">';

      //array of circle names to base loop on
      var circles = ["max", "mean", "min"];

      //Step 2: loop to add each circle and text to svg string
      for (var i = 0; i < circles.length; i++) {
        //calculate r and cy
        var radius = calcPropRadius(dataStats[circles[i]]);
        console.log(radius);
        var cy = 59 - radius;
        console.log(cy);

        //circle string
        svg +=
          '<circle class="legend-circle" id="' +
          circles[i] +
          '" r="' +
          radius +
          '"cy="' +
          cy +
          '" fill="#F47821" fill-opacity="0.8" stroke="#000000" cx="30"/>';

        //evenly space out labels
        var textY = i * 20 + 20;

        //text string
        svg +=
          '<text id="' +
          circles[i] +
          '-text" x="65" y="' +
          textY +
          '">' +
          Math.round(dataStats[circles[i]] * 100) / 100 +
          " million" +
          "</text>";
      }

      //close svg string
      svg += "</svg>";

      //add attribute legend svg to container
      container.insertAdjacentHTML('beforeend',svg);

      return container;
    },
  });

  map.addControl(new LegendControl());
}

function getData(map){
  //load the data
  fetch("data/MegaCities.geojson")
      .then(function(response){
          return response.json();
      })
      .then(function(json){
          var attributes = processData(json);
          calcStats(json)
          //call function to create proportional symbols
          createPropSymbols(json, attributes);
          createSequenceControls(attributes);
          createLegend(attributes);
      })
};

document.addEventListener('DOMContentLoaded',createMap);

