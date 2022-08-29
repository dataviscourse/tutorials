---
layout: code-lecture
title:  DOM Manipulation 
permalink: /lectures/lecture-dom-manipulation/
nomenu: true
---
*Material based on the lecture by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week3.html).*

After we covered the basics of JavaScript before, it's now time to explore how javascript interacts with the DOM and thus makes all the interesting things in the browser happen. 
Like we’ve seen before, the HTML we write is represented as a tree inside a web browser. What we are going to turn to now are the JavaScript APIs that web browsers provide to let you edit the DOM dynamically, so that we can build our visualizations with code instead of text editors.

While we will manipulate the DOM mainly through libraries (we will use [D3](http://d3js.org/), but other libraries such as [JQuery](https://jquery.com/) or [React](https://reactjs.org/) are also popular for non-vis DOM manipulation) you can also manipulate the DOM directly through the standard DOM API through the `document` object. Check out the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/document) on the document object.

Here are the very first steps:

{% include code.html id="dom_manipulation" file="dom_manipulation.html" code="" js="false" preview="true" %}

`document` is a global javascript object that contains the DOM. If you log the document object you will see exactly the same as in the DOM view in the web inspector. It is this object that we are manipulating dynamically and that the browser then renders. The document object contains methods, like the [`getElementByID()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method we're using here to retreive a specific element, or the [`createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), which creates a new HTML element, or the [`createTextNode()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode) methods used to create new text content. We've also used the [`appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) method (which is defined on a [`node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)) that appends the passed element to the end of the list of the node. 

Now we can make use of the features we learned about before to make more complicated programs that create websites: 

{% include code.html id="dom_manipulation2" file="dom_manipulation2.html" code="" js="false" preview="true" %}


We can also control the attributes of elements, e.g., for styling and positioning with CSS:

{% include code.html id="dom_manipulation_styling" file="dom_manipulation_styling.html" code="" js="false" preview="true" %}

The coloring here is defined using the [HSL color model](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl()). 

Remember that in JavaScript we can attach new fields to existing objects. You can do this to DOM elements returned by the API, and that turns out to be very powerful. Note how in the snippet below, we are adding a new method ```update``` to the node returned by ```divWithText```. When this method is called, we add the passed value to the current amount (stored at ```v```), compute new positions from ```v```, and update the text content of the node. By calling the update method we can get an **animation**:


{% include code.html id="dom_animation" file="dom_animation.html" code="" js="false" preview="true" %}

Notice the ```tickForever``` function. We can't use an infinte while loop here. If we did, the element attributes would be changed, but the user of the web browser does not get to see it, because the web browser does not ever get a chance to update the graphical representation of the DOM. The way to solve this problem is by using a special browser API called [```requestAnimationFrame```](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). This API lets you tell a web browser that you’d like the opportunity to change something in the DOM. The next time the web browser is sitting idly, after having drawn all of its needed graphics, it will call the function passed as a parameter. Then, we just need to make sure that after updating the graphics, we call requestAnimationFrame again. The solution is a recursive version of the endless loop above ```(function f() { tick(); f(); })```. The fundamental difference here is that instead of making the recursive call directly, we ask the browser to make the recursive call, after it has updated the graphics. This way there’s always a step in between every update where the web browser updates the UI and graphics, and you get nice animations as a result.

While we've worked with regular HTML elements here, the possibilities demonstrated equally apply to SVG, of course. So in theory, you would have all the tools to create data driven visualizations. Of course, libraries such as D3 make our lives easier!


## JavaScript Events

Up to this point we have only dealt with documents that are independent from user interaction. For data visualization, however, interaction is critical. Here we will introduce a couple of elementary concepts of how you can define and listen to events in JavaScript. We will be using DOM event handlers. As always, take a look at the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers).

Here is the most simple example possible for events, using two different methods:

{% include code.html id="simple_event" file="simple_event.html" code="" js="false" preview="true" %}

The first button defines the function to be called - `messageMe()` directly in HTML. When the button is clicked, the corresponding function is called. The second button has an identifier. In the script we retrieve the button and add the function to be called dynamically. 

We don't have to use buttons to react to clicks though! Any DOM element can trigger an event. So we've also added a `onClick` event call to a `<div>`.

``onclick`` is of course not the only event that we can listen to. Here is an example for how to react to changes in a drop-down box with the ```onchange``` events. 
{% include code.html id="event_change" file="event_change.html" code="" js="false" preview="true" %}

Here we also make use of the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) object that is passed along with the event call to identify the HTML element that triggered the event and retrieve its value.

Other [useful events](https://developer.mozilla.org/en-US/docs/Web/Events) are ```onload```, ```onmouseover```, ```onmouseout```, ```onresize```, etc.  


And finally, we can of course listen to events that are triggered by interacting with an SVG element:

{% include code.html id="event_svg" file="event_svg.html" code="" js="false" preview="true" %}

So far so good – you can now write interactive code! If you know how to use these events you should be able to deal with all the interaction that you will encounter in the course of this class!

