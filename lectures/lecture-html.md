---
layout: code-lecture
title: Hypertext Markup Langugage (HTML)
permalink: /lectures/lecture-html/
nomenu: true
---

*Based on material by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week2.html) and Kevin Sun*  

In this module, we will go over the basics of how the content of a web page is represented in HTML, as we will use HTML and other web technologies to create data visualizations. HTML stands for “HyperText Markup Language”. 25 years ago, [that used to be a meaningful description of what HTML actually did](http://www.w3.org/People/Raggett/book4/ch02.html): it has links ([hypertext](http://en.wikipedia.org/wiki/Hypertext)), and it is a [markup language](http://en.wikipedia.org/wiki/Markup_language). But we will be using many things from the [HTML5 standard](https://www.w3.org/TR/html5/), which does much, much more: [graphics](https://developer.mozilla.org/en-US/docs/Web/SVG), [audio, video](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video), etc. 

Importantly, we will not be building websites, but **web applications**, i.e., complex programs that only 15 years ago were not possible in the browser. So it is easier to think of HTML as “whatever it is that web browsers know how to interpret”, and just not think about the actual term.

### Elements

The important thing about HTML is that the markup is represented by elements. An HTML element is a portion of the content that is surrounded by a pair of tags of the same name. Like this:

{% include code.html id="basic_element" code="<strong>This is an HTML element.</strong>"  file=""%}

These elements sometimes have meaningful names. In this element, `strong` is the name of the tag; the open tag is `<strong>`, and the matching closing tag is `</strong>`. The way you should interpret this is that the text “This is an HTML element” should be “strong”, i.e., typically this will be bold text.

#### Closing and Self-closing elements
Most elements apply to some content in between them; for the `strong` example, that is the text between the opening `<strong>` and closing `</strong>` tag. 

Some elements don't have internal content between their opening and closing tags, such as a ``<br>`` (breaking a line) or ``<img>`` (including an image) tag. The former doesn't even need attributes, the latter is typically fully specified by attributes. 
Note that HTML5 is no longer a XML-based language, so you can use tags without closing elements, such as ``<br>`` (breaking a line) or ``<img>`` (including an image). What you'll also see in slightly older code is the following shorthand notation: ``<foo />``, which is equivalent to ``<foo></foo>``.


#### Nesting
 
HTML elements can and commonly do nest:

{% include code.html id="nested_element" code="<strong>This is strong and <u>this is underlined and strong.</u> Just strong again.</strong>"  file=""%}

#### Attributes

In addition to the names, opening tags can contain extra information about the element. These are called attributes:

{% include code.html id="attribute" code="<a href='http://www.cs.utah.edu'>A link to the School of Computing</a>"   file=""%}

In this case, we’re using the ``a`` element (which stood for “anchor”, but now is almost universally used as a “link”). The attribute  ``href`` means “HTML reference”, which actually makes sense for a change. The meaning given to each attribute changes from element to element. Note that you can use either single `'` or double `"` quotes. 

{% include code.html id="title" code="A <strong title='More information on hover!'>title attribute</strong> is useful to reveal more information when needed."   file=""%}

We will use element attributes in pretty much every example from now on. The most important ones are ``id``, ``class``, and ``style``. The ``id`` attribute gives the attribute a unique identifier, which can then be used to access the element via Javascript (we’ll see how later). Think of it as making the element accessible via a global variable. This is as convenient as a global variable, and potentially just as confusing: needing lots of different element ids might be a sign that you could organize your code better. The class and style attributes will be explained in the CSS section.


##### Metadata and Basics
{% include code.html id="html_basics" file="html_basics.html" code="" %}

HTML documents contain **metadata**, which is specified using tags that don't have visual equivalents on the website:

* ``<html>`` creates the entire HTML container.  
* ``<head>`` creates the header (generally where the title and links to style sheets/scripts are found).  
* ``<meta>`` is used to provide meta-information, such as character encoding or other instructions to a browser. 
* ``<script>`` links to or embeds a script (we will do that a lot).  
* ``<style>`` for embedding a style in the website.  
*  ``<link>`` to reference an external document, often a css document like that: ``<link rel="stylesheet" type="text/css" href="theme.css">``. The `rel` attribute defines the relationship to the active document, the type attribute tells the browser which type of file to expect.   
* ``<body>`` marks the container of the content of the website.    

##### Lists and Tables
{% include code.html id="html_lists_tables" file="html_lists_tables.html"%}

##### Structuring / Layouting
{% include code.html id="html_structure" file="html_structure.html"%}

##### Forms
{% include code.html id="html_forms" file="html_forms.html"%}

 
 A comprehensive and well structured list of all elements can be [found at MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).
    
### Necessary Boilerplate

An HTML5 document has a little bit of necessary boilerplate that you should just copy and paste every time you need to get started. Every HTML5 document you create in class should have this skeleton:

{% include code.html id="simple_example" file="simple_example.html" code="" %}


### The Document Object Model (DOM) 

As we have seen above, a markup document looks a lot like a tree: it has a root, the HTML element, and elements can have children that are containing elements themselves.

While HTML is a textual representation of a markup document, the DOM is a programming interface for it. DOM stands for “Document Object Model”, and in this class we will use “DOM” to mean the tree created by the web browsers to represent the document, and the API that they provide in order to access it. 

#### Inspecting the DOM of a website.

Perhaps the most important habit you will learn in these first web lessons is the following: when in doubt, go to the Developer Tools. In this case, we’ll look at the Element tree, by clicking on the menu bar: View → Developer → Developer Tools. Alternatively, you can right click on any part of the webpage, and choose “Inspect Element”. Notice that there can be a big difference between what is in the DOM and what is in the source. In fact, much of this class is about dynamically generating DOM elements. Here is a [good overview of the developer tools](https://developer.chrome.com/devtools).
