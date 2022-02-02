### [Return Home](../../../) | [Previous Chapter](../Chapter01) | [Next Chapter](../Chapter03)

Chapter 2: Scripting and Debugging
=================================

Congratulations on completing your first successful chapter of Web Mapping! You now have created your first GitHub repo (Activity 1) and completed foundational tutorials for developing on the Open Web (Activity 2). Chapter 2 includes four lab lessons and ends with Activity 3, a debugging exercise to test your knowledge on JavaScript.

*   In Lesson 1, we review the Document Object Model (DOM) and the ways that browsers interpret content on the web.
*   In Lesson 2, we review JavaScript basics, including syntax rules for variables, functions, and the flow of execution. Lessons 1 and 2 are largely review from the Codecademy tutorials.
*   In Lesson 3, we discuss ways to write JavaScript more efficiently.
*   In Lesson 4, we discuss tips and tricks for debugging using the console.

After this chapter, you should be able to:

*   Inspect the Document Object Model (DOM) in any browser
*   Write variables, functions, and control structures in JavaScript
*   Select and manipulate elements in the DOM
*   Use the browser console to debug basic flaws in your code

Getting Started
---------------

Begin Chapter 2 by opening your _unit-1_ directory from Chapter 1. First view the contents of the _Chapter02_ subdirectory, which includes two _.js_ files. Then, navigate to the _boilerplate_ subdirectory and select all of the contents. Copy these files and paste them into _Chapter02_. Move the original two _.js_ files to the appropriate folder.

> ### **Copy your _unit-1/boilerplate_ files for use in Chapter 2. Your _Chapter02_ subdirectory should now include the HTML boilerplate and additional code snippets for the Chapter 2 lessons, including your debugging assignment.**

Lesson 1: Exploring the DOM
---------------------------

### I. Introduction to the DOM

The Document Object Model, or _**DOM**_, is the standard tree structure, called the **_DOM tree_**, for organizing objects within a webpage (i.e., a "document"). The DOM is _cross-platform_ and _language-independent_, meaning that it is not a specific language or technology, but a convention on how any language should structure a document. For instance, Figure 1.1 visualizes the DOM tree for the HTML boilerplate introduced in Chapter 1, showing how the DOM tree grows in complexity for even simple webpages. 

![figure2.1.1.png](img/figure2.1.1.png)

###### Figure 1.1: Boilerplate DOM tree

The DOM includes all CSS styles and JavaScript variables, properties, and functions in addition to the HTML elements and their attributes. Importantly, JavaScript and other scripting languages reference objects through the DOM to enable interactivity on the web, including cartographic interaction. Accordingly, interactive web maps would be impossible without the DOM. 

Thus, reading and revising code based on the DOM is a critical skill for efficient web development.

### II. The Inspector

Every browser has a set of **_developer tools_** that support coding on the Open Web. The _**inspector**_ tool identifies a given HTML element within the DOM structure.

You can activate the inspector on any webpage using right-/command-click and selecting "Inspect" or "Inspect Element" (the specific language varies by browser). Activating the inspector opens the _**inspector tab**_ of the developer toolbox along the bottom or the side of the browser. Hovering over an HTML element in the inspector tab highlights the corresponding element in the webpage, also indicating the [margin or padding](https://www.w3schools.com/css/css_boxmodel.asp) associated with the element. You can click the right-facing arrow to open any element in the inspector tab to reveal the next nested level in the DOM. 

If you click the box-arrow icon in the top-left of the inspector tab (a magnifying glass icon in some browsers), you then can hover over the webpage itself and identify the location of the highlighted HTML element in the DOM. Figure 1.2 shows the inspector tab in the Firefox browser, with the `<body>` element selected.

![figure2.1.2.png](img/figure2.1.2.png)

###### Figure 1.2: The Firefox Inspector

You also can activate the inspector through the browser "Tools"/"Developer Tools" menu or the F12 keyboard shortcut. 

> ### **Open the _index.html_ HTML boilerplate from your _Chapter02_ subdirectory using a browser and see how the HTML tree is structured using the inspector.**

The inspector primarily shows the HTML elements contained in the DOM and not the attributes, styles, and scripts also included in the DOM. Most browsers have a _**DOM tab**_ (it will go by different names across browsers) that displays the _entire_ DOM of a webpage, but the added complexity often is difficult to interpret for the purposes of debugging. We will return to additional developer tools in subsequent lessons that facilitate interpretation of other aspects of the DOM.

Lesson 2: JavaScript Basics
---------------------------

### I. Computational Thinking

As introduced in Chapter 1, _**JavaScript**_ is a web programming language for applying dynamic actions or behaviors to webpage content. In other words, JavaScript is the language of interaction on the web. In order to understand JavaScript, as any other scripting language, it is necessary to develop **_computational thinking_** skills, or the ability to think like a computer and work through the steps and processes taking place in a script. Journalist and interactive application developer [Tasneem Raja compares computational thinking to cooking](http://www.motherjones.com/media/2014/06/computer-science-programming-code-diversity-sexism-education):

> "_Like a good algorithm, a good recipe follows some basic principles. Ingredients are listed first, so you can collect them before you start, and there's some logic in the way they are listed:  olive oil before cumin because it goes in the pan first. Steps are presented in order, not a random jumble, with staggered tasks so that you're chopping veggies while waiting for water to boil. A good recipe spells out precisely what size of dice or temperature you're aiming for. It tells you to look for signs that things are working correctly at each stage—the custard should coat the back of a spoon. Opportunities for customization are marked—use twice the milk for a creamier texture—but if any ingredients are absolutely crucial, the recipe makes sure you know it. If you need to do something over and over—add four eggs, one at a time, beating after each—those tasks are boiled down to one simple instruction_."

Let's think about this analogy in terms of what you should know about JavaScript from the tutorial you completed:

*   _**variables**_ are the recipe ingredients
*   _**functions**_ are the cooking tasks
*   _**syntax rules**_ indicate how to precisely describe and measure each ingredient in the recipe
*   _**console logging**_ is like tasting the food throughout cooking to make small adjustments
*   _**conditional statements**_ indicate how to customize the recipe to different tastes
*   _**loops**_ indicate where to repeat a task

Additionally, _**comments**_ indicate to human readers of the script—including you the programmer, as your memory often is imperfect—how the code works. You should add a comment to the line above any piece of the script that may be indiscernible to others. There is room for judgement about what parts of the script are obvious versus requiring clarification; as you code more, you will get a better idea of where you need to add reminders about how the script works. You also can use comments to temporarily disable parts of the script to isolate code blocks while debugging (more on this later).

Let's build a simple example to explore the logic of JavaScript (Example 2.1).

> ### **Reopen the _index.html_ HTML boilerplate. Within the `<body>` of your _index.html_ file, add a `<div>` element with an `id` attribute of `"mydiv"` (do not forget to add a closing `</div>` tag). Open the _main.js_ file (also in your _Chapter02_ subdirectory) and add the Example 2.1 script. Make sure your _main.js_ file is linked through a `<script>` tag with a `src` attribute in _index.html_.**

###### Example 2.1: Accessing the `<div>` element through JavaScript in _main.js_

    var mydiv = document.getElementById("mydiv");
    mydiv.innerHTML = "Hello World";

In Example 2.1, you are accessing and manipulating `mydiv` using JavaScript rather than hard-coding the div content using HTML.

> ### **Open the HTML boilerplate directory in Prepros and preview _index.html_ in a browser. You should see "Hello World" printed into your `<div>` both in the webpage and in the DOM using the inspector (Figure 2.1).**

![figure2.2.1.png](img/figure2.2.1.png)

###### Figure 2.1: Using JavaScript to print text into a `<div>` element

It is best practice is to load any scripts _after_ the rest of the HTML document loads so that the browser does not perform actions on elements that do not yet exist. To do this, we can use the `window.onload` method to call a function containing our code (Example 2.2).

###### Example 2.2: Using `<window.onload>` in _main.js_

    function myFunc(){
        var mydiv = document.getElementById("mydiv");
        mydiv.innerHTML = "Hello World.";
    };
    
    window.onload = myFunc();

Unlike other programming languages, JavaScript is not picky about the order of functions and function calls. Nonetheless, it is standard practice to call `window.onload` last so the interpreter reads through everything once before reaching it.

> ### **Revise _main.js_ to use the `window.onload` method.**

Note that the code is neatly indented, similar to the nested structure of our HTML document. Everything within the `myFunc()` function is indented an extra tab to show that it is contained by the function. Again, while indentation is not required, keeping your code tidy makes it much more readable and easier to debug. JavaScript interprets either a semicolon or a line break as the end of a statement, but it is good to get in the habit of using semicolons so that if you ever minify your code (compress it to a single, continuous line without comments), you will not have to go back through and add the semicolons.

A **method** is a function association with a particular object. In most cases, this is a built-in function that you can use in your code, though you also can write your own. Later on, you will use web mapping libraries like Leaflet and D3, each of which has their own set of unique methods. For now, JavaScript has a number of native methods for manipulating the DOM, all accessed through the `document` object. Rather than introducing them all one-by-one, we slowly introduce these methods by example in the chapter lessons. Our focus instead is on following the computational logic when calling these methods. Carefully read through and consider the Example 2.3 script:

###### Example 2.3: Creating an HTML table using JavaScript in _main.js_

    //initialize function called when the script loads
    function initialize(){
        cities();
    };
    
    //function to create a table with cities and their populations
    function cities(){
        //define two arrays for cities and population
        var cities = [
            'Madison',
            'Milwaukee',
            'Green Bay',
            'Superior'
        ];
        var population = [
            233209,
            594833,
            104057,
            27244
        ];
    
        //create the table element
        var table = document.createElement("table");
    
        //create a header row
        var headerRow = document.createElement("tr");
    
        //add the "City" column
        var cityHeader = document.createElement("th");
        cityHeader.innerHTML = "City";
        headerRow.appendChild(cityHeader);
    
        //add the "Population" column
        var popHeader = document.createElement("th");
        popHeader.innerHTML = "Population";
        headerRow.appendChild(popHeader);
    
        //add the row to the table
        table.appendChild(headerRow);
    
        //loop to add a new row for each city
        for (var i = 0; i < cities.length; i++){
            var tr = document.createElement("tr");
    
            var city = document.createElement("td");
            city.innerHTML = cities[i];
            tr.appendChild(city);
    
            var pop = document.createElement("td");
            pop.innerHTML = population[i];
            tr.appendChild(pop);
    
            table.appendChild(tr);
        };
    
        //add the table to the div in index.html
        var mydiv = document.getElementById("mydiv");
        mydiv.appendChild(table);
    };
    
    //call the initialize function when the window has loaded
    window.onload = initialize();


If you add this code into _main.js_ and reload _index.html_ in the browser using Prepros or other local development server, you should now see a neat little table on the webpage and in the DOM (Figure 2.2)

![figure2.2.2.png](img/figure2.2.2.png)

###### Figure 2.2: An HTML table on the page and in the DOM created using JavaScript

> ### **Create an HTML table in _main.js._ Practice mentally stepping through the script above until you are sure you understand the operations it performs and the order in which it performs them. Example 2.3 is available for reference, also included in the _Chapter02_ repo.** 

### II. Arrays and Objects

JavaScript provides multiple ways of implementing most computational tasks, a concept described as **_interface flexibility_**. As a review of the Activity 2 Codecademy tutorials, let's examine several alternatives to the above example.

Example 2.3 uses two arrays `cities` and `population` to hold the city names versus population, with a looping structure then populating the two-dimensional table with this content. Alternatively, we could use one array `cityPop` of JavaScript objects to hold the table content instead of two separate arrays (Example 2.4).

###### Example 2.4: Translating two arrays into one array of objects in _main.js_

    //Example 2.3 line 6...function to create a table with cities and their populations
    function cities(){
        //define an array of objects for cities and population
        var cityPop = [
            { 
                city: 'Madison',
                population: 233209
            },
            {
                city: 'Milwaukee',
                population: 594833
            },
            {
                city: 'Green Bay',
                population: 104057
            },
            {
                city: 'Superior',
                population: 27244
            }
        ];
    
        //...
    
        //Example 2.3 line 41...loop to add a new row for each city
        for (var i = 0; i < cityPop.length; i++){
            var tr = document.createElement("tr");
    
            var city = document.createElement("td");
            city.innerHTML = cityPop[i].city; //NOTE DIFFERENT SYNTAX
            tr.appendChild(city);
    
            var pop = document.createElement("td");
            pop.innerHTML = cityPop[i].population; //NOTE DIFFERENT SYNTAX
            tr.appendChild(pop);
    
            table.appendChild(tr);
        };
    }


This format has the advantage of explicitly associating each city with its population as two properties of the same object, rather than simply relying on the order of elements in the arrays to associate them, which easily could have an off-by-one error with a missing or misplaced comma, or otherwise omitted value.

You also can create the array of objects using longform syntax, defining each object individually and then pushing it into the `cityPop` array (Example 2.5):

###### Example 2.5: Longform creation of an array of objects in _main.js_

        //Example 2.3 line 8...create an empty array
        var cityPop = [];
    
        //create the first city object
        var madison = {};
        //add each property to the object
        madison.city = 'Madison';
        madison.population = 233209;
    
        //push the city object into the array
        cityPop.push(madison);
    
        //repeat...
        var milwaukee = {};
        milwaukee.city = 'Milwaukee';
        milwaukee.population = 594833;
        cityPop.push(milwaukee);
    
        var greenBay = {};
        greenBay.city = 'Green Bay';
        greenBay.population = 104057;
        cityPop.push(greenBay);
    
        var superior = {};
        superior.city = 'Superior';
        superior.population = 27244;
        cityPop.push(superior);


When would you use this longform syntax? It is not necessary here, but you might imagine a case where you wanted to dynamically populate an array at different points in the flow of execution. You might also want to add a new property or change some property of an object some time after the object was created.

Keep in mind that JavaScript is <ins>_**case sensitive**_</ins>, so consistent capitalization is important! If you define a variable as `superior` and then call it as `Superior`, the interpreter will not recognize the variable when you call it. It is standard practice to write variable names using **_camelCase_**, or a lowercase first letter and uppercase for any subsequent letter that begins a separate word (for instance, `greenBay`). You <ins>**_cannot use spaces_**</ins> in variable names. You can include spaces for a string object (any collection of characters surrounded by single or double quotes, such as `'Green Bay'`), although special characters (such as a quotation mark) require a leading escape `\` character. Numerical values are assigned to variables without using quotes (quotes would turn them into strings) and cannot be interrupted by any non-numerical characters (such as a comma), except for a single period, which is used as a decimal point.

> ### **Experiment with alternative syntax for defining the table content in _main.js_.**

### III. Loops

Example 2.3 uses a `for` loop to create the table. Alternatively, you can use a `while` loop, a `for each` loop, or nested loops (Example 2.6):

###### Example 2.6: Different types of loops that could be used in _main.js_.

        //WHILE LOOP...Example 2.4 line 25
        //define a counter variable
        var i = 0;
        //start the loop
        while (i < cityPop.length){
            var tr = document.createElement("tr");
    
            var city = document.createElement("td");
            city.innerHTML = cityPop[i].city;
            tr.appendChild(city);
    
            var pop = document.createElement("td");
            pop.innerHTML = cityPop[i].population;
            tr.appendChild(pop);
    
            table.appendChild(tr);
    
            //increment counter
            i++;
        };
    
        //FOREACH LOOP...Example 2.4 line 25
        cityPop.forEach(function(cityObject){
            var tr = document.createElement("tr");
    
            var city = document.createElement("td");
            city.innerHTML = cityObject.city; //NOTE DIFFERENT SYNTAX
            tr.appendChild(city);
    
            var pop = document.createElement("td");
            pop.innerHTML = cityObject.population; //NOTE DIFFERENT SYNTAX
            tr.appendChild(pop);
    
            table.appendChild(tr);
        });
    
        //FOREACH LOOP WITH OBJECT FOR LOOP...Example 2.4 line 25
        cityPop.forEach(function(cityObject){
            var tr = document.createElement("tr");
    
            for (var property in cityObject){
                var td = document.createElement("td");
                td.innerHTML = cityObject[property];
                tr.appendChild(td);
            };
    
            table.appendChild(tr);
        });


With the `while` loop, make sure to define the counter variable _first_, outside of the loop, and _increment the counter within the loop_. Otherwise, you will be stuck with an infinite loop!

The `forEach` loop uses an anonymous function to perform the task for each element in the `cityPop` array, passing the element into the function as a variable (in this case, `cityObject`). _**Anonymous functions**_ do not include a function name and commonly are used in JavaScript when the function is not needed after its initial creation. Note that the `forEach` method must be closed by both a curly brace (for the anonymous function) and a parenthesis (for the `forEach` method itself).

The third looping structure might be the most challenging to wrap your head around. It is actually a set of nested loops, with a second `for` loop inside of the `forEach` loop. The inner `for` loop iterates through each property of each object in the array (i.e., cityObject._city_, cityObject._population_), filling a cell with its value. The variable `property` holds the name of the property (i.e., 'city', 'population'). The loop uses brackets to get the value of the variable `property` and use _it_ to call the value of that property in the object. Thus, `cityObject[property]` is equivalent to `cityObject.city` and `cityObject.population` , each in turn during the inner `for` loop.

> ### **Try each looping structure in _main.js_.**

### IV. Conditional Statements

Finally, let's return to the original loop structure to review some basic conditional statements (Example 2.7).

###### Example 2.7: Adding conditional statements to _main.js_

        //Example 2.4 line 25...loop to add a new row for each city
        for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");
    
        var city = document.createElement("td");
        //first conditional block
            if (cityPop[i].city == 'Madison'){
                city.innerHTML = 'Badgerville';
            } else if (cityPop[i].city == 'Green Bay'){
                city.innerHTML = 'Packerville';
            } else {
                city.innerHTML = cityPop[i].city;
            }
    
            tr.appendChild(city);
    
            var pop = document.createElement("td");
        //second conditional block        
            if (cityPop[i].population < 500000){
                pop.innerHTML = cityPop[i].population;
            } else {
                pop.innerHTML = 'Too big!';
            };
    
            tr.appendChild(pop);
    
            table.appendChild(tr);
        };


The Example 2.7 script presents two conditional blocks. The first looks at the name of the city, giving a different value to the table cells for Madison and Green Bay. Remember that in JavaScript (as in most programming languages), conditional _**equality**_ is denoted by `==` (equal value) or `===` (equal value _and_ type), while `=` denotes **_assignment_** of a value to a variable. Thus, make sure you are using the correct number of equals signs in your comparison statements and not accidentally reassigning the values of your variables.

The second conditional block uses a `<` to compare the population value to a threshold, above which the value 'Too big!' is printed in the cell instead of the population. Any conditional that can be reduced to true or false can be represented in one line, shorthand syntax (Example 2.8):

###### Example 2.8: Shorthand conditional syntax in _main.js_

    //Example 2.7 line 19
    pop.innerHTML = cityPop[i].population < 500000 ? cityPop[i].population : 'Too big!';


As the question mark implies, you can think of this statement as asking a question: is the population less than 500,000? If it is, assign `cityPop[i].population` to `pop.innerHTML`. If not, assign `'Too big!'` to `pop.innerHTML`. We recommend starting with the longform conditional syntax, as it is easy to invert the order of conditions with the shorthand syntax.

> ### **Add the conditional statements to _main.js_.**

Lesson 3: Simplified DOM Manipulation
----------------

### I. Selecting Elements

As you can see from the previous lesson, you need quite a bit of JavaScript code to make just one tiny table! While JavaScript works great for computational logic, it can a bit clunky when picking HTML elements out of the DOM and manipulating them. Therefore, it is useful to be aware of best practice workarounds that make manipulating the DOM easier. 

As seen in Example 2.1, the `getElementById()` method was used to select the `myDiv` element in order to append the table to it. JavaScript uses a **_selector_** to find the element or elements you want to manipulate. In the case above, we gave our `<div>` an `id` attribute, which we can acess using the `getElementById()` method. If we had assigned a class, we could have used `getElementsByClassName()`. These methods, however, are a bit cumbersome. Instead, we can use the `querySelector()` method (Example 3.1). 

###### Example 3.1: Updating Example 2.1 to select an HTML element with `querySelector()`

    var myDiv = document.querySelector("#myDiv");
    myDiv.appendChild(table);

Using `querySelector()`, we can access our `<div>` using pound `#` sign, just like in CSS. If there are multiple elements we want to access, we can use the `querySelectorAll()` method, which returns all objects that meet the selection criteria. If we had assigned a `class` attribute to the `<div>`, we can access it with a `.`, as in `'.myDiv'`. You also can select all elements of a particular tag in the document by using just the tag name with no prefix character, such as `querySelectorAll('div')` to select all `<div>` elements.

Note that the selector <ins>**_must be in quotes_**</ins> (single or double) unless it is a variable that holds the string value of the attribute used for the selection. It is good to get in the habit of naming any HTML elements that you subsequently might want to manipulate in your script or your CSS stylesheet with `id` and/or `class` attributes. Keep in mind that each unique `id` value should be used for only one element in the document, whereas `class` is meant to be used to give the same identifier to multiple elements.

> ### Replace all instances of `getElementById()` with `querySelector()`.**

### II. Method Chaining

The `querySelector()` method is somewhat unique in that it supports **_method chaining_**_,_ or the calling of multiple methods in sequence using dot syntax, resulting in simplified code. Example 3.2 updates Example 3.1 to use a single-line, two-method chain.

###### Example 3.2: Updating Example 3.1 using method chaining with dot syntax in _main.js_

	document.querySelector("#myDiv").insertAdjacentHTML('beforeend',"Hello World!");

The first part of the Example 3.2 method chain is the `document.querySelector()` from Example 3.1, which selects the HTML `<div>` with the id attribute `'myDiv'` and returns it to the script for manipulation. The second method, `insertAdjacentHTML()`, has two parameters: one is the position, which we will set as `beforeend` to insert the HTML as the last child of the selected element, while the other is the HTML string you wish to insert. The method chain above is functionally equivalent to Example 2.1 and Example 3.1 above, inserting the text 'Hello World' at the bottom of the `<div>` (thus, `'beforeend'`), but uses less code. 

Similarly, we can use a slightly modified method chain to append our table to the `myDiv` element from Example 2.3 (Example 3.3). 

###### Example 3.3: Updating Example 2.3 using a method chain to add the table to the `myDiv` element

    document.querySelector("#myDiv").appendChild(table);

Note the `querySelectorAll` method only supports method chaining with methods that accept arrays, such a `forEach()` loop (see Example 3.7).

> ### **Use method chaining to add your table to the `myDiv` element.**

### III. Manipulating Elements

Part of learning to code is learning how to simplify code. One of the reasons Example 2.3 is so cumbersome is the sheer volume of code required to accomplish basic tasks. Thankfully, JavaScript offers multiple ways of doing the same thing, and we can use these alternative methods to simplify our code, making it more efficient. 

Looking back to Example 2.3, we used a series of methods to add new rows to the table header: `createElement()`, `innerHTML`, and `appendChild()`. While we will continue to use some of these methods throughout the workbook, for the purposes of adding new header rows to our table, we can also use the much simpler `insertAdjacentHTML()` introduced in Example 3.2 (Example 3.4). 

###### Example 3.4: Updating Example 2.3 to simplify creating the table using 'insertAdjacentHTML()'

    //initialize function called when the script loads
    function initialize(){
        cities();
    };
    
    //function to create a table with cities and their populations
    function cities(){
        //define two arrays for cities and population
        var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }]
    
        //create the table element
        var table = document.createElement("table");

        //create a header row
        var headerRow = document.createElement("tr");

        //add the "City" and "Population" columns to the header row
        headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

        //add the row to the table
        table.appendChild(headerRow);

        //loop to add a new row for each city
        for(var i = 0; i < cityPop.length; i++){
            //assign longer html strings to a variable
            var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
            //add the row's html string to the table
            table.insertAdjacentHTML('beforeend',rowHtml);
        }

        document.querySelector("#myDiv").appendChild(table);
    }

    document.addEventListener('DOMContentLoaded',initialize)

Compare the (much shorter) script in Example 3.4 to our original script in Example 2.3. Note that the strategy for adding elements to the webpage has changed. In the original Example 2.3 script, we first created each element, then added the content to the element. 

Continuing with the Example 3.4 code, we append the full HTML string of the header cells directly to the header row. This is just like writing HTML code within _index.html_, except that it is contained within a string and you need not worry about the formatting. Within the loop, we again append an HTML string, this time representing the full row. Instead of hard coding our HTML string as a parameter of the `.insertAdjacentHTML()` method, we first assign it to the variable `rowHtml`. This keeps the code tidier by avoiding a line of script so long that it bleeds off the page (although sometimes this is unavoidable). We form the HTML string by concatenating strings of the proper HTML tags with the `cityPop[i].city` and `cityPop[i].population` properties, looping through the `cityPop` array until there are no more objects to append as rows to the table.

At the bottom of the script, we replace `window.onload = intialize()` with `document.addEventListener('DOMContentLoaded',initialize)`. This will execute the script as soon as the DOM is prepared, before all images and frames are loaded, making the loading of the site faster. The `addEventListener` function itself is covered in more detail in the next section.

When writing and concatenating HTML strings, make sure that you add all of the proper closing tags to your elements in the correct order. Unclosed elements may result in a DOM structure you did not anticipate, with odd formatting as a result. Figure 3.1 visualizes how the HTML elements in your table are organized in the DOM tree.

![figure2.3.1.png](img/figure2.3.1.png)

###### Figure 3.1: The HTML table DOM tree structure

> ### **Simplify the Example 2.3 code using Example 3.4.**

### IV. Additional JavaScript Methods for Manipulating the DOM

You will use many more JavaScript methods as you develop your lab projects. All native JavaScript methods are described in the [JavaScript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference). Here we cover several of the more useful JavaScript methods for manipulating the DOM, as well as their appropriate use cases. 

**_[.getAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)_**: This method allows you to get an attribute of the selected HTML element. It takes one parameter: the name of the attribute (e.g., `'id'` or `'class'`) (Example 3.5).

**_[.setAttribute()](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)_**: This method allows you to set an attribute of the selected HTML element. It takes two parameters: the first parameter is the name of the attribute (e.g., `'id'` or `'class'`), while the second parameter is a value with which to replace or set that attribute's current value (Example 3.5). `setAttribute()` is most useful when initially setting an attribute, setting an attribute you do not plan to change, or when you are working with a custom or "non-standard" attribute.

###### Example 3.5: Using `.attr()` in _main.js_

        //Added at Example 3.5 line 44...
        //get the div id
        var theid = document.querySelector('#myDiv').getAttribute('id');

        //theid is 'myDiv'; add it as text to the div
        document.querySelector('#myDiv').insertAdjacentHTML('beforeend',theid);

        //add the class 'foo' to the div
        document.querySelector('#myDiv').setAttribute('class', 'foo');

        //Check your work with the Inspector!

**_[Attribute Property](https://www.w3docs.com/learn-javascript/attributes-and-properties.html)_**: Alternatively, if you plan to change an attribute frequently or dynamically, you can access the attribute as a property of an HTML object. To do so, select the object using the `querySelector` and identify its property using dot notation (Example 3.6).

###### Example 3.6: Set Class and ID by changing object properties.
        //get the div id
        var theid = document.querySelector('#myDiv').id;
        
        //set the id to newdiv
        document.querySelector('#myDiv').id = "newdiv";

        //set the class 
        document.querySelector('#myDiv').className = "foo";

In Example 3.6, we access the `'myDiv'` element, select the `id` property, and assign it to a variable. That variable will now have a value of `'myDiv'`. We also can assign a new `id` value. We follow similar steps to set the `class`, though note that in JavaScript, `className` is used to set `class`. This is just one of the many quirks of the language! In general, this technique is preferred to `setAttribute()`, but depending on the project you may end up using a bit of both. You also can use this approach to access any HTML attribute, such as `src` for images or scripts, or `href` for links.

_**[.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)**_: This is the same `forEach()` method used in Example 2.6, only with a slightly different use case: looping multiple elements selected with `querySelectorAll`. This is useful if you need to use individual attribute values of each element or need to assign different values to each element using imported data (Example 3.7).

###### Example 3.7: Using `forEach()` with `querySelectorAll()` in _main.js_

        //Added below Example 3.7...
        //iterate over each script element and add each one's source url as text to the div
        document.querySelectorAll("script").forEach(function(selectedScript){
            var thesource = selectedScript.src;
            document.querySelector('#myDiv').insertAdjacentHTML('beforeend',thesource);
        })

**_[.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)_** and _**[.removeEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)**_: These are _**event listener**_ methods that apply actions or behaviors based on user- or system-driven events. `.addEventListener()` usually takes two parameters: the name of the event (such as `'click'`, `'mouseover'`, `'mouseout'`, etc.), and an _**event handler**_ function that executes when the event occurs (Example 3.8). `.removeEventListener()` predictably does the opposite of `.addEventListener()`, although you need to provide _exactly the same_ event name and handler function to actually remove the event listener from the element. Thus, while you can provide either method an anonymous function as the second parameter, it is best to define this function separately if you wish to remove the listener, passing the function name to the `.addEventListener()` and `.removeEventListener()` methods (Example 3.8). 

###### Example 3.8: Using `.addEventListener()` in _main.js_

        //Added below Example 3.8...
        //click listener with anonymous handler function
        document.querySelector("table").addEventListener("click", function(){
            alert('Madison Rocks! Go Badgers!');
        });
    
        //named handler function for removable listener
        function clickme(){
            alert('Yeah Green Bay! Go Packers!');
        };
    
        //add the event listener
        document.querySelector("table").addEventListener('click', clickme);
    
        //remove the event listener
        document.querySelector("table").removeEventListener('click', clickme);

**_[.style](https://www.w3schools.com/jsref/prop_html_style.asp)_**: While Javascript offers methods to change the CSS of HTML elements, it usually easier to access the `style` attribute of the selected element(s) directly. This techinque follows the same dot notation used to access attributes (Example 3.9).

###### Example 3.9: Changing the style attribute of a selected element
    //change the text color
    document.querySelector('#myDiv').style.color = 'red';

The `.style` property accesses the styles of the element, and `.color` selects the specific CSS `color` property, which we set to `red`. We can do this for any CSS property, but note certain differences in notation between CSS and JS. For example, CSS properties that contain dashes, such as `background-color`, are written in JavaScript as `backgroundColor`. A full list of CSS properties along with their JavaScript translations, can be found in the [documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Properties_Reference).

This technique is useful for changing element styles dynamically. It will, however, override any styles in your _style.css_ file that apply to the element(s), as in-line styles (those designated through the HTML element `style` attribute) always override styles stored in separate stylesheets (Example 3.10). 

###### Example 3.10: Changing styles in _main.js_

        //Added below Example 3.6...
        //change the text color
        document.querySelector('#myDiv').style.color = 'red';
    
        //change the text size and alignment
        document.querySelector('#myDiv').style.fontSize = '2em';
        document.querySelector('#myDiv').style.textAlign = 'left';

        //get the text color and add it as text to the div
        var thecolor = document.querySelector('#myDiv').style.color;
        document.querySelector('#myDiv').insertAdjacentHTML('beforeend',thecolor);

> ### **Use the above techinques for attribute and style manipulation as well as the `addEventListener()` method to add properties and events to the HTML elements on your webpage.**

Lesson 4: Debugging in the Developer Console
--------------------------------------------

### I. About Debugging

Despite how hackers are depicted in Hollywood movies, you will spend most of your time debugging code rather than writing code. [Jeffrey Elkner, Alan B. Downey, and Chris Meyers try to put debugging in perspective](http://www.openbookproject.net/thinkcs/python/english2e/ch01.html):

> _"One of the most important skills you will acquire is debugging. Although it can be frustrating, debugging is one of the most intellectually rich, challenging, and interesting parts of programming... In some ways, debugging is like detective work. You are confronted with clues, and you have to infer the processes and events that led to the results you see._

> _"Debugging is also like an experimental science. Once you have an idea what is going wrong, you modify your program and try again. If your hypothesis was correct, then you can predict the result of the modification, and you take a step closer to a working program. If your hypothesis was wrong, you have to come up with a new one. As Sherlock Holmes pointed out, When you have eliminated the impossible, whatever remains, however improbable, must be the truth."_

Or, in the words of the venerable [Douglas Adams](https://en.wikipedia.org/wiki/The_Hitchhiker's_Guide_to_the_Galaxy):

![dontpanic.png](img/dontpanic.png)

### II. Console Errors

If you have been testing each code example in this chapter's lessons, you probably have run into some unexpected problems. Maybe you accidentally misplaced some punctuation, misspelled or incorrectly capitalized a word, or forgot an essential character. Maybe you copied the code from each example into _main.js_ without removing or commenting out the original Example 2.3 code the new example was intended to replace. Maybe you forgot to update your link to your script to the _lib_ folder versus the _js_ folder in _index.html._  Maybe you forgot to preview your changes with Prepros or to clear your cache between refreshes. The list of possible issues goes on and on...

Such difficulties are normal, everyday experiences for every level of programmer, beginner to expert. The trick to overcoming routine errors is learning how to efficiently debug your code as you go. A single wrong character in the script can break your entire webpage, and it requires some sleuthing to find the pointy needle in the haystack. Fortunately, every browser's developer toolset comes with a vital tool that allows us to do just that: the console.

The _**console**_, usually accessed by a tab or button next to the inspector, is where errors and other messages from the scripts are printed. Often, it actually is _more_ convenient for you the developer if your console shows an error, because the console error should tell you exactly where in the script the error is occurring. For instance, say your script failed and you found a syntax error in the console (Figure 4.1; Example 4.1).

![figure2.4.1.png](img/figure2.4.1.png)

###### Figure 4.1: A syntax error displayed in the console

The error statement identifies line 25 of your _main.js_ file, where there may be a missing curly brace. Now the problem should be easier to spot in the buggy Example 4.1 code. The object representing the City of Superior requires a closing curly brace before the bracket closes the overall array (Example 4.1).

###### Example 4.1: Incorrect syntax in _main.js_

    //Example 3.5 line 6...
    function cities(){
    //define two arrays for cities and population
    var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
    ]; //this is line 25 of Example 3.4

Similarly, perhaps you have an undefined variable that you try to manipulate through JavaScript in the code. The console will display a reference error, noting the particular variable (Figure 4.2).

![figure2.4.2.png](img/figure2.4.2.png)

###### Figure 4.2: A reference error displayed in the console

There are multiple reasons a variable could be undefined, but a very common cause is inconsistent capitalization. The error above happens because in one place the script uses `citypop` and in another it uses `cityPop`. Since the variable was defined as `cityPop`, `citypop` is not recognized.

### III. Console.log

What about an error that causes your script to fail silently? For instance, while we were tinkering with the example script for this lesson, we was able to generate a table with just the headers and no errors in the console (Figure 4.3):

![figure2.4.3.png](img/figure2.4.3.png)

###### Figure 4.3: There's no table, Jim

Example 4.2 shows the original script producing this silent error.

###### Example 4.2: The _main.js_ script drawing an incomplete table without a console error

    //initialize function called when the script loads
    function initialize(){
        cities();
    };
    
    //function to create a table with cities and their populations
    function cities(){
        //define two arrays for cities and population
        var cityPop = [
        { 
            city: 'Madison',
            population: 233209
        },
        {
            city: 'Milwaukee',
            population: 594833
        },
        {
            city: 'Green Bay',
            population: 104057
        },
        {
            city: 'Superior',
            population: 27244
        }
    
        //create the table element
        var table = document.createElement("table");

        //create a header row
        var headerRow = document.createElement("tr");

        //add the "City" and "Population" columns to the header row
        headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

        //add the row to the table
        table.appendChild(headerRow);

        //loop to add a new row for each city
        for (var i = 0; i < cities.length; i++){
            //assign longer html strings to a variable
            var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
            //add the row's html string to the table
            table.insertAdjacentHTML('beforeend',rowHtml);
        })

        document.querySelector("#myDiv").appendChild(table);
    }
    
    //call the initialize function when the DOM has loaded
    document.addEventListener('DOMContentLoaded',initialize)

Can you see the problem? We did not. We could tell from preview that the header row was drawing correctly, but it was as though my loop did not exist. There were a few things that could be going on, so we needed to use a process of elimination to test for different issues. This is where `console.log` comes in handy. This native JavaScript method prints whatever you want to the console, allowing you to make visible what is going on in the script.

Let's debug! First, we can see whether the script is stopping for some reason before it reaches the loop. To do this, we can add a simple `console.log` statement just before the loop to see if it will execute (Example 4.3):

###### Example 4.3: Adding a `console.log` statement to test the execution in _main.js_

        //Example 4.2 line 37...
        console.log("Hello World");
        //loop to add a new row for each city
        for (var i = 0; i < cities.length; i++){
            //assign longer html strings to a variable
            var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
            //add the row's html string to the table
            table.insertAdjacentHTML('beforeend',rowHtml);
        })


The results (Figure 4.4):

![figure2.4.4.png](img/figure2.4.4.png)

###### Figure 4.4: The console showing the executed statement

Next, is the problem with the code in the loop or the loop itself? To see if the loop is executing, move the `console.log` statement to the first order of business within the loop (Example 4.4):

###### Example 4.4: Move the `console.log` statement inside the loop in _main.js_

        //Example 4.2 line 37...
        //loop to add a new row for each city
        for (var i = 0; i < cities.length; i++){
            console.log("Hello World");
            //assign longer html strings to a variable
            var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
            //add the row's html string to the table
            table.insertAdjacentHTML('beforeend',rowHtml);
        };


Result (Figure 4.5):

![figure2.4.5.png](img/figure2.4.5.png)

###### Figure 4.5: The console is blank

Aha! The loop is _not_ executing at all. So let's look at the opening statement of our loop (Example 4.5):

###### Example 4.5: The opening loop statement in _main.js_

        //Example 4.2 line 37...
        //loop to add a new row for each city     
        for (var i = 0; i < cities.length; i++){


Look carefully at every character in the line for errors with the syntax. There are none (plus the console did not show a syntax error), so let's look at the variables. The only variable that is not defined within the statement is `cities`. Let's check this variable with a `console.log` statement just above the loop (Example 4.6).

###### Example 4.6: Checking if `cities` is defined in _main.js_

        //Example 4.2 line 37...
        console.log(cities);
        //loop to add a new row for each city
        for (var i = 0; i < cities.length; i++){

Result (Figure 4.6):

![figure2.4.6.png](img/figure2.4.6.png)

###### Figure 4.6: The console showing that `cities` is a function

Notice in the Console that `cities` is a function, not a variable! Thus it is defined, but has no `length` property. If you click the button next to the function name in the console, you can see where in the script the function is defined (Figure 4.7).

![figure2.4.7.png](img/figure2.4.7.png)

###### Figure 4.7: The Debugger tab showing where `cities()` is defined

Why then did we use `cities` in my loop? Remember back to our _very first script_, when we were using two arrays for our data instead of an array of objects (Example 4.7).

###### Example 4.7: Contrasting the former and current array structures in _main.js_

    //THE OLD DATA
    function cities(){
        //define two arrays for cities and population
        var cities = [
            'Madison',
            'Milwaukee',
            'Green Bay',
            'Superior'
        ];
        var population = [
            233209,
            594833,
            104057,
            27244
        ];
    
    //THE NEW DATA, Example 4.1
    function cities(){
        //define two arrays for cities and population
        var cityPop = [
            { 
                city: 'Madison',
                population: 233209
            },
            {
                city: 'Milwaukee',
                population: 594833
            },
            {
                city: 'Green Bay',
                population: 104057
            },
            {
                city: 'Superior',
                population: 27244
            }
        ];


We simply forgot to change the name of the variable `cities` to `cityPop` in the loop when changing the data structure. Since both the original `cities` variable and the new `cityPop` variable hold arrays of the same length (4, the number of cities in our data), they should work the same way in a loop statement. We can now fix the loop statement (Example 4.8):

###### Example 4.8: Rectifying the incorrectly referenced variable in _main.js_

        //cities CHANGED TO cityPop...Example 4.2 line 36
        for (var i = 0; i < cityPop.length; i++){
            //assign longer html strings to a variable
            var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
            //add the rows html string to the table
            table.insertAdjacentHTML('beforeend',rowHtml);
        };


This might seem like a simple error, but much of debugging involves tediously tracking down simple errors such as this by testing various parts of the script with `console.log` statements. A smart strategy is to add temporary `console.log` statements to check your work every time you write a new piece of code. This way, you know if something is wrong right away and have less script to debug if any problems arise.

## Activity 3

1.  View the _main_with_debug.js_ script found in the _js_ folder of the _Chapter02_ subdirectory within your _unit-1_ repo. Replace the script link in _index.html_ from _main.js_ to _main_with_debug.js_.
2.  Debug the _main\_with\_debug.js_ script to get the table to draw properly with the hover and click interactions (see preview below).
3.  Add comments to _main\_with\_debug.js_ explaining what the script is doing at each step.
4.  Commit your changes to your _unit-1_ repository and sync with GitHub (you will want to keep your boilerplate site clean for future use). 

![figure2.5.1.png](img/figure2.5.1.png)

_This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/). <br/> For more information, please contact Robert E. Roth \(reroth@wisc.edu\)._

### [Return Home](../../../) | [Previous Chapter](../Chapter01) | [Next Chapter](../Chapter03)

