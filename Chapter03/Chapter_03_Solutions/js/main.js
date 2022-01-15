/*//initialize function called when the script loads
function initialize(){
	loadData();
	debugAjax();
};

function loadData(){
	var cities;

	fetch("data/MegaCities.geojson")
		.then(function(response){
			return response.json();
		})
		.then(function(json) {
			cities = json;
			console.log(cities);
		})
}

function debugCallback(mydata){
	document.querySelector("#mydiv").innerHTML = "GeoJSON data: " + JSON.stringify(mydata);
};

function debugAjax(){
	fetch("data/MegaCities.geojson")
		.then(function(response){
			if (!response.ok) {
				throw new Error("HTTP error, status = " + response.status);
			}
			return response.json();
		})
		.then(debugCallback)
};

//call the initialize function when the document has loaded
document.addEventListener('DOMContentLoaded',initialize)
//$(document).ready(initialize);*/

  //fetch function
  fetch('data/MegaCities.geojson')
  //retrieve data
  .then(function(response){
	  //convert data to usable form
	  return response.json();
  })
  //fire callback
  .then(callback)

  //callback function
  function callback(response){
	  console.log(response)
  }
