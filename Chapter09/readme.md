### [Return Home](../../../) | [Previous Chapter](../Chapter08) | [Next Chapter](../Chapter10)

Chapter 9: Mapping with D3
===========================

Now that you have a basic understanding of some foundational D3 concepts, it is time to make a map! Chapter 9 includes two shorter lessons as you work on your final project proposal and ends with Activity 9, creating your first D3 map.

-   In Lesson 1, we cover some useful ancillary tools and techniques, including the TopoJSON data format, the MapShaper web application, and `Promise.all()` for combining multiple AJAX calls.
-   In Lesson 2, we tackle the somewhat complex but vital topic of D3 map projections, walking through D3's projection and path generators to map spatial data as vector linework in the browser.

After this chapter, you should be able to:

-   Convert shapefile and GeoJSON data into TopoJSON format, import data from multiple files to the DOM, and translate TopoJSON data into GeoJSON for display in the browser.
-   Implement an appropriate projection for your choropleth map using a D3 projection generator, correctly manipulate its projection parameters, and draw geometries from spatial data using path generators.

Lesson 1: D3 Helper Tools and Techniques
----------------------------------------

### I. An Introduction to TopoJSON

_**[TopoJSON](https://github.com/mbostock/topojson/wiki)**_ is the first geospatial data format for the Web that encodes topology. As briefly introduced in Chapter 3, _**topology**_ describes the digital encoding of spatial relationships of connected/unconnected, adjacent/detached, inside/outside, etc., into data captures of geographic phenomena. We did not worry much about topology for Lab 1, as the map only drew points rather than lines or polygons (technically, the proportional symbols were polygonal SVGs, but centered on a single point spatial coordinate). Topology is important for rendering polygons for the Lab 2 choropleth map.

For desktop GIS software, [topology](http://webhelp.esri.com/arcgisserver/9.3/java/index.htm#geodatabases/topology_basics.htm) is encoded by coverage and geodatabase file formats but not in shapefiles. The advantages of topological data formats over "spaghetti model" data formats such as shapefiles and GeoJSON are threefold:

1.  Data integrity can be maintained when features are edited; in other words, editing feature boundaries will not result in gaps or overlaps between features.
    
2.  Spatial analysis using the relationships between features is easier to perform.
    
3.  File size is significantly reduced because overlapping vertices and feature edges are eliminated.
    

This last point is especially important for mapping vector data on the Open Web. While bandwidths and processors are constantly improving, datasets also are growing in size and a significant performance penalty remains for loading very large datasets into the browser, particularly on mobile networks. The GeoJSON format was designed based on the [Simple Features standard](http://www.opengeospatial.org/standards/sfa), and stores points, lines, and polygons as individual features in a `FeatureCollection`. Thus, in any polygon dataset, each line that forms an edge between two polygons is duplicated—it is stored separately for each feature that uses it.

The TopoJSON format, created by D3 creator Mike Bostock, eliminates all of this duplicate data by implementing topology using JSON syntax. TopoJSON files are a fraction of the size of the equivalent data as GeoJSON, making them much faster to draw in the browser. Rather than storing all of the vertices as coordinate arrays for each feature, TopoJSON stores a list of Arcs for each feature, a separate list of arc coordinates, and a mathematical transform to georeference those coordinates within the [EPSG:4326/WGS 84](https://spatialreference.org/ref/epsg/4326/) coordinate reference system.

Examples 1.1 and 1.2 show a single, relatively simple polygon feature stored as GeoJSON and TopoJSON, respectively. Compare these two examples and notice the differences in data structure.

###### Example 1.1: A single polygon feature stored as GeoJSON

    {
        "type":"FeatureCollection",
        "features":[
            {
                "type":"Feature",
                "properties":{
                    "state_name": "Wyoming", 
                    "state_abbr": "WY" 
                },
                "geometry":{
                    "type":"Polygon",
                    "coordinates": "coordinates": [[[[ -104.053615218999937, 41.698218275000045],[-104.055500523999967, 41.564222413000039], [-104.054012400999966, 41.388085778000061],[-104.051705514999981, 41.003211293000049],[-104.934492918999979, 40.994289187000049],[-105.278797588999964,40.996349174000045],[-106.203471511999965,41.000085022000064],[-106.329125680999937,41.001289],[-106.865438809999944 40.998457391000045], [-107.304051023999989,41.00013330400003], [ -107.918671398999948,41.00337509700006],[-109.048314686999959, 40.998433406000061],[-110.00216547399998, 40.997599516000037],[-110.06318571099996, 40.997891898000034],[-111.051022486999955, 40.996583587000032],[-111.051651076999974, 41.258425395000074],[-111.051068799999939, 41.578592387000072],[-111.048697417999961, 41.996203295000043],[-111.04678030599996, 42.503251909000028],[-111.049215716999981, 43.019883078000078],[-111.047498205999943, 43.284734597000067],[-111.04677118799998, 43.515528276000055],[-111.05040519, 43.982553399000039],[-111.051560574999939, 44.47332321500005],[-111.051615797999943, 44.66449048100003],[-111.053428576999977, 44.995695515000079],[-110.429649506999965, 44.992285100000061],[-110.392759901999966, 44.998625293000032],[-109.99552922099997, 45.002792876000058],[-109.799385399999949, 44.999522798000044],[-108.625256221999962, 44.997593201000029],[-108.259238510999978, 45.000115177000055],[-107.894374423999977, 44.999773685000036],[-106.259231721999981, 44.996162477000041],[-106.021150717999944, 44.99721368400003],[-105.085003080999968, 44.999817096000072],[-105.04179602499994, 45.001075883000055],[-104.05984237499996, 44.997336305000033],[-104.059465086999978, 44.574352593000071],[-104.0610362, 44.181825304000029],[-104.059731410999973, 44.145825485000046],[-104.059479384999975, 43.852906590000032],[-104.05791391799994, 43.503712292000046],[-104.05915747399996, 43.479133918000059],[-104.056198893999976, 43.003062306000061],[-104.056219407999947, 42.614669706000029],[-104.053513423999959, 41.999815384000044],[-104.053615218999937, 41.698218275000045]]]]
                }
            }
        ]
    }


###### Example 1.2: The same polygon feature as in Example 1.1, stored as TopoJSON

    {
        "type":"Topology",
        "transform":{
            "scale":[0.005969073369138957, 0.003429002300256637],
            "translate":[-111.05342857699998,40.99428918700005]
        },
        "arcs":[[[1173,205],[-1,-39],[1,-51],[0,-112],[-148,-3],[-58,1],[-154,1],[-22,0],[-89,-1],[-74,1],[-103,1],[-189,-2],[-160,0],[-10,0],[-166,0],[0,76],[0,93],[1,122],[0,148],[0,151],[0,77],[0,67],[0,136],[-1,144],[0,55],[0,97],[105,-1],[6,2],[66,1],[33,-1],[197,-1],[61,1],[61,0],[274,-1],[40,0],[157,1],[7,0],[165,-1],[0,-123],[-1,-114],[1,-11],[0,-85],[0,-102],[0,-7],[0,-139],[0,-113],[1,-180],[0,-88]]],
        "objects":{
            "example":{
                "type":"GeometryCollection",
                "geometries":[
                    {
                        "arcs":[[0]],
                        "type":"Polygon",
                        "properties": {
                            "state_name": "Wyoming",
                            "state_abbr": "WY"
                        }
                    }
                ]
            }
        }
    }


In Example 1.1, all data related to the polygon feature is stored in a single `"Feature"` object within the `"features"` array (lines 4-14). In Example 1.2, identifying data related to the polygon feature is stored in a `"Polygon"` object within the '"geometries"' array (lines 12-19), while the `"arcs"` used by that feature are stored in a separate array that contains other arrays with integers (line 7). Since each decimal must be stored in the computer's memory as an 8-bit character, storing integers rather than float values further reduces the file size in addition to the reduction achieved by eliminating line duplication. The `"transform"` (Example 1.2 lines 3-6)—like the information stored in the ._prj_ file of a shapefile—is a mathematical function applied to each integer to turn it into a geographic coordinate.

While Example 1.2 appears to contain more lines of code, keep in mind that the line breaks were added to improve human readability. If you were to save each example as a separate file, you would discover that the size of the GeoJSON file is 2.0 KB, whereas the TopoJSON is only 699 bytes—less than half the GeoJSON size, even without any shared feature edges to eliminate.

### II. Using Mapshaper to Simplify and Convert Spatial Data

The major downside to using TopoJSON is that it is under-supported by major desktop GIS software, making converting data to TopoJSON a bit tricky. There is a [command-line tool](https://github.com/topojson/topojson/blob/master/README.md#command-line-reference) available, but it can be difficult to install and work with. Fortunately, there are now at least two web applications that can do the work for us. You already know about one of them, [geojson.io](http://geojson.io/), from Chapter 3. In this tutorial, we will make use of the second: [MapShaper](http://mapshaper.org/).

_**MapShaper**_ is a line and polygon simplification tool developed and maintained by New York Times Graphics Editor (and UW-Madison alum!) Matthew Bloch. As discussed in lecture, geospatial data often need to be generalized for interactive web maps, sometimes at different scales for slippy web maps. Line generalization is especially important for mobile-first design to simplify overly-complex geometry. For the D3 map, you will want to balance keeping your geographic areas recognizable with minimizing the data size to maximize the speed of drawing and interaction in the browser. This tradeoff almost certaintly requires simplifying your chosen spatial data. MapShaper has the added benefit of converting from shapefiles, GeoJSON, or other "flat" files without topology (e.g., DBF and CSV) into TopoJSON as part of the generalization export process.

The following lessons make use of two GeoJSON files: [_usStates.geojson_](data/usStates.geojson "midwestStates.geojson") and [_midwestStates.geojson_](data/midwestStates.geojson "midwestStates.geojson"). You should replace these with your own chosen geospatial datasets gathered for your D3 map as part of Activity 8. If you are still searching for polygonal linework, a good source for global- and country-scale data for D3 mapping is [Natural Earth](http://www.naturalearthdata.com/). Other sources may require that you first convert the coordinate system to EPSG:4326/WGS 84 using desktop GIS (try some Google Fu to determine how to do this in your preferred GIS software). If you are working with shapefiles, delete any extra attributes from your dataset to reduce the file size, leaving just the attribute field you will use for joining your multivariate CSV data prepared for Activity 8.

> **Find your polygon data, confirm it is in EPSG:4326 in desktop GIS, and strip extra attributes.**

The next step is to navigate to [mapshaper.org](http://mapshaper.org/) and import your geospatial dataset(s) by dragging them into the browser. Shapefiles should be dragged into the browser as a single, compressed _.zip_ file. If formatted correctly, your data should appear immediately as linework against a blank backdrop. If it does not appear, go back to your desktop GIS software and check that you have removed any projection information by assigning EPSG:4326 as the CRS.

Once you see your data, select "Simplify" in the upper-right-hand corner of the web page. You are presented with a choice of three simplification methods; their differences usually does not matter for simplified interactive web mapping, as they converge the more the linework is simplified. Click "Next" and then use the slider at the top of the page to simplify the linework (Figure 1.1). When you are satisfied with the appearance of the linework (use your cartographic judgement!), click on "Export" in the upper-right corner, then select "TopoJSON". Save the file in the _data_ folder of your _unit-3_ website directory and change the file extension from _.json_ to _.topojson._

![figure9.1.1.png](img/figure9.1.1.png)

###### Figure 1.1: Simplifying spatial data in MapShaper

> ### **Simplify your spatial data and convert it to TopoJSON format using mapshaper. Save the resulting TopoJSON in the _data_ folder of your _unit-3_ directory, changing the file extension to _.topojson_.**

Note: For Mac users, you may need to right click the file, go to "Get Info" and rename it in "Name & Extension" to change the file extension from .json to .topojson.

### III. Using Promises to Load Data into the DOM

At this point, you should have at least one TopoJSON file for your spatial data (this tutorial uses two) and one CSV file for your attribute data. The attribute CSV should be a table of geographic features that includes an identifying attribute shared with the spatial data (Figure 1.2, column C) and at least five quantitative attributes that are of interest to you (columns D-H). Replace the [sample data](data/greatLakesEnergyStats.csv "greatLakesEnergyStats.csv") in Figure 1.2 with your own chosen dataset.

![figure9.1.2.png](img/figure9.1.2.png)

###### Figure 1.2: An example multivariate dataset

The next task is to load _all_ of our data files into the DOM using the AJAX concepts first introduced in Chapter 3. In particular, think about how AJAX callbacks work: after each data file is loaded, the data is passed to a callback function. It only can be accessed within that function because it is loaded asynchronously with the rest of the script. But what if you want to access data from multiple external files or continuous data streams? You could load the files in series, calling an AJAX method for the third file within the callback of the second file and calling the AJAX method for the second file within the callback of the first—in essence, nesting the callback functions and accessing the data from the innermost callback, or by using a string of `.then()` methods. However, it quickly becomes unwieldy to keep track of the scripts within these nested callback methods. Further, one dataset in the series may load but others may not, producing potential errors when rendering and interacting with the map.

There is a simpler _and_ more efficient way to load multiple datasets into the browser using JavaScript: promises. Recall from Chapter 3 that a **_promise_** is a placeholder JavaScript object that represents and eventually stores the completion of asynchronous processes, such as loading data. The [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method supports multiple AJAX calls, firing a single callback function containing all loaded datasets once the final dataset is loaded.

Create a promise to load your datasets within a `setMap()` function in _main.js._ The `setMap()` function should contain a single, unnamed D3 block that uses a call to the `Promise.all()` method (Example 1.3).

###### Example 1.3: Loading data streams with `Promise.all()` in _main.js_

    //begin script when window loads
    window.onload = setMap();
    
    //set up choropleth map
    function setMap(){
        //use Promise.all to parallelize asynchronous data loading
        var promises = [
            d3.csv("data/greatLakesEnergyStats.csv"),
            d3.json("data/midwestStates.topojson"),
            d3.json("data/usStates.topojson"),
        ];
        Promise.all(promises).then(callback);
    };


In Example 1.3, the methods [`d3.csv()`](https://github.com/d3/d3-request/blob/master/README.md#csv) and [`d3.json()`](https://github.com/d3/d3-request/blob/master/README.md#json) are AJAX methods similar to `fetch()`. D3 provides many convenient [AJAX methods](https://github.com/d3/d3-request/blob/master/README.md) that can be used individually or as part of a promise. These normally are called with a URL and callback as their own parameters, but `Promise.all()` only uses the AJAX method name and takes care of the rest.

Once we have set up our `Promise.all()` block, we can write the callback function. Place this function within `setMap()` so that it can make use of local variables that will be added later (Example 1.4).

###### Example 1.4: Adding a callback to `setMap()` in _main.js_

    //Example 1.3 line 4...set up choropleth map
    function setMap() {
        //use Promise.all to parallelize asynchronous data loading
    
        var promises = [
            d3.csv("data/unitsData.csv"),
            d3.json("data/EuropeCountries.topojson"),
            d3.json("data/FranceRegions.topojson"),
        ];
        Promise.all(promises).then(callback);
    
        function callback(data) {
            var csvData = data[0],
                midwestData = data[1],
                statesData = data[2];
            console.log(csvData);
            console.log(midwestData);
            console.log(statesData);
        }
    }


The `console.log()` statements print the results to separate lines of the console. As you can see in Figure 1.3, `d3.csv()` automatically formats the imported CSV data as an array, and `d3.json()` formats the spatial data as an object.

![figure9.1.3.png](img/figure9.1.3.png)

###### Figure 1.3: Results of Promise.all() callback

> ### **Load your datasets using a JavaScript promise and confirm the data are loading correctly using the console.**

### IV. Using Topojson.js to Translate TopoJSON

D3, Leaflet, and other web mapping libraries do not natively support TopoJSON data. Rather, to use our TopoJSON, we need to convert it _back_ to GeoJSON within the DOM. Accordingly, it may seem counterintuitive to use TopoJSON at all. However, we still saved the user's bandwidth and data plan by loading the smaller TopoJSON file, and still can make use of the topology in the original TopoJSON to speed more advanced spatial analyses in browser.

We will use Mike Bostock's small `topojson.js` library to convert TopoJSON to GeoJSON in browser.

> ### **Download [topojson.js](https://github.com/topojson/topojson/releases/tag/v3.0.2) (search for "latest release", and download the "topojson.zip"), and place it in your _lib_ folder. Add a script link in _index.html_.**

As explained in the `topojson.js` [API Reference](https://github.com/topojson/topojson/blob/master/README.md), the `topojson.feature()` method translates TopoJSON to GeoJSON. The `topojson.feature()` method takes two parameters: the variable holding the TopoJSON data (created from our callback in Example 1.4) and the object within that variable containing the TopoJSON formatted data we want to convert (Example 1.5).

###### Example 1.5: Converting TopoJSON to GeoJSON in _main.js_

        function callback(data){        
        		...
        		
            //translate europe TopoJSON
            var midwestStates = topojson.feature(midwestData, midwestData.objects.midwestStates),
                usStates = topojson.feature(statesData, statesData.objects.usStates);

            //examine the results
            console.log(midwestStates);
            console.log(usStates);
        };


In Example 1.5, each TopoJSON object is passed as the first parameter to `topojson.feature()`. The second parameter is the object that holds the details unique to each dataset. In Example 1.5 (line 6), this object was named `"midwestStates"`; for our tutorial, the TopoJSON retains the name of the original file that was passed through MapShaper. Note, however, that if you change the name of your file after you convert through MapShaper, the name of the object within the file will not change.

Once the data has been translated and assigned to variables, we can examine those variables in the console and see that they are now GeoJSON `FeatureCollection`s:

![figure9.1.4.png](img/figure9.1.4.png)

###### Figure 1.4: GeoJSON data created in the DOM by topojson.js

> ### **In _main.js_, use `Promise.all()` to load your TopoJSON and CSV data into the DOM. Use _topojson.js_ to translate the imported data into GeoJSON format for mapping with D3.**

Lesson 2: D3 Projections and Path Generators
--------------------------------------------

### I. Creating a D3 Projection

Now that you have imported your geospatial data, the next step is to project it. Start by reviewing map projections, one of the more complex topics in cartography. 

A _**projection**_ is a mathematical translation from a 3D model of the Earth (called the _reference globe_) to a two-dimensional plane (called the _developable surface_). Projection equations stretch geographic coordinates based on a spheroid, ellipsoid, or geoid model of Earth so that they can be displayed on a planar (two-dimensional) surface, such as your computer screen.

Projections vary by the shape of the plane (_**class**_), by how many times the plane intersects the ellipsoid (_**case**_), and by rotation angle of the plane from north (_**aspect**_). Projections also vary in the topological property they preserve from the original 3D model, distorting others: areas, distances, directions, and/or angles (sometimes described as "shape", although no projection preserves shape). If this is unfamiliar to you, we recommend reviewing the [Map Projections](https://gistbok-topics.ucgis.org/CV-03-006) entry in the GIS&T Body of Knowledge.

Figure 2.1 demonstrates the distortion that occurs in even the simplest of projections, the Plate Carrée, an equidistant cylindrical projection. This projection is produced by the set of equations \[x = λ, y = ϕ\], where x and y are horizontal and vertical coordinates on a two-dimensional Cartesian grid, λ (lamda) is longitude, and ϕ (phi) is latitude.

![figure9.2.1.gif](img/figure9.2.1.gif)

###### Figure 2.1: Projecting the globe onto a two-dimensional surface using the Plate Carrée projection ([original graphic](http://bl.ocks.org/mbostock/5731632) by Mike Bostock)

Fortunately for us, modern desktop GIS software does the dirty work of applying projections to our chosen spatial datasets, meaning we usually do not have to learn the complex math behind projections. We instead select the projection that is cartographically appropriate given the type and scale of the map we want to make. We recommend [Projection Wizard](https://projectionwizard.org/) to help inform an appropriate projection for your Lab 2 map, making sure it is equal-area given we are making a choropleth map!

Unfortunately for cartographers, the advent of tile-based slippy maps—such as the one you created for your Leaflet map—has led to one projection dominating maps on the Web: so-called [Web Mercator](https://en.wikipedia.org/wiki/Web_Mercator). This projection was created and popularized by Google in the mid-2000's; before it was assigned an official EPSG code (now 3857), it was unofficially referenced using the code EPSG:900913—a clever pun. It was chosen by Google for its technical advantages: it is a relatively simple equation, a cylindrical projection that can be made infinitely continuous to the east and west, and approximately conformal so it preserves angles at high latitudes, making it good for navigation at local zoom levels anywhere on the planet. But for thematic mapping, it suffers from the disadvantage of severe area distortion at high latitudes, exaggerating the land area of the northern hemisphere (e.g., Greenland appears to be larger than Africa when in reality it is much smaller). While it is possible to make slippy map tilesets in other projections, it remains rare.

However, D3 presents an opportunity to break from Web Mercator, supporting supports hundreds of different map projections thanks to the collaboration between Mike Bostock and data visualization artist [Jason Davies](https://www.jasondavies.com/). Several common projections are included in D3 through the [Geo Projections](https://d3js.org/d3-geo/projection) portion of the library (Figure 2.2). But many others can be added through the [Extended Geographic Projections](https://github.com/d3/d3-geo-projection/) and [Polyhedral Geographic Projections](https://github.com/d3/d3-plugins/tree/master/geo/polyhedron) plugins. Not only can you choose which projection to use with your spatial data; you can change virtually any parameter that goes into each projection. D3 even enables you to smoothly transition between [different projections](http://bl.ocks.org/mbostock/3711652) and [projection parameters](https://www.jasondavies.com/maps/transition/).

![figure9.2.2.png](img/figure9.2.2.png)

###### Figure 2.2: Projections included in D3's Geo Projections module

In the script, D3 implements projections using projection generators. Recall from Chapter 8 that a D3 generator is a function that is returned by a D3 generator method and stored in a local variable. Any D3 projection method will return a _**projection generator**_, which must then be fed into the [`d3.geoPath()`](https://gistbok-topics.ucgis.org/CV-03-006) method to produce _another_ generator: the path generator. Finally, the path generator is accessed within a selection block to draw the spatial data as path strings of the `d` attributes of SVG `<path>` elements. This process will become clearer as we build our generators below.

Let's start with the projection generator (Example 2.1). In this example, we will work with an [Albers equal-area conic projection](https://en.wikipedia.org/wiki/Albers_projection) centered on the U.S. Midwest. You may wish to follow the example at first, then choose a different projection and/or edit the parameters to make the projection appropriate for your data.

###### Example 2.1: Creating an Albers projection generator in _main.js_

    //Example 1.3 line 4...set up choropleth map
    function setMap() {
        //map frame dimensions
        var width = 960,
            height = 460;

        //create new svg container for the map
        var map = d3.select("body")
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
            d3.json("data/midwestStates.topojson"),
            d3.json("data/usStates.topojson"),
        ];
        Promise.all(promises).then(callback);
    }

In Example 2.1, before we can create the projection, we first write a `map` block to append the `<svg>` container that will hold the map and give it dimensions of 960 pixels by 460 pixels (lines 4-13). To create the projection, we use the [`d3.geoAlbers()`](https://d3js.org/d3-geo/conic#geoAlbers) projection method (line 16). The four operators on lines 17-20 are D3's way of implementing mathematical [projection parameters](https://d3js.org/d3-geo/projection):

-   [`.center()`](https://d3js.org/d3-geo/projection#projection_center) specifies the \[longitude, latitude\] coordinates of the center of the developable surface.
    
-   [`.rotate()`](https://d3js.org/d3-geo/projection#projection_rotate) specifies the \[longitude, latitude, and roll\] angles by which to [rotate the reference globe](http://bl.ocks.org/mbostock/4282586). 
    
-   [`.parallels()`](https://d3js.org/d3-geo/conic#conic_parallels) specifies the two standard parallels of a conic projection. If the two array values are the same, the projection is a _**tangent**_ case (the plane intersects the globe at one line of latitude); if they are different, it is a _**secant**_ case (the plane intersects the globe at two lines of latitude, slicing through it).
    
-   [`.scale()`](https://d3js.org/d3-geo/projection#projection_scale) is a factor by which distances between points are multiplied, increasing or decreasing the scale of the map.

The fifth parameter, [`.translate()`](https://d3js.org/d3-geo/projection#projection_translate) (line 21), offsets the pixel coordinates of the projection's center in the `<svg>` container. Keep these as one-half the `<svg>` width and height to keep your map centered in the container.

Note that D3's projection parameters differ somewhat from the [projection parameters](http://help.arcgis.com/en/geodatabase/10.0/sdk/arcsde/concepts/geometry/coordref/coordsys/projected/mapprojections.htm) commonly used by desktop GIS software. Rather than treating the projection centering holistically, D3 breaks it down into the position of the reference globe and the developable surface. The first two values given to `.rotate()` specify the reference globe's central meridian and central parallel, while `.center()` specifies the latitude and longitude of the developable surface's center. For conic projections, in order to keep north "up" in the center of the map and minimize distortion in your area of focus, you should keep the `.center()` longitude and `.rotate()` latitude each as `0` and assign the center coordinates of your chosen area as the `.center()` latitude and `.rotate()` longitude (Example 1.4 lines 17-18). If the geometric reasons for this are hard to grasp, you can experiment with different parameter values and see their effects using the Albers projection demonstration web app linked below.

> ### **Experiment with the uwcartlab [D3 Albers Projection Demo](https://uwcartlab.github.io/d3-projection-demo/) web application to see how different D3 parameter values affect the Albers projection. Then, visit the [D3 Geo-Projections](https://d3js.org/d3-geo/projection#projections) page and the [Extended Geographic Projections](https://github.com/d3/d3-geo-projection/) page and choose a projection to implement that is cartographically appropriate given your chosen data. Make sure the selected projection is <ins>_equal-area_</ins>! Write the projection block for your chosen projection in _main.js_.**

### II. Drawing Projected Data

Having created a projection function, we can now apply it to our spatial data to draw the represented geographies. In order to do this, we need to use `d3.geoPath()` to create a _**path generator**_ (Example 2.2).

###### Example 2.2: Creating a path generator in _main.js_

        //Example 2.1 line 15...create Albers equal area conic projection centered on the Midwest
        var projection = d3.geoAlbers()
            .center([-88.3, 42.6])
            .rotate([49, 36, 17])
            .parallels([37, 45])
            .scale(1600)
            .translate([width / 2, height / 2]);
    
        var path = d3.geoPath()
            .projection(projection);


Creating the path generator is straightforward—we just create a two-line block, first calling `d3.geoPath()`, then using the `.projection()` operator to pass it our projection generator as the parameter (lines 9-10). The variable `path` now holds the path generator. Apply it to draw the geometries from our spatial data (Example 2.3).

###### Example 2.3: Drawing geometries from spatial data in _main.js_

    //Example 1.5 line 1
    function callback(data){               
        
         ...
        //Midwest States requires .features at the end of the declaration, since we will be styling each feature individually
        var usStates = topojson.feature(statesData, statesData.objects.usStates),
            midwestStates = topojson.feature(midwestData, midwestData.objects.midwestStates).features;

        //add US States countries to map
        var states = map
            .append("path")
            .datum(usStates)
            .attr("class", "us")
            .attr("d", path);

        //add Midwest States to map
        var midwest = map
            .selectAll(".midwest")
            .data(midwestStates)
            .enter()
            .append("path")
            .attr("class", function (d) {
                return "midwest " + d.properties.state_abbr;
            })
            .attr("d", path);
    };


In Example 2.3, we add two blocks: one for the background countries (lines 8-11) and one for the regions that will become our choropleth enumeration units (lines 14-21). Because the `states` block takes the `usStates` GeoJSON `FeatureCollection` as a single datum, all of its spatial data is drawn as a single feature. A single SVG `<path>` element is appended to the map container, and its `d` attribute is assigned the `path` generator. This automatically passes the datum to the `path` generator, which returns an SVG path coordinate string to the `<path>` element's `d` attribute. (Do not confuse the `<path> d` attribute with the variable `d` that iteratively holds each datum in a `.data()` block, such as on line 18 of Example 2.3). To recall what a path coordinate string looks like, review Chapter 6 or see Figure 2.3.

To create our enumeration units, we use the `.selectAll().data().enter()` chain to draw each feature corresponding to each Midwest state separately (lines 14-16). Recall that `.data()` requires its parameter to be in the form of an array, whereas `topojson.feature()` converts the TopoJSON object into a GeoJSON `FeatureCollection` object. 

For our `midwest` block to work, we need to pull the array of features out of the `FeatureCollection` and pass that array to `.data()`, so we tack on `.features` to the end of line 5 to access it. Once that is done, a new `<path>` element is appended to the map container for each region (line 17). Two class names are assigned to each `<path>`: the generic class name `regions` for all enumeration units and a unique class name based on the states's `state_abbr` attribute (lines 18-20). Each `<path>` is then drawn with the region geometry by the `path` generator (line 21).

Now we can see our geometries in the browser and use the inspector to distinguish each individual `<path>` element (Figure 2.3).

![figure9.2.3.png](img/figure9.2.3.png)

###### Figure 2.3: Spatial geometries drawn in the browser

If you think you have done everything right so far but you do _not_ see your geometries in the browser—particularly if you get a bunch of seemingly random lines or polygons, or just a black map container—it is likely that your geospatial data was projected into something other than EPSG:4326/WGS 84. In this case, D3 attempts to project the already projected data, resulting in visual chaos. If your data is projected, you will need to return to Lesson 1 and "reproject" your data to "unprojected" EPSG:4326/WGS 84 before you can continue.

Obviously, we do not want our map to be colored default black-and-white. We will color these regions dynamically to produce a choropleth and allow the user to reexpress the mapped attribute in Chapter 10. We can add an outline of the US states for reference, or similar context features for your Lab 2, by adding some simple styles to _style.css_ (Example 2.4). 

###### Example 2.4: Styling state borders in _style.css_

    .us {
        fill: #fff; 
        stroke: #CCC;
        stroke-width: 1px;
    }
    .midwest {
        stroke: #fff;
        stroke-width: 1px;
        stroke-linecap: round;
    }

Here, we styled the background states (i.e. `.us`) differently than the Midwest states (i.e. `.midwest`). The background states will be white with a gray outline, while the Midwest states have a white border around them. Figure 2.4 shows the result of our styling.

![figure9.2.4.png](img/figure9.2.4.png)

###### Figure 2.4: Styled country borders

We can also use CSS to add a background color and outline to the map frame.

###### Example 2.5: adding background style in _style.css_

    .map {
        border: medium solid #999;
        margin: 10px 0 0 20px;
        background:#D5E3FF;
    }

The result can be seen in Figure 2.5.

![figure9.2.5.png](img/figure9.2.5.png)

Feel free to get more creative than this default style in your own D3 Lab 2 assignment.

> ### **Create a path generator and use it to draw your background geometry and enumeration units in the browser. Style your background geometry in _style.css_.**

## Activity 9

1.  Simplify your spatial data and convert it to TopoJSON format.
2.  Use `Promise.all()` to load your spatial data TopoJSON files and multivariate attribute CSV file into your _main.js_ script.
3.  Choose a projection to use with your choropleth map and create the appropriate D3 projection generator.
4.  Add appropriate styles in _style.css_.
5.  Commit and sync your _unit-3_ directory (including the TopoJSON) with the commit message "Activity 9".

_This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/). <br/> For more information, please contact Robert E. Roth \(reroth@wisc.edu\)._

### [Return Home](../../../) | [Previous Chapter](../Chapter08) | [Next Chapter](../Chapter10)
