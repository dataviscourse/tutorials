---
layout: code-lecture
title:  "D3: Data Driven Documents the Basics"
permalink: /lectures/lecture-d3/
nomenu: true
---

*Material based on the [D3 Intro by Vadim Ogievetsky](http://vadim.ogievetsky.com/IntroD3/), Scott Murray's Interactive Data Analysis for the Web, and the [D3 website](http://d3js.org/).*

## D3: Data Driven Documents

D3 is a javascript library for manipulating the DOM based on data. D3 was originally written by Mike Bostock, Vadim Ogievetsky, and Jeff Heer and published [as a paper](http://idl.cs.washington.edu/files/2011-D3-InfoVis.pdf) at InfoVis, the main information visualization conference; at this point it has a large number of contributors, yet Mike Bostock still is the core developer. It's also one of the overall most popular projects on GitHub! D3 certainly owes some of its popularity to riding the everything-on-the-web wave. Nevertheless, the way in which you can express relationships between data and visual elements is fundamentally superior than any other library available, open source or not! It is nothing short of a breakthrough in the way we use code to express visual encodings. 

D3 can be used to manipulate pure HTML, but most commonly it's used in combination with SVG (i.e., we will be producing SVG charts using D3). 

In addition to the introduction in Scott Murray's book (the mandatory reading) you should work with the [D3 API Reference](https://github.com/d3/d3/blob/master/API.md) to look up particulars of all the features of D3. And of course, you should be learning by examples. A great collection are [Mike Bostock's blocks](http://bl.ocks.org/mbostock) which contain simple examples, such as a [bar chart](http://bl.ocks.org/mbostock/2368837) to complex examples such as [this calendar view](http://bl.ocks.org/mbostock/4063318).

You can download the library to run locally on your computer from the [D3 Website](http://d3js.org/), or you can link directly to the latest release with this snippet: 

{% include code.html id="de_include" file="d3_include.html" code="" js="false" preview="false" %}

You should also note that D3 underwent a major version change from D3 v3 to D3 v4. Unfortunately, many examples you'll find on the web will be using version 3. We'll be using D3 v5, which is a minor update from D3 v4, in this class. As such, you can't necessarily expect to just copy and paste example code from the web and have it work. Check out the [release notes](https://github.com/d3/d3/blob/master/CHANGES.md) to learn about the changes across the D3 versions. 

### Selections

[See API Reference](https://github.com/mbostock/d3/wiki/Selections)

Here is a minimal D3 example taken from the D3 website: 

{% include code.html id="d3_select" file="d3_select.html" code="" js="false" preview="true" %}

You can see that we achieve a similar result to the DOM manipulation examples we had before. We select an existing element in the DOM, here the first `<p>` element, and apply a style.  However, you can also see differences: instead of having to use the API standard `document.getElementsByTagName` we use [`d3.select`](https://github.com/d3/d3-selection/blob/master/README.md); and instead of using `setAttribute("style", "color: steelblue;")` we use D3's [`style`](https://github.com/d3/d3-selection/blob/master/README.md#selection_style) method. 

`d3.select` selects the first element that matches a selector. **Selectors** can specify tags (`p` in our example above), classes, and IDs, all through the same interface: 

{% include code.html id="d3_selectors" file="d3_selectors.html" code="" js="false" preview="true" %}

Notice, however, that as mentioned previously, only the first element that matches is selected. Of course, it is more practical to select all elements of a certain type, which we can achieve with `d3.selectAll`


{% include code.html id="d3_selectall" file="d3_selectall.html" code="" js="false" preview="true" %}

The last example illustrates the **declarative approach of D3**: we don't have to iterate over a list of elements and apply the style. Instead we select a set of elements through rules and declare properties. 

Once you have a selection, you can bulk-modify it's content, not only in terms of style, but we can modify [arbitrary properties](https://github.com/mbostock/d3/wiki/Selections#property) using `selection.property(name[, value])`, the [textual content of the elements](https://github.com/mbostock/d3/wiki/Selections#text) with `selection.text([value])`, etc. We can also append elements: 


{% include code.html id="d3_append" file="d3_append.html" code="" js="false" preview="true" %}

Here is a code snippet that we will use in future examples, included as run.js:

{% highlight javascript linenos %}
var button = d3.select("body").append("button");
button.text("Run!");
button.on("click", execute);
{% endhighlight %}

Here we have three SVG rectangles and use selectAll to apply a new style to them. Notice two things: 

 1. the **method chaining** used to make this convenient to write,
 2. the use of **anonymous functions** and the parameters d and i.

{% include code.html id="d3_selectallsvg" file="d3_selectallsvg.html" code="" js="false" preview="true" %}

### Data

THE key feature of D3 is mapping DOM elements with data. We can do this by calling the [`data()`](https://github.com/d3/d3-selection/blob/master/README.md#selection_data) method on a slection:

{% include code.html id="d3_data" file="d3_data.html" code="" js="false" preview="true" %}

D3 binds the data that is passed to a selection directly to the DOM elements. We can see this by logging and/or inspecting the selection. 

Here we've also used **data-driven styling for the first time**! By setting the width of the rectangle dynamically to the size of the data item we get a data driven bar chart! 

What happens if we have more data points than elements? Let's try it: 

{% include code.html id="d3_enter1" file="d3_enter1.html" code="" js="false" preview="true" %}

There are still only three elements, it doesn't matter how many data points we have - we can't use more than there are elements to select. What to do? [`enter()`](https://github.com/d3/d3-selection/blob/master/README.md#selection_enter)! The enter selection holds placeholders for all the data elements that had no corresponding DOM element. We can use this selection to append new elements. 

{% include code.html id="d3_enter2" file="d3_enter2.html" code="" js="false" preview="true" %}

Progress - we have one element for each data item, but it doesn't look good and it's not drawn based on data. To fix this, we can apply data-driven attributes to the enter selection as well:

{% include code.html id="d3_enter3" file="d3_enter3.html" code="" js="false" preview="true" %}

Now, that works! But we're duplicating code. So instead we can do this shorter version: 

{% include code.html id="d3_enter4" file="d3_enter4.html" code="" js="false" preview="true" %}

So what if we don't have initialized svg elements at all? 

{% include code.html id="d3_enter5" file="d3_enter5.html" code="" js="false" preview="true" %}

That's great! D3 can also select things that aren't there. Sounds strange, but that is very practical. We rarely start with existing DOM elements but mostly want to create them completely in code. 

Now let's explore what happens when we have fewer data items than DOM elements:

{% include code.html id="d3_exit1" file="d3_exit1.html" code="" js="false" preview="true" %}

We have a similar problem as before. Here, the element that was not bound to data just remains as it was. Fortunately, there is a solution, which is the [`exit()`](https://github.com/d3/d3-selection/blob/master/README.md#selection_exit) selection.

{% include code.html id="d3_exit2" file="d3_exit2.html" code="" js="false" preview="true" %}

We now have all the knowledge to select, bind data, react to changes in data. Next, we'll look at how we can make state changes look great. 

### Transitions

One of the cool features of D3 is that transitions are baked in! 

{% include code.html id="d3_transition1" file="d3_transition1.html" code="" js="false" preview="true" %}

Cool, but we're missing the enter again: 

{% include code.html id="d3_transition2" file="d3_transition2.html" code="" js="false" preview="true" %}

Here, we've handled the enter and chained two transitions. 

### Drawing Lines

Here's one way to draw a line:

{% include code.html id="d3_lines1" file="d3_lines1.html" code="" js="false" preview="true" %}

But we already know that. There must be something better, and there is! 

{% include code.html id="d3_lines2" file="d3_lines2.html" code="" js="false" preview="true" %}

## Exercise

Here is an [exercise to practice your D3 skills](https://jsbin.com/yuzomev/edit?html,js,output).

