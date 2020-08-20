Introduction
============

Welcome to the first week of Geography 575! Week 1 includes three lab lessons and Activities 1 & 2:

*   In Lesson 1, we will introduce text editors and some basic "boilerplate" HTML used to structure your website.
*   In Lesson 2, we will discuss how to efficiently set up your web directory and host it through a localhost development server.
*   In Lesson 3, we will set-up a GitHub account you will use for cloud storage, version control, web hosting, and collaboration with other developers. If you already have used Github in other courses, this will be review. However, you still must commit a "repo" as part of the Activity #1, so please still read carefully.

After this week, you should be able to:

*   Set-up boilerplate for use as the base of your website
*   Build a website directory hosted on a localhost server
*   Create a GitHub repository for your website and sync it with your local directory

How to Read and Use the Lessons
-------------------------------

We break each week's material into a set of 3-4 lessons that you should complete sequentially, with many lessons having subsections that treat specific topics. All lessons are formatted the same way:

As you read, we include many [links](https://en.wikipedia.org/wiki/Hyperlink) that point to additional reference material . This material is for your reference only, and we recommend returning to these materials when you get stuck at different steps. Importantly, many students cycle back to these links towards the end of the course to debug issues specific to your final project, so it is helpful to get a sense of what information is included in the links. You do not need to read the links comprehensively, however, and none of the lab content is included on the exam.

> **Occasionally, a link does contain required reading, additional downloads, or specific tasks needed to complete the lab activities or lab assignments. We offset these required "actions" to make them visually obvious in the text. Please follow these directions carefully, as it will be difficult to advance in future lessons without first completing these tasks.**

We format example code in code blocks, like this.  
You can copy-paste this code into a text editor to make it easier to reference the line numbers.

We also include `in-line code` when referencing specific element tags, function and variable names, data values, etc. We _italicize_ the literal names of _directories_ and _files_. We **bold** and _italicize_ keywords on their first use.

If you have questions, please post them in Discussion forms or e-mail your TA. We also recommend bookmarking the [W3Schools](http://www.w3schools.com/tags/default.asp) reference fora generally reference on HTML, CSS, and JavaScript during the class. Also, continue to refer back to the Codecademy tutorials (Activity 2 below) as you practice your web mapping knowledge!

Lesson 1: The HTML Boilerplate
------------------------------

### I. HTML

All of your interactive mapping and visualization projects start with HTML. **_HTML_** stands for **H**yper **T**ext **M**arkup **L**anguage. We are now on the fifth revision of the HTML specification (hence **_HTML5_**). Although often referred to as “code” when used alongside CSS and other web scripting languages like JavaScript, HTML is not a programming language. It instead is a markup language composed of **_markup_** _**tags**_ that describe the content of a webpage. HTML therefore is said to “structure” otherwise unstructured text and image content, while CSS then “styles” this structure. The majority of HTML files are stored in plain text files with an ._html_ extension (e.g., _index.html_ below).

HTML **_tags_** are keywords composed of reserved words surrounded by angle brackets, such as `<html>` or `<body>`. Often these tags come in pairs designating an _**opening**_ `<html>` and _**closing**_ `</html>` tag; properly opened and closed tags are referred to as _**HTML elements**_. An HTML document is composed of HTML elements written in plain text using this tag notation. An HTML document therefore is synonymous with a webpage.

### II. Text Editors

_**Code**_ is just text that gets interpreted by various technologies (e.g., by a web browser for HTML) to complete actions or execute instructions. A _**text editor**_ is a software program that facilitates the writing of code. Text editors include features that support coding, such as color-coding reserved words in different code languages, automatically applying indentation and closing tags, and even live preview of the code. Text editors are regularly updated with new features, so it is worth continuously reviewing your choice of text editor. Popular text editors include [Aptana Studio](http://www.aptana.com/), [Atom](https://atom.io/), [Brackets](http://brackets.io/), [Notepad++](https://notepad-plus-plus.org/), and [Sublime Text](http://www.sublimetext.com/).

You are welcomed to use your preferred text editor in class. Atom, Brackets, and Notepad++ are available on all Science Hall computers.

### III. The HTML Boilerplate

A _**boilerplate**_ is the minimum starter code needed begin development.  For Geography 575, we start with the basic _**HTML boilerplate**_ to simplify your early designs and focus on JavaScript. 

> **Download _[my\_website.zip](https://canvas.wisc.edu/courses/180498/files/11015017/download?wrap=1 "my_website.zip")_ from the Week 1 files, unzip it, and open _index.html_ in your text editor.**

The HTML boilerplate code in _index.html_ should look like Example 1.1. Every component _must_ be present in your _index.html_ file, excepting the `<!-- -->` comments and IE stylesheet check. Importantly: you must use _index.html_ as the name of the homepage to use the directory name as the endpoint of a web url. For instance [www.geography.wisc.edu/cartography/](http://www.geography.wisc.edu/cartography/) is the same as [www.geography.wisc.edu/cartography/index.html](http://www.geography.wisc.edu/cartography/index.html), but shorter and therefore preferred.

###### Example 1.1: Boilerplate code in _index.html_

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
                <title></title>
    
            <!--put your external stylesheet links here-->
            <link rel="stylesheet" href="css/style.css">
            <!--[if IE<9]>
                <link rel="stylesheet" href="css/style.ie.css">
            <![endif]-->         <!--you can also place internal styles here;             place these within <style> tags-->        
        </head>
    
        <body>
            <!--put your initial page content here-->
    
            <!--you can also use this space for internal scripts;
            place these within <script> tags-->
    
            <!--put your external script links here-->
            <script type="text/javascript" src="js/main.js"></script>
        </body>
    </html>
    

Note the neatly indented structure of the markup. This is not strictly required for the code to work; browsers interpret opening and closing tags as the start and end points of HTML elements, not newline or tab characters. However, proper indentation is a convention and best practice that will make your life and your TA's life (and anyone else reading your code) exponentially easier.

Different levels of _**indentation**_ represent parent-child relationships in the overall tree structure of the document. Think of this structure as analogous to [Matryoshka dolls](https://en.wikipedia.org/wiki/Matryoshka_doll) that nest inside one another. In the code above, the `<html>` tag is the outermost "doll", the `<head>` and `<body>` are smaller "dolls" sitting inside the `<html>` "doll", and so on. Each new level of indentation is used to represent another nested level of HTML elements, helping you to assess visually how the webpage is structured hierarchically and then identify missing or incorrectly located opening and closing tags. 

The `<!DOCTYPE html>` tag indicates to the browser that this is an HTML5 file. The `<html lang="en">` tag opens the html code, telling the browser to interpret the code as English. In the `<head>` tag, there are two `<meta>` tags: the first declares the character set as UTF-8, which interprets the broadest possible range of ASCII characters; the second `<meta>` tag sets the width of the page to the width of the device monitor, ensuring that the content stays within the available frame regardless of device size. While there are other options available for the `<meta name="viewport">` tag, this is really the only setting that should ever be used, and it _must_ be included. The `<title>` open and closing tags declare the title of the page; text in between these tags will appear in the tab at the top of the browser page. The `<link>` tag links out to the website stylesheet, and will be covered further below. Finally, the conditional statement `<!--[if IE<9]>`, although it looks like a comment, loads a different stylesheet formatted for old versions of Internet Explorer prior to version 9.

The `<body>` will contain the majority of the page content you write in HTML. Below your custom HTML is where you should place your `<script>` tags linking to the website's JavaScript. This also will be covered further below.

This is all the code you need to create a basic HTML5 website. If you add something to the body, say:

###### Example 1.2

    <!--Example 1 line 18-->
    <body>
        Hello World!
    </body>
    

and then open the file in a browser, you should see what you just added to the page (Figure 1.1):

![figure1.1.1.png](https://canvas.wisc.edu/courses/180498/files/11021828/preview)

###### Figure 1.1: `<body>` content displayed on the page

There are a number of frameworks that have their own boilerplates and directory structures, such as [Bootstrap](https://getbootstrap.com/) used introduced in Geography 572 for responsive design across mobile and non-mobile devices. For simplicity's sake, we recommend that you use this boiler plate for each lab activity and lab assignment. You can explore other frameworks with the final project.

> **Add content to the body element and then load your _index.html_ file in a browser and check that your content appears in the browser tab. If HTML is completely new to you, we recommend supplemental Codecademy tutorials as part of Activity 2 to complete alongside JavaScript tutorials.**

Lesson 2: Web Directory Setup
-----------------------------

### I. One-file webpages

_**One-file webpages**_ reference all styles and scripts _**internally**_ within the _index.html_ file. For a formal definition, _**styles**_ are display rules set using **_CSS_** or **C**ascading **S**tyle**s**heets. While HTML defines the _structure_ of the content, CSS defines the _look_ of the content. **_Scripts_** then are dynamic actions or behaviors applied to content, some data-driven and others interactive, and are written in a web programming language such as _**JavaScript**_, the primary language used for web mapping today.

The case of a one-file webpage is trivial: in real life web development, you always reference resources in your directory **_externally_** using `<link>` tags and `<script>` tags with the `src` attribute. However, it is useful to know that you _can_ include styles and scripts right in the HTML document, particularly because many content management systems like Wordpress might add these requiring subsequent editing.

For example, you can add a `<style>` tag to your boilerplate to embed a CSS rule (details below):

###### Example 2.1: Adding styles in _index.html_

    <!--Example 1 line 13-->   <!--you can also place internal styles here        place these within <style> tags-->   <style>
            #mydiv {
                background-color: red;
                width: 80%;
                margin: 0 auto;
                height: 100px;
            }
        </style></head><body>
        <div id="mydiv">
            Hello World!
        </div>
    </body>
    

The result is a red rectangle 100 pixels high that takes up 80 percent of the page width, with no margin, as seen below (Figure 2.1).

![figure1.2.1.png](https://canvas.wisc.edu/courses/180498/files/11020415/preview)

###### Figure 2.1: The result of Example 2.1

You also can add a `<script>` tag without a `src` attribute below the `<div>` to add a behavior in JavaScript. In the example below, we add an event listener to the `<div>` using the `id` attribute of the `<div>` .

###### Example 2.2: Adding script in _index.html_

    <div id="mydiv">
        Hello World!
    </div>
    
    <script>
        var mydiv = document.getElementById("mydiv");
        mydiv.addEventListener("click", function(){
            alert("Hello World!");
        });
    </script>
    

If you click on the div element in your browser, you should see:

![figure1.2.2.png](https://canvas.wisc.edu/courses/180498/files/11020473/preview)

###### Figure 2.2: The result of Example 2.2

### II. Directory Structure

For the real-world projects, internal `<style>` and `<script>` tags are much too limiting. Instead, separate the working pieces of your website into a well-organized _**directory structure**_ of files and folders to keep them neat and orderly. Like shelves in a closet, your directory structure is a strategy to keep things organized so you can find them later. You will thank yourself down the road if you begin with a good directory structure to hold and organize your files.

Generally speaking, we use the term "webpage" to describe a single HTML document and "website" to describe the entire directory structure.

> **In the _my\_website_ directory you downloaded, create the following new folders:**
> 
> *   **js**
> *   **lib**
> *   **css**
> *   **data**
> *   **img**

Let's describe each of these folders in your directory structure:

*   _**js**_: This folder holds your custom JavaScript files, in which you will write the script to make your website—including its web map—dynamic and interactive.
    
*   _**lib**_: This folder holds any third-party JavaScript code libraries you choose to download and host. These will eventually include _jQuery.js_, _Leaflet.js_, _D3.js_, and potentially others. Some code libraries come with their own CSS stylesheets and images; leave these within the library's directory and place the entire directory within the lib folder to avoid confusion.
    
*   _**css**_: This folder holds your custom CSS stylesheets.
    
*   _**data**_: This folder holds data files used to create your thematic web maps, and thus is not necessary for all website.  The _data_ folder can hold CSV, GeoJSON, and other formats that we will cover later. You also might wish to keep original Esri Shapefiles in it; these should go in a _shapefiles_ subdirectory within the data folder, since a shapefile in itself is technically a file directory just like a website.
    
*   _**img**_: This folder holds any images used in your website.
    

Notice that the boilerplate _index.html_ file already contains two links to external files. You now can create these files using your text editor. First, create a new file and save it into the _css_ folder as _style.css_. Next, create _main.js_ in the _js_ folder, again adding a byline comment. We recommend that you put a comment as the first line of code in each file declaring your authorship (Example 2.3), since later you will be sharing this file online through GitHub:

###### Example 2.3: Authorship comment in _style.css_

    /* Stylesheet by Buck E. Badger, 2020 */
    

> **Create _style.css_ and _main.js_ text files and save into the _css_ and _js_ folders of _my\_website_ respectively.**

### III. Setting up a Development Server

As you develop your website, you will need to preview it in a browser to see what it looks like and to use the browser's helpful set of developer tools. While you can just double-click on the simple HTML examples above for preview in a browser, most websites are accessed over the internet using a server. A **_server_** is a piece of software that sends data to a browser over the internet. Figure 2.3 shows a basic server-client architecture, in which the client requests files from your website directory and the server sends them as requested. A server may be across the room, across the country, or even on the other side of the world.

![figure1.2.3.png](https://canvas.wisc.edu/courses/180498/files/10618995/preview)

###### Figure 2.3: Client-server architecture

For security reasons, browsers _only_ display webpages correctly if the files are passed through a server. This complicates development, as you do not want to push every change to your website to a server just to preview it. However, you can set up a _**local development server**_ on your machine to reliably preview dynamic content such as JavaScript before you post online. As with text editors, there are many options for setting up a local development server, with many common ones requiring additional programming knowledge such as Python SimpleHTTPServer and server frameworks including [WAMP](http://www.wampserver.com/en/) (for Windows), [MAMP](https://www.mamp.info/en/) (for Mac), and [LAMP](http://lamphowto.com/) (for Linux).

We use [Prepros](https://prepros.io/) in lab demonstrations and examples for simplicity. Prepros is a "preprocessor" software application that automatically compiles your website and refreshes the browser every time you save files in your web directory. Prepros is available on all Science Hall computers and works on Windows and Mac machines.

> **Preview _my\_website_ using Prepros.** 

Lesson 3: GitHub Setup
----------------------

### I. What is GitHub?

_**[GitHub](https://github.com/)**_ is a website and project hosting service that uses the [Git](http://git-scm.com/) version control system. _**Git**_ takes a snapshot of your files at a given time, creating a backup that can be shared collaborative when multiple developers are coding at the same time (e.g., your final project). GitHub provides an online suite of tools for cloud storage, sharing, collaboration, and hosting of your projects. It has become standard practice for open-source software developers to keep their projects on GitHub, and you will find yourself accessing various repositories or **_repos_** (i.e., web directories) on GitHub as your development experience grows. For example, the Spring 2020 Geography 575 course materials are hosted at [](https://github.com/reroth/g575-2013)[https://github.com/uwcartlab/20\_g575](https://github.com/uwcartlab/20_g575) [](https://github.com/reroth/g575-2013) (Figure 3.1):

![figure1.3.1.png](https://canvas.wisc.edu/courses/180498/files/11021792/preview)

###### Figure 3.1: The GitHub repository for this course

The way Git works can be a bit confusing, even after repeated use, as it is different from your prior experience  uploading and downloading files from a website through your browser. Git first creates a repository _within_ your website directory, rather than uploading an existing, local directory online. While you can see your files in the remote repository through the GitHub website, you do not use the browser to access them. Rather, the original files sit in the website directory you created on your own machine, and you sync or **_push_** those files to the remote GitHub repository whenever you make changes. 

If you are collaborating on a project with someone else, they can **_clone_** your repository from GitHub to their own machine, make changes to website files, then submit a **_pull request_** asking you to add changes back to the main repository. You can then sync or _pull_ their changes from their repository to the main repository and from there into your local website directory. You also can **_fork_** an existing repository from another GitHub account and propose changes to the main branch using this _pull_ request (more next week). Again, there are several options for using Git and GitHub collaboratively, some using command line and thus providing more control over the push, clone, and pull commands (e.g., [Git Bash](https://git-scm.com/downloads)).

Again for simplicity, we use [GitHub Desktop](https://desktop.github.com/) in lab demonstrations and examples. GitHub Desktop is more beginner-friendly than alternatives and meshes well with the GitHub website. However, it can be difficult to make sense when something goes wrong in GitHub Desktop, sometimes requiring deleting and recreating the repo; do such destructive rebuilding only when exhausting alternatives with your TA. GitHub Desktop is available on all Science Hall computers and works on Windows and Mac machines.

### II. Setting Up a Repository

> **Read the GitHub Guide ["Getting your project on GitHub"](https://guides.github.com/introduction/getting-your-project-on-github/) and follow its directions to create a repository in your _my\_website_ directory.**

Following the GitHub Guide above, the first step to setting up GitHub is to create a GitHub account if you do not already have one). Go to [https://github.com/](https://github.com/), enter a username, e-mail, and password, and click "Sign up for GitHub."

Then open GitHub Desktop, log in, and drag-and-drop your _my\_website_ directory to create a local repository, following the directions in the GitHub Guide. Alternatively, you can click "Current repository" in the upper-left corner of the application, then click "Add" and choose "Create new repository...". Enter the name of your website, then in "Local path" navigate to the directory _containing_ your website directory, and click "Create repository" (Figure 3.2).

Importantly, if you first navigate to your website directory instead of the folder above it, the application will create a new directory _inside_ your website directory with the same name. Check the path shown in the "local path" text field to ensure you are syncing from the correct location on your computer.

![figure1.3.2(new).png](https://canvas.wisc.edu/courses/180498/files/10619171/preview)

###### Figure 3.2: Creating a repository in your _my\_website_ directory

Once you've created the repository, open your the _my\_website_ directory on your machine and observe that three new files have been created (Figure 3.3):

*   **._git_**, a hidden folder that holds the snapshots of your files,
    
*   **._gitattributes_**, a file specifying settings for the repository, and
    
*   **._gitignore_ (optional)**, a file that lists files in the directory that should not be tracked by the repository.
    

![figure1.3.3.png](https://canvas.wisc.edu/courses/180498/files/10619016/preview)

###### Figure 3.3: Website directory with repository files

_Never_ tamper with the directories and files inside of the _.git_ folder, and for the most part you will not need to modify directly the other GitHub files in this class. You can change settings and add to the _.gitignore_ file through the GitHub application gear menu→"Repository" settings in the upper-right corner of the application window. You also can sign in to GitHub, manage your account, and configure Git through the gear menu→"Options". 

Follow the rest of the directions in the "[Getting your project on GitHub](https://guides.github.com/introduction/getting-your-project-on-github/)" guide. You should end up with both a local repository in your website directory and a copy of the repository on your GitHub web page. Note that it is also possible to work in reverse order—that is, create a new repository on the GitHub website and then copy it over, or _clone_ it, to your machine. The GitHub [Hello World Guide](https://guides.github.com/activities/hello-world/) provides details on this reverse process for future reference. We will return to this process in Activity 7.

When you are just figuring things out, you are likely to end up with one or two repositories on GitHub that you will not actually need in the future. When you are sure you no longer need a repository, you can delete it from GitHub by navigating to the repository web page, clicking the "Settings" link on the right-hand side, scrolling down to the "Danger Zone" at the bottom of the page, and clicking "Delete this repository." The GitHub crew was nice enough to take precautions to ensure that you _really_ want to delete the repository before you do it. Thus, be absolutely sure you do not need the repository again, and that no one else is contributing to it, before you delete.

### III. Learning and Using GitHub

There are a number of excellent [GitHub Guides](https://guides.github.com/) beyond the introductory guide required above. We recommend that you reference these as build experience with GitHub. We will use most or all of the covered skills for your final project.

From this point, though, the key to becoming comfortable with GitHub is to use it often. This means that _every time you make a working change to your website files, you should commit your changes to your local repository and sync it with the repository on GitHub._ While you are working on your lab projects, your TA will expect to see your GitHub repository for the project updated frequently. This is an easy way for your TA—and you—to track your progress. It also starts to build a public track record of your work that future employers may look at. Thus, **commit frequently and wisely**!

Weekly Deliverables
-------------------

> ### [Activity 1](https://canvas.wisc.edu/courses/180498/assignments/696184 "Activity 1: Website Directory and GitHub Account (due at the end of Week 1 lab)") (_due at the end of Week 1 lab_)
> 
> 1.  Create a website directory called _my\_website_ with an organized directory structure and boilerplate _index.html_, _style.css_, and _main.js_ files.
>     
> 2.  Create a Git repository in your website directory and sync it to your GitHub account.
>     
> 3.  Submit a zip file (.zip) containing your website directory to Canvas. In the submission comments, paste a link to your GitHub account page. **_Click the link above to submit your zip file and URL._**
>     
> 
> ### [Activity 2](https://canvas.wisc.edu/courses/180498/assignments/696185 "Activity 2: Online JavaScript Training") (_due 1-hour before Week 2 lab_)
> 
> 1.  **_Required_**: Navigate to codecademy.com and create a free account. Do _not_ sign-up for the Pro paid account.
> 2.  _Recommended_: If you do not have any programming experience, we recommend first completing the [Learn How to Code](https://www.codecademy.com/learn/learn-how-to-code) broad overview of programming concepts (~1 hour).
> 3.  _Recommended_: If you do not have experience with HTML or want a refresher, we recommend completing Lesson 1 (and only Lesson 1) of the [Introduction to HTML tutorial](https://www.codecademy.com/learn/learn-html). (~1 hour)
> 4.  _Recommended_: If you do not have experience with CSS or want a refresher, we recommend completing Lessons 1 and 2 of the [Introduction to CSS tutorial](https://www.codecademy.com/learn/learn-css). (~2 hour)
> 5.  **_Required_**: Complete Lessons 1-8 of [Introduction to JavaScript](https://www.codecademy.com/learn/introduction-to-javascript). Print a PDF (Ctrl+P in browser; save as a PDF) of your completed table of contents for these tutorials and upload to the Activity 2 assignment to confirm completion. (~6 hours)

_Copyright Robert E. Roth 2020. Do not share or redistribute. All rights reserved._