//execute script when window is loaded
window.onload = function(){

	//SVG dimension variables
    var w = 900, h = 500;

     //Example 1.2 line 1...container block
    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container"); //always assign a class (as the block name) for styling and future selection



};