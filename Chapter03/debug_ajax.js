function debugCallback(response){
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(mydata))
};

function debugAjax(){
	
	var mydata;
	
	fetch("data/MegaCities.geojson")
		.then(function(response){
			return response.json();
		})
		.then(function(response){
			debugCallback(mydata);
		})

	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(mydata))
};

document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(mydata))
