//execute script when window is loaded
window.onload = function(){

	//SVG dimension variables
    var w = 900, h = 500;

    //Example 1.4 line 1...container block
    var container = d3.select("body") //get the <body> element from the DOM
        .append("svg") //put a new svg in the body
        .attr("width", w) //assign the width
        .attr("height", h) //assign the height
        .attr("class", "container") //assign a class name
        .style("background-color", "rgba(0,0,0,0.2)") //svg background color
        .append("rect") //add a <rect> element
        .attr("width", 800) //rectangle width
        .attr("height", 400) //rectangle height

    // <rect> is now the operand of the container block
    console.log(container);


};