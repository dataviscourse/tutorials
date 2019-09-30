---
layout: code-lecture
title: "Advanced D3"
permalink: /lectures/lecture-d3-advance/
nomenu: true
---

## Brushes

One of the most important interactions you can add to your visualization is brushing. Brushing interaction allows one to select an area in a visualization. This can lead to selection of few points in the same view or across multiple linked visualization.

More technically brushing is the interactive specification of an one- or two-dimensional selected region using a pointing gesture, such as by clicking and dragging the mouse. Brushing is often used to select discrete elements, such as dots in a scatterplot or files on a desktop. It can also be used to zoom-in to a region of interest, highlight a region of interest, or any possible task you can think of for doing with selections.

The simplest possible brush is rectangular brush. Here's an example of a brush would look in a visualization.

<div text-align="center">
    <img src="./images/one_d_brush.jpg" width="800px" style="padding-bottom: 21px"/>
</div>

### Brushing with d3

The source code for `d3` brush implementation is location here: [d3 Brushes](https://github.com/d3/d3-brush)
There is a gallery for different possible brush implementation using d3 at this [link](https://observablehq.com/collection/@d3/d3-brush). _All the examples at this link are observable notebooks_

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

## d3.Group & d3.Groups

## Linked Views

## Browser based visualization with Front End Frameworks like (ReactJS, AngularJS, VueJS
