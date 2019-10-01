---
layout: code-lecture
title: "More Advanced D3"
permalink: /lectures/lecture-more-advanced-d3/
nomenu: true
---

## Brushes

One of the most important interactions you can add to your visualization is brushing. Brushing interaction allows one to select a subset of data in a visualization. This is designed to allow users to highlight data points in the same view or across multiple linked views, which in turn makes it possible to see relationships between points in these multiple views. Brushing is also used to select discrete elements, such as dots in a scatterplot or files on a desktop. It can also be used to zoom-in to a region of interest, highlight a region of interest, or any possible task you can think of for doing with selections.

More technically, brushing in D3 is the interactive specification of an one or two-dimensional selected region using a pointing gesture, such as by clicking and dragging the mouse. 

The simplest possible brush is rectangular brush. Here's an example:

<div text-align="center">
    <img src="./images/one_d_brush.jpg" width="800px" style="padding-bottom: 21px"/>
</div>

### Brushing with d3

The source code and documentation for `d3` brush implementation is location [here](https://github.com/d3/d3-brush).
There is a gallery for different possible brush implementation using d3 at this [link](https://observablehq.com/collection/@d3/d3-brush).

`d3` allows us to create 3 different types of brushes:

- `brushX` for brushing across X axis
- `brushY` for brushing across Y axis
- `brush` for brushing in both dimensions at once.

Creating any of the above brushes follows a similar procedure:

First we select or append a group element which will house our brush.

```javascript
const brushGroup = d3
  .select("svg")
  .append("g")
  .classed("brush", true);
```

We initialize a `d3` brush function as follows:

```javascript
const brush = d3.brush();
const brushX = d3.brushX();
const brushY = d3.brushY();
```

Depending on type of brush we use, we also need to specify certain parameters to it. The most important parameter is the `brush extent`. This is a two dimensional array such as `[[left, top],[right, bottom]]` and specifies the top left and bottom right corner of the area.

```javascript
const brush = d3.brush().extent([0, 0], [width, height]);
```

After this step the variable `brush` is a function which will add a `brush` overlay to our code. We do not call this function directly, but we use the syntax similar to we use for `d3.axis`:

```javascript
brushGroup.call(brush);
```

Let us take a look at a working code example:

{% include code.html id="brush_basic" file="brush_basic.html" code="" js="false" preview="true" %}

Right now the brushes don't do anything exciting but just draw rectangles on the screen. We need to attach events to brush to do something meaningful with them.

### D3 Brush events

`d3` exposes three brush events:

- `start`: This is triggered at the start of brush gesture, e.g `mousedown` and `touchstart`
- `brush`: This is triggered when the brush moves or resizes
- `end`: This is triggered at the end of brush gesture, e.g. `mouseup` and `touchend`

Let us look at a working example on a scatterplot. We will use the `iris` dataset.

{% include code.html id="brush_event" file="brush_event.html" code="" js="false" preview="true" %}

## D3 Groups

We will cover two d3 functions which might help you out. `d3.groups` and `d3.group`.

As its name suggests, `d3.group` groups values by key. It returns a map from key to the corresponding array of values from the input.

You need to include following snippet to import `d3-array` package:

```html
<script src="https://d3js.org/d3-array.v2.min.js"></script>
```

Let us look at a code snippet:

{% include code.html id="d3_group" file="d3_group.html" code="" js="false" preview="true" %}

This returns a Map object where key is each unique value you grouped on and the value is an array of all objects belonging to the key.


`d3.groups` does something similar:

{% include code.html id="d3_groups" file="d3_groups.html" code="" js="false" preview="true" %}

`d3.groups` just returns the same thing in nested list format. This is pretty useful for binding with `d3` without having to use `d3.entries`.

You can also nest on multiple keys, this just returns a nested Map:

{% include code.html id="d3_groups_nested" file="d3_groups_nested.html" code="" js="false" preview="true" %}

## Linked Views

Designing a complex visualization is always a challenge. There are multiple questions like: how do we structure our code-base?, how do views communicate with each other?

Object Oriented approach is usually a really easy and beginner friendly way to design your multi-view visualization with interactions between them.

{% include code.html id="linked_view" file="linked_view.html" code="" js="false" preview="true" %}

Let us take a look at individual classes and compare how the code is structured.

### Scatterplot With Brush

{% include code.html id="scatterplotWithBrush" file="scatterplotWithBrush.js" code="" js="true" preview="false" %}

### Regular Controlled Scatterplot

{% include code.html id="scatterplot" file="scatterplot.js" code="" js="true" preview="false" %}

## Using D3 with other front end libraries

If you are working on a large project where data visualization is a part, there is a good chance that you are using some front end framework like `React`:

Most of the frameworks above have dedicated data visualization libraries written for them, here are some links:

- [Victory](https://formidable.com/open-source/victory/?r=m7) developed and maintained by Formidable Labs
- [React-vis](https://uber.github.io/react-vis/?r=m7) developed and maintained by Uber

You can find more such libraries for any other framework you use.

The other approach is to use D3 in conjunction with your library. There are multiple approaches to this, we will just discuss those on a higher level:

- Make React call D3 render functions
  - Pros: Easy to setup
  - Cons: Both try to control DOM and may need to serious performance issues because both libraries do not respect each others renders
- Allow D3 and React to control their own setup by creating D3 visualization as black-box components
  - Pros: Quite performant if setup correctly.
  - Cons: Tricky to setup correctly and needs a bit of underlying knowledge about how both React and D3 handle DOM updates, else causes same problems as above approach.
- Allow React to control DOM and use D3 to do calculations like scale and layouts
  - Pros: Super performant (of course if you use React properly)
  - Cons: Almost no documentation on using React and D3 in this way.
