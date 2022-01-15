function debugCallback(response){
	$("#mydiv").append('GeoJSON data: ' + JSON.stringify(response));
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

debugAjax();