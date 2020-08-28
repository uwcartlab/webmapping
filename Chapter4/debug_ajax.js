function debugCallback(response){
	
	$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));
};

function debugAjax(){
	
	var mydata;

	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
			
			debugCallback(mydata);
		}
	});

	$(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(mydata));
};

$(mydiv).append('GeoJSON data: ' + JSON.stringify(mydata));