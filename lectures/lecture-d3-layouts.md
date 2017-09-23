---
layout: code-lecture
title:  Advanced D3&#58; Layouts and Maps
permalink: /lectures/lecture-d3-layouts/
nomenu: true
---

*Material based on Scott Murray's book and [blocks](http://bl.ocks.org/mbostock/3887235) [by](http://bl.ocks.org/mbostock/4062045) Mike Bostock*

## Asynchronous Data Loading

Before we jump into the world of layouts, let's quickly cover an important aspect related to data loading. The code snippet below loads in a file called myData.json, and when all the plotting is finished, prints 'Done Plotting' to the console.

``` javascript
console.log('Hello'); // Prints Hello

 // Makes an async request for a resource from the server using d3.json
$d3.json('myData.json', function (error,data) {
    //d3 functions that will process and plot your data 
     console.log('Done Plotting!'); // Prints when the request finishes
});

console.log('World'); // Prints World
```
The question is: What is the order in which the three statements above will print to the console? Hello , World, Done Plotting  or Hello, Done Plotting, World ?

If you answered the first, Hello, World, Done Plotting, you are correct. The reason for this is because the call to d3.json is asynchronous. An asynchronous call is defined as one in which the script is not blocked while waiting for the called code to finish. This means that the asynchronous call is not instaneous, and javascript does not wait for it to return before continuing to run the rest of the script. 

In practice, what this means is that you will not have guaranteed access to the data inside MyData.json outside of the callback function for d3.json. So if you have something like this: 

``` javascript
 // Makes an async request for a resource from the server using d3.json
$d3.json('myData.json', function (error,data) {
		//Data wrangling and cleanup. 
        console.log('Done Cleaning!'); // Prints when the request finishes
});

 //d3 functions that will process and plot your data 

```

Your d3 functions will be called, before d3.json has returned with the data inside myData.json and you will either get an error or no visualization at all. 

### A Quick Introduction to Promises

Promises are a pattern that help with asynchronous functions that returns a single result asynchronously. In the examples above, we saw a popular way of receiving this result, which is through a callback function. This function only evaluates once the asyncronous function returns a value. This pattern looks like this: 

``` javascript
asyncFunction(arg1, arg2,
    result => {
        console.log(result);
    });
    
```

A common problem with this approach is what is known as 'callback hell'. This happens when you have multiple asynchronous function calls and each of them must be nested within the callback of the previous one to ensure that they have access to the necessary data/results. 


Promises provide a better way of working with callbacks: Now an asynchronous function returns a Promise, an object that serves as a placeholder and container for the final result. Callbacks registered via the Promise method then() are notified of the result: 

``` javascript
asyncFunction(arg1, arg2)
.then(result => {
    console.log(result);
});

```

Using promises has a few advantages, such as (from [exploringjs.com](http://exploringjs.com/es6/ch_promises.html#sec_introduction-promises))

* No inversion of control: similarly to synchronous code, Promise-based functions return results, they don’t (directly) continue – and control – execution via callbacks. That is, the caller stays in control.

* Chaining is simpler: If the callback of then() returns a Promise (e.g. the result of calling another Promise-based function) then then() returns that Promise (how this really works is more complicated and explained later). As a consequence, you can chain then() method calls:

``` javascript
  asyncFunction1(a, b)
  .then(result1 => {
      console.log(result1);
      return asyncFunction2(x, y);
  })
  .then(result2 => {
      console.log(result2);
  });
  
``` 

* Composing asynchronous calls (loops, mapping, etc.): is a little easier, because you have data (Promise objects) you can work with.

* Error handling: Error handling is simpler with Promises, because, once again, there isn’t an inversion of control. Furthermore, both exceptions and asynchronous errors are managed the same way.

* Cleaner signatures: With callbacks, the parameters of a function are mixed; some are input for the function, others are responsible for delivering its output. With Promises, function signatures become cleaner; all parameters are input.

* Standardized: Prior to Promises, there were several incompatible ways of handling asynchronous results (Node.js callbacks, XMLHttpRequest, IndexedDB, etc.). With Promises, there is a clearly defined standard: ECMAScript 6. ES6 follows the standard Promises/A+ [1]. Since ES6, an increasing number of APIs is based on Promises.

## Layouts

Layouts make it easier to spatially arrange, shape and size elements representing data on the screen. While we've produced layouts ourselves already, we've only used simple position and size assignments that were directly driven by the data. And while these cover important classes of visualization techniques, there are more advanced techniques for different data types that are not as easily placed. Layouts are typically based on algorithms that define, e.g., where to put a node in a network visualization, or where to place a rectangle in a tree map. In this lecture we will learn how to use D3's layout features to render such complex layouts.

D3 Layouts don't actually draw things for us, rather they perform a data transformation that we can use to draw specific objects on the screen. Let's start with a simple example, a pie chart.

### Pie/Donut Charts

Pie charts are a much criticised visualization technique as they have multiple weaknesses (but also strengths) compared to their alternatives. We'll talk about those in class, but for now, we'll draw a pie chart because it's one of the simplest layouts we can do.

<!--In the following example, we use the [D3 pie layout](https://github.com/d3/d3-shape/blob/master/README.md#pie) to calculate the angles and the [d3.arc](https://github.com/d3/d3-shape#arcs) function to calculate the arcs used for drawing the wedges.-->

Let us consider the following line of code: ` pie = d3.pie(data)` . It is important to note that the [`d3.pie()`](https://github.com/d3/d3-shape/blob/master/README.md#pie) call does not produce a shape directly, but computes the necessary angles to represent a dataset as a pie or donut chart. 

The data output by `d3.pie(data)` can then be used as follows: `arc = d3.arc(pie)`. 
Here, [`d3.arc()`](https://github.com/d3/d3-shape#arcs) (the arc generator) produces a circular svg shape, as in a pie or donut chart.

Let's take a closer look at the output of `d3.pie(data)`. 

* data - element
* index - of the element
* value - of the arc.
* startAngle - of the arc. The overall start angle of the pie, i.e., the start angle of the first arc.
* endAngle -  The overall end angle of the pie, i.e., the end angle of the last arc
* padAngle -  of the arc. The pad angle here means the angular separation between each adjacent arc.



{% include code.html id="d3_pie" file="d3_pie.html" code="" js="false" preview="true" %}

![Pie data structure](images/pie.png)
The interesting intermediate stages here are the values produced by the pie layout and the path drawn by the arc function. The pie layout produces a specific data object that we can use to bind to the DOM elements, shown on the right. We ge an array with one ojbect for each wedge. The first member of the object is `data`, which stores the raw data. We also have `startAngle` and `endAngle` (in radians). <br /><br /> <br /> <br /> <br />  

The path that is generated by the arc function, is the second piece of information: `M1.1634144591899855e-14,-190A190,190 0 1,1 -176.58002257840997,-70.13911623486732L0,0Z`. This defines the actual path drawn.


## Hierarchy Layouts

### Chord Layout

Chord diagrams are often used to show directed relationships among a group of entities. Here is an example of a chord layout used in the nytimes to show [names used by major presidential candidates in the series of Democratic and Republican debates leading up to the Iowa caucuses](http://www.nytimes.com/interactive/2007/12/15/us/politics/DEBATE.html?mtrref=circos.ca)


Let's step through a simple example to see how this works. 

The example below takes advantage of three d3 functions: 

* d3.chord()
* d3.arc()
* d3.ribbon()

 {% include code.html id="d3_chord" file="d3_chord.html" code="" js="false" preview="true" %}


### Tree Layout
{% include code.html id="d3_tree" file="d3_tree.html" code="" js="false" preview="true" %}


### Treemap Layout

{% include code.html id="d3_tree_map" file="d3_tree_map.html" code="" js="false" preview="true" %}



## Network Layouts

### Node Link Force-Directed Graph Layout

We've mainly talked about tabluar data up to this point. As we will soon learn, there are other data forms. A major other data form is the graph or network. Graphs describe relations between elements. The elements are usually referred to as nodes or vertices, the relationships as links or edges. A common, but not the only representation for graphs are node link diagrams, where nodes are often rendered as circles and edges as lines connecting the circles. There are many ways to lay the nodes in a graph out. We could have all nodes on a circle, or in a grid, or use some other method for laying them out. A common method is a force-directed layout. The idea behind a force directed layout is a physical model: the nodes repulse each other, while the edges are considered springs that pull each other close. The idea behind this is that as nodes that are tightly connected will be close to each other, i.e., form visible clusters, whereas nodes that are not connected are far from each other. The D3 implementation does not actually model this as springs, but as [geometric constraints](https://github.com/d3/d3-force#link_distance), but the mental model is still useful.

 This happens in an iterative process, i.e., the forces for each node to each other node are calculated in a single step and the system is adjusted, then the next loop starts, etc. Eventually, the system will (hopefully) find an equilibrium. This is computationally expensive, as we will learn, but works fine for smaller graphs.

The following example illustrates a node-link diagram based on character co-occurrences in Les Miserables. It is based on the [standard D3 force layout example](http://bl.ocks.org/mbostock/4062045).

The data is stored in [a json file](miserables.json). Here is a sample of this file:

{% highlight javascript linenos %}
{
  "nodes":[
    {"id":"Myriel","group":1},
    {"id":"Napoleon","group":1},
    {"id":"Mlle.Baptistine","group":1},
    {"id":"Mme.Magloire","group":1},
    {"id":"CountessdeLo","group":1}
  ],
  "links":[
    {"source": "Napoleon", "target": "Myriel", "value": 1},
    {"source": "Mlle.Baptistine", "target": "Myriel", "value": 8},
    {"source": "Mme.Magloire", "target": "Myriel", "value": 10},
    {"source": "Mme.Magloire", "target": "Mlle.Baptistine", "value": 6},
    {"source": "CountessdeLo", "target": "Myriel", "value": 1}

  ]
}
{% endhighlight %}

The file contains a list of nodes, followed by a list of edges (links), a common format to store graph data. In the array of `nodes`, we have objects with the values `id` and `group`, the `links` array contain the edges that are defined via a `source` and `target`, which are the ids of the source and target nodes respectively).


First we will used D3's [d3-request module](https://github.com/d3/d3-request), specifically the JSON method to load the data. Two things are important to note:

 1. Once the  data is loaded it will be available in an object, just as we see it in the json file.
 2. The d3-request methods load **asynchronously**. That means that we'll not get a return value from the loading function right away, but rather pass a function that is executed when the data loading is complete. The benefit of the asynchronous function is, of course, that other processes can continue, e.g., a user interface wouldn't freeze up while a dataset is loaded.

We then use the [force layout](https://github.com/d3/d3-force) to calculate the initial positions and update them in "ticks":


{% include code.html id="d3_force" file="d3_force.html" code="" js="false" preview="true" %}


The layout uses a "cooling" factor that stops the iteration cycle.


### Other Layouts

There are many other layouts that can be very valuable, for. We'll revisit the layouts in class when we talk about the specific techniques they implement, but the principle is always the same: they take data and calculate derived data, which you then can use to position/scale graphical primitives on the canvas. You shouldn't have a hard time understanding any of the other layout examples.
