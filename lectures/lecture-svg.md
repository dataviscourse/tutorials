---
layout: code-lecture
title:  Scalable Vector Graphics (SVG)
permalink: /lectures/lecture-svg/
nomenu: true
---

*Based on material by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week2.html) and Kevin Sun*  

So far we have only seen textual content in HTML, and this is a data visualization course. SVG (“Scalable Vector Graphics”) is a subset of the HTML5 standard that will provide us with essentially all of our graphical needs. SVG is extremely powerful, broadly supported, and very easy to program for. It’s also the preferred target for D3, the javascript library we’ll use for our visualization design. 

Alternative methods for bringing dynamic graphics to your browser are [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) and [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), which we unfortunately won't be tackling. 

### Minimal Example

An SVG drawing starts with an `<svg>` element, which requires width and height attributes, specified in pixels:

{% include code.html id="svg_minimal" file="svg_minimal.html" code="" %}

This is results in a blank canvas, which is kind of boring, but you should be able to verify, using the Developer Tools, that there is in fact an SVG element there. In the following, you’ll learn how to add basic graphical shapes to the SVG element.


### Circle 

[Circles](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle) have an x (`cx`) and a y (`cy`) position specifying the center point, in addition to a radius (`r`). 

*I'm going to omit the HTML boilerplate going forward, unless there's reason to include it. Note though, that valid HTML always needs to include that.*

{% include code.html id="svg_circle" file="svg_circle.html" code="" %}

### Coordinate System

The [SVG Coordinate system](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions) originates from the top-left. 

{% include code.html id="svg_coordinates" file="svg_coordinates.html" code="" %}

Also, SVG dimensions are given in “user units”, which by default match to pixels. How the user units match to pixels can be changed, as the name “scalable” implies.


### Presentation Attributes

As you might have noticed, some appearance aspects in SVG are controlled by attributes (position, size); others (color, weight) are controlled by [CSS properties](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation). This is a perennial source of confusion, and unfortunately there’s no good way around it. 

To add to the confusion, a subset of SVG attributes can also be specified via CSS: these are the [“presentation attributes”](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute). The following code has the same effect as the one above, where we used the style tag: 
 

{% include code.html id="svg_circle_fill" file="svg_circle_fill.html" code="" %}
 
It’s worth remembering this because CSS declarations for these attributes will override inline attribute definitions in the DOM. This is in turn inconsistent with the rule for the style attribute itself, which overrides CSS definitions (on behalf of whoever designed this standard: I am sorry). 
 
Finally, **SVG style attributes are not the same as HTML style attributes**. For example, to color a `<div>`, we would use the `background-color` css attribute, but to color an SVG circle, we use the `fill` attribute.

This inconsistency is propagted to things like the HTML `title` attribute, which doesn't work in SVG, but instead you have to use a [`title`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/title) element:


{% include code.html id="svg_title" file="svg_title.html" code="" %}


### Ellipse 

Ane [Ellipse](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse) is specified by position, a radius in x and a radius in y:

{% include code.html id="svg_ellipse" file="svg_ellipse.html" code="" %}

### Rectangle 

[Rectangles](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) are specified with x, y, width, and height.

{% include code.html id="svg_rect" file="svg_rect.html" code="" %}

### Lines 
[Lines](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line) are specified using two points, (x1, y1), (x2, y2).
{% include code.html id="svg_line" file="svg_line.html" code="" %}

### Text 
You can also specify [text](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text) in SVG:
{% include code.html id="svg_text" file="svg_text.html" code="" %}

### Path 

The SVG [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) element is how you “escape” the basic SVG shapes. In case none of the predefined shapes are good enough for what you're trying to achieve, you can draw any arbitrary shape you want using the path element. We will usually not use it manually, but it’s important that you know it exists, because it helps you understand how much of D3 works under the hood.

The path element is made up of a micro language. Here are some commands: 

 - `M 10 10` **M**oves to the position without drawing a line.
 - `L 50 10` Draws a **L**ine from the previous position to the position specified.
 - `Z` closes a path using a straight line to the first point.
 - `C` allows us to draw curves, specifically [cubic bezier curves](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#Cubic_B%C3%A9zier_Curve) (there are various other curves).

{% include code.html id="svg_path" file="svg_path.html" code="" %}

The curve starts from the previous position and uses two support points (parameters) through which, in the case of the cubic bezier curve, it doesn't go trough, and then terminates at the final point.

Beyond this one simple example that does not do the path element justice, take a look at the [MDN path tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths).

### Ordering 

The order in which elements are drawn is the order in which they appear:

{% include code.html id="svg_order" file="svg_order.html" code="" %}

### Grouping and Transforming

[Grouping elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g) is a very powerful idea, and we will use it extensively when we get to use SVG for actual visualizations. It is powerful because it gives us abstraction, in the same way that a function groups a sequence of operations under a single name. In dynamic visualizations, this makes it possible for us to move a large number of elements by simply taking one branch of the DOM and placing it in a different subtree; without groups, we would have to remember over and over again which elements we cared about.

Here's an example where we use a group to inherit presentation attributes:  

{% include code.html id="svg_group" file="svg_group.html" code="" %}


In addition, SVG groups enable geometric transformations. Geometric transformations are amazingly useful when we want to change the positions of a large number of elements in the same way, or when we want to express the positions of the elements in a more convenient manner. For example, recall that SVG’s basic coordinate system increases the y coordinate in the downward direction. If we want to draw a scatterplot based on the example above, then we’d have to remember every time to subtract the y coordinate we want from the height of the SVG element.

This is annoying and error-prone. Instead, we could encode that transformation directly, using SVG’s [transform](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform) attribute:

{% include code.html id="svg_group2" file="svg_group2.html" code="" %}

The transform attribute is read right-to-left, and it’s saying: 

to get the outer y coordinate, multiply the inner y coordinate by -1 (as specified by the `scale(1, -1)`), and then add 200 (as specified by `translate(0, 200)`). In other words, outer_y = 200 - inner_y, which is precisely the flipping we need. 

Now the y coordinates behave as we would expect them in a scatterplot: increasing y means going up.

There are also more [complex transformations for rotations or distortions](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform). 

The main problem with these transformations, is that they apply to everything:

{% include code.html id="svg_translate_text" file="svg_translate_text.html" code="" %}

Clearly, we don’t want that to happen in every situation. 


## Exercise

Complete the exercise described in [this JSBin](https://jsbin.com/rudakit/edit?html,output).