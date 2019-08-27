---
layout: code-lecture
title:  Cascading Style Sheets and Selectors
permalink: /lectures/lecture-css/
nomenu: true
---

*Based on material by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week2.html) and Kevin Sun*  

HTML specifies the content of a web page, but plain HTML says relatively little about how the content looks. This is where CSS comes in. CSS stands for Cascading Style Sheets: they are external declarations that control the way your elements will get rendered by a web browser. A full discussion of CSS syntax is, as usual, given at the [MDN CSS website](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax); we show the very basics here.

A stylesheet will usually consist of a list of CSS rules that are inserted in ``<style>`` elements in the HTML header, ``<head>``. A single CSS rule associates a CSS selector with a set of CSS declarations.

**More important than styling, however, are the rules on how we identify elements in the dom, the selectors.**

### CSS Element Selectors

Let’s look at a very simple CSS rule:

{% include code.html id="simple_css" file="simple_css.html" code="" %}

In this rule, **`strong` is the element selector**, and each line inside the curly brackets is a **declaration**. Roughly, the way this goes is: for every DOM element with tag name strong, make its background color brown, and its font size 150% of the base size. CSS rules are applied in order that they appear in the document, and if more than one rule matches the element, then they both apply. For instance, the example below is entirely equivalent to the above:

{% include code.html id="simple_css2" file="simple_css2.html" code="" %}

### CSS Class Selectors

CSS selectors can be much more powerful than selecting on element names. For example, we can create user-defined “classes” of styles. Classes allow us to define certain elements to be of a specific type that is then formatted consistently. Here is an example with "important" text and a "footnote". Both are in a `<div>`, but they have different semantics, and we also want to display them differently. Class selectors are identified by a leading period `.`, e.g., `.menu`.

{% include code.html id="css_classes" file="css_classes.html" code="" %}

Note that we can also apply multiple classes to a single element, as you can see in the important footnote. 

### CSS ID Selectors

ID selectors work similar to class selectors, but IDs may only be used once for an element in the DOM. ID selectors are identified by a leading `#`, e.g., `#header`. You can use IDs as "anchors" to refer to a site by appending ``#idname`` to the URL. For example, following [this link](#css-id-selectors) (`#css-id-selectors`) will scroll your browser to this section. 

But you can also use IDs to apply custom styles in CSS:

{% include code.html id="css_ids" file="css_ids.html" code="" %}

You can also use the combination of IDs and CSS to create layouts of a page:

{% include code.html id="css_layouts" file="css_layouts.html" code="" %}

However, nowadays, you should probably start using [CSS Grid Layouts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) to lay out a potentially responsive web page. 

### CSS Relationship Selectors

CSS selectors let you match elements based on their relationship with other elements. While I will simply refer you to the [MDN Selectors webpage](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors) for the full reference, I want to highlight two particularly important ones: the child selector and the descendant selector.

The child selector matches every time an element is directly enclosed by a different element. For example, consider the following rule involving the child selector:

{% include code.html id="css_relationships" file="css_relationships.html" code="" %}

### Multiple Rules in CSS

When more than one CSS rule matches, then different CSS declarations might conflict with one another. In that case, “the most specific declaration wins”. The rules for what counts as more specific are [really disgusting](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity), so if you find yourself debugging CSS code because the styles “don’t take”, the first thing you should try is to set completely different classes for the element, add all the declarations to this class. Then, with help from the Developer Tools, you can add classes back to your element to see which declarations might be winning the specificity race. In order to avoid this kind of trouble, it’s better to stick to simple declarations as much as possible.

Try editing CSS directly in the inspector! 

### Pseudo Classes

Pseudo classes are selectors for states that can be combined with other selectors. Typical examples are [`:hover`]() and [`:visited`]() which can be used like this: 

 
 {% include code.html id="css_pseudo" file="css_pseudo.html" code="" %}



### Other ways of declaring CSS 

You can provide CSS stylesheets as an external file. This is very useful when you want to share CSS rules across many different documents. In that case, you include the following element in your ``<head>``:

``<link rel="stylesheet" href="style.css"/>`` 

In this case, style.css should be an additional file that consists entirely of CSS rules.

Finally, you can place CSS declarations directly inside an element. You do this using the style attribute, which most HTML elements support. For example, if you have this CSS rule:

{% include code.html id="css_inline" file="css_inline.html" code="" %}

It’s a bad idea to do this in HTML that you write manually: you’re mixing content with presentation, and making it hard to reuse the declarations. But later on we will be writing code to generate elements in the DOM for us, and in that case, this will be a very common and good thing to do. In this latter situation, it’s a good thing to do because the reusability will be represented in our Javascript source code.
