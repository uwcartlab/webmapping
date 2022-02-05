function debugCallback(response){
	document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
};

function debugAjax(){
	
	var myData;
	
	fetch("data/MegaCities.geojson")
		.then(function(response){
			debugCallback(response);
		})

	document.querySelector("#mydiv").insertAdjacentHTML('beforeend' '<br>GeoJSON data:<br>' + JSON.stringify(myData))
};

document.querySelector("#mydiv").insertAdjacentHTML('beforeend', 'GeoJSON data: ' + JSON.stringify(myData))
