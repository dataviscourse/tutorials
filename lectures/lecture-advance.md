---
layout: code-lecture
title: "Advanced JS and D3"
permalink: /lectures/lecture-advance/
nomenu: true
---

## Advanced JavaScript

### Destructuring

#### List

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

Destructuring assignment allows you to assign the properties of an array or object to variables using syntax that looks similar to array or object literals. This syntax can be extremely terse, while still exhibiting more clarity than the traditional property access.

Without destructuring assignment, you might access the first three items in an array like this:

{% include code.html id="without_destructuring_lists" file="without_destructuring_lists.js" code="" js="true" preview="false" %}

Using the destructuring assignment, the code becomes:
{% include code.html id="destructuring_lists" file="destructuring_lists.js" code="" js="true" preview="false" %}

Destructuring assignment supports nesting and use of spread operators. Here we see examples of some different ways to destructure lists:

{% include code.html id="advanced_destructuring" file="advanced_destructuring.js" code="" js="true" preview="false" %}

#### Objects

Destructuring on objects lets you bind variables to different properties of an object. You specify the property being bound, followed by the variable you are binding its value to.

{% include code.html id="destructuring_objects" file="destructuring_objects.js" code="" js="true" preview="false" %}

### Promises

### Debugging

## Advance D3

### Brushes

### Drag

### Linked Views

## Browser based visualization with Front End Frameworks like (ReactJS, AngularJS, VueJS
