---
layout: code-lecture
title:  JavaScript Fundamentals
permalink: /lectures/lecture-javascript-es6/
nomenu: true
---

*Material based on the lecture by [Carlos Scheidegger](http://cscheid.net/courses/spr15/cs444/lectures/week3.html)* 

If you’re following the text below, my suggestion is that you either open the Developer Tools’s JavaScript console on a browser window, and type the examples to see what they do, like we go over in class. You should also try variants, and just generally play around with the console, to get a feel for the language.

Before we get started, though, a few words of warning: there is a lot of bad JavaScript advice on the internet. For example, although StackOverflow is typically a high-quality Q&A website, I would stay well away from it when it comes to JavaScript (why that is the case is beyond my understanding). Finally, the introduction below is not meant to give you a comprehensive description of JavaScript, but rather a foothold.

Once you become proficient in the language, then you can start worrying about best practices and special cases, especially as they related to performance and portability across browsers. It’s easier for you simply not to worry about that kind of stuff right now. (This does mean that if you’re a veteran JavaScript programmer, you’ll spot places where what I’m writing is not 100% accurate. If you were to complain, you’d be technically correct (which is the best kind of correct), but what are you doing reading a JavaScript beginner’s guide?

## JavaScript Background

Why do we want to use JavaScript? So far we have only written **static HTML and SVG code**. In your homework, for example, you have to encode a dataset by hand multiple times: for your line-chart, bar chart, scatterplot, etc.
If we had a dynamic and general way to load the data, we could use the same variables for all charts and we could also plot the charts with various datasets of different size and with different characteristics. I like to think of pure HTML and SVG as analogous to pen and paper - you can create things that look nice once, but you **can't re-use them efficiently and you can't interact with them**. Computer programming brings **interactivity and generalizability (re-use)** to the table. We can tell the computer how to do something for certain classes of (legal) input, and the computer will do that for all possible cases of legal input. 
  
JavaScript is the most important programming language of the web, and the only programming language that can be used on most web-browsers without any plugins. Alternatives such as Java Applets or Flash were popular in the past but have lost significant ground to JavaScript and will be discontinued in the near future. JavaScript is mostly used on the client-side of a client-server application, other languages such as Java and Python are popular on the server, but JavaScript is nowadays also used on the server e.g., using [Node.js](https://nodejs.org/). We will be focusing on the client-side in this class. 

JavaScript can be used with **imperative/procedural, object-oriented, and functional programming styles**.  

It is a **dynamically typed language**, which can be strange for developers who mainly work with strongly typed languages such as C/C++ and Java. 

Also, Javascript uses **prototypical inheritance** instead of a class-based model for it's object oriented purposes, yet the latest version of JavaScript has introduced "syntactic sugar" to make object-oriented programming more consistent with other programming languages. That means there now are "class" definitions, but you still can use the prototypical features for inheritance that can be extended at runtime. If this doesn't mean much to you now, don't worry - we'll go through it slowly.


## Versioning and Transpiling 

JavaScript has undergone many versions, and a while ago the JavaScript language started to be standardized by the Ecma International. Significant changes were introduced with ECMAScript 6 in 2015 (also called ECMAScript 2015), which is the basis of this tutorial. Since then, ECMAScript has transitioned to a more incremental update plan, so that ECMAScript 7 and 8 are only minor updates.  

Instead of relying on a particular version, you should check for the availability of features [across browsers](http://kangax.github.io/compat-table/es2016plus/).

Older browsers, even those that are currently still in use (I'm NOT talking about Internet Explorer 6 here), will unlikely support current and future features. Fortunately, there are various remedies for that, so that you can start using these features now. Note that for all classwork, we will be using the latest Google Chrome, so you can rely on that and avoid using these remedies. 
 
The most important approach to making your state-of-the-art JavaScript code compatible is transpiling. I.e, you take your code, run a transpiler (transformation + compiling) such as [Babel](http://babeljs.io/repl/), and out comes an ECMAScript 5 compatible code file. 
 
Here is an example of how a ES6 code feature is transpiled into ES5 code:
 
{% include code.html id="transpile" file="transpile.js" code="" js="true" preview="false" %}
 
Again, you won't need to do this for this class, but in modern web-development this (and other steps) are commonly run to translate, check (lint), and minify your JavaScript code. 

## JavaScript - The Very Basic

If you know any other mainstream programming language, JavaScript will feel sufficiently familiar. 

We can write to the console (helpful for debugging by calling the log method of the console object). **Hint: open up your browser's developer tools to see the output generated by the examples here. Type in a `clear()` and re-execute this as we go so that it's easier to follow along)**

{% include code.html id="consolelog" file="consolelog.js" code="" js="true" preview="false" %}


It has **variables** which hold **values**:
{% include code.html id="variables" file="variables.js" code="" js="true" preview="false" %}

The first thing to notice is that JavaScript’s variables are **dynamically typed**: you don’t need to declare their types before using them, and they can refer to values of different types at different times in the program execution. (This is convenient but quite error-prone: it’s usually a bad idea to make too much use of this feature.)

You also do not need to declare a variable ahead of time. If you don’t, then JavaScript either assumes you’re referring to an already existing variable, or it creates a new global variable. Again, this is convenient but very error-prone (this is a theme, as you’ll see). One common source of confusion is that typos in variable assignments are not caught: they just become global variables.

To create a **local variable**, use the keyword ``var``, ``let``, or ``const``. Local here refers to the current execution context. When used within a function or block these variables are **private to that function/block**, however, when they are declared outside a function, as in the above example, they are still global. 

So what is the difference between these? 

 * ``var``creates variables of **function scope**. That means that the only way to isolate a variable, is to wrap it in a function. This is different from most programming languages, and has rarely advantages. 
 * ``let`` creates a variable of **block scope**, which is similar to most other programming languages. The means that a variable defined with ``let`` within an ``if`` clause, cannot be accessed outside of that ``if`` clause. 
 * `` const`` creates a variable of **block scope** (again, if defined within a block, otherwise global) where the variable can't be reassigned. That doesn't mean that the variable is immutable, though, it just means that it can't be reassigned.
 
 {% include code.html id="scope" file="scope.js" code="" js="true" preview="false" %}


As a general rule: **minimize your use of global variables, and never define global variables in a function**.

You can execute **operations** on these variables. Below are a couple of important examples, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)  for the full list:

{% include code.html id="moperators" file="operators.js" code="" js="true" preview="false" %}

### Arrays

Array literals are declared using square brackets and addressed with square brackets and a reference to the index starting with 0. Arrays in JavaScript are more like Lists in other languages, such as Java. They don't have to be allocated ahead of time and can be easily extended.  

{% include code.html id="marrays" file="arrays.js" code="" js="true" preview="false" %}

You can do much more with arrays than shown here, again, check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Arrays are very important for data visualization, so take the time to go through this! 

### Objects

[Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) are the second type of compound values in JavaScript. 

**Objects in JavaScript are also dictionaries/hash maps/associative arrays (pick your favorite name).**  
{% include code.html id="mobjects" file="objects.js" code="" js="true" preview="false" %}


### Control Structures

JavaScript comes with standard conditional control structures - if and switch. 

{% include code.html id="control_structures" file="control_structures.js" code="" js="true" preview="false" %}

### Loops

Loops are C-like: for, do-while and while loops are available. To loop over arrays, use either a regular for loop, the [forEach function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) of arrays, or the new for-of statement.

{% include code.html id="mloops" file="loops.js" code="" js="true" preview="false" %}

### Functions

Functions are one of the key features in computer science and are common to almost all programming languages. JavaScript uses function both the way we know them from languages such as C or Java, but also allows anonymous functions. 

{% include code.html id="mfunctions" file="functions.js" code="" js="true" preview="false" %}

None of the calls above cause runtime errors. If you call a function with too many parameters, JavaScript will simply ignore the extra ones. If you call a function with too few parameters, JavaScript gives the local parameters the special value undefined. 

Local variables in JavaScript use scope as you'd hope they would:

{% include code.html id="mfunction_scope" file="functionscope.js" code="" js="true" preview="false" %}

There is an alternative way of defining functions:
{% include code.html id="function_expression" file="function_expression.js" code="" js="true" preview="false" %}

Pay attention to what’s happening here: this is assigning a value to a variable, in the same way that x = "hi" assigns the string value "hi" to the variable x. But that value is a function! This is important. In JavaScript, **functions are values that can be stored in variables**. This is your first exposure to the idea that JavaScript is a “functional” language. In the same way that you can store function values in variables, you can pass them around as parameters, store them in arrays, object fields, and even use them as return values of other functions! This is a powerful idea that we will use a lot.

In particular, we will use a lot of anonymous functions, or "lambda abstractions" when working with D3. We've already used one example for sorting an array above. Here is another example: 

{% include code.html id="anonyfunction" file="anonfunction.js" code="" js="true" preview="false" %}


### Object Oriented JavaScript

If we create an object with slots that hold functions, this starts to look like methods from Java and Python. If we create a function that returns these objects, this starts to look like class contructors:

{% include code.html id="oojs" file="oojs.js" code="" js="true" preview="false" %}


#### Inheritance, without Classes

JavaScript does support a notion of inheritance, but it does it without any classes. This means that there’s no subclasses, so how does it work?

Instead of subclasses, JavaScript has the notion of a [prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain). Every JavaScript object has a special field which points to another object. Then, every time you tell JavaScript to access a field from an object, it tries to find the field. If the field exists, then the lookup is performed. If, however, the field doesn’t exist, then JavaScript checks for the presence of a special prototype field in the object. If that field is not null, then the JavaScript runtime performs a recursive access of the field in the prototype object. This is more obvious with an example. Make sure to run these in your JavaScript console:

{% include code.html id="inheritance" file="inheritance.js" code="" js="true" preview="false" %}

Note that ECMA Script 6 [adds syntax for classes](http://es6-features.org/#ClassDefinition), but this is only syntactic sugar, i.e., JavaScript remains a prototypical language.

### The special variable ``this``

JavaScript has a special variable that is available at every scope called ``this``. When a function is called with a notation that resembles methods in typical object-oriented languages, say ``obj.method()``, then ``this`` is bound to the object holding the method (in this case obj). this allows you to make changes to the local object:

{% include code.html id="mthis" file="this.js" code="" js="true" preview="false" %}

So far, so good: we’ve used ``this`` to change the value bound to the x field in the object. That’s pretty convenient.

However, the convenience comes with a caveat. The way JavaScript decides to associate ``this`` with a given object is simple to explain: it assumes the context of the calling object. 

Here’s what can go wrong:
{% include code.html id="thiswrong" file="thiswrong.js" code="" js="true" preview="false" %}

What happened in the example that goes wrong is that when `t()` is called, `this` is bound to the calling object, which is the global `window` object in the latter case. 


## What's new in ES6

### Arrow Functions

Arrow functions are always anonymous function ***expressions***. There is no arrow function ***declaration***. Examples include:

````
var f1 = () => 12;
var f2 = x => x * 2;
var f3 = (x,y) => {
var z = x * 2 + y;
y++;
x *= 3;
return (x + y + z) / 2;
};
````

### Block Scope

* Let vs var
	

* Closures and explicit blocks


* Const


### Default Values

```

function foo(x = 11, y = 31) {
	console.log( x + y );
}

foo(); // 42
foo( 5, 6 ); // 11
foo( 0, 42 ); // 42
foo( 5 ); // 36
foo( 5, undefined ); // 36 <-- `undefined` is missing
foo( 5, null ); // 5 <-- null coerces to `0`
foo( undefined, 6 ); // 17 <-- `undefined` is missing
foo( null, 6 ); // 6 <-- null coerces to `0`

```

### Lazy Expressions

```
function uniqueID(){
	//creates unique id
}

function foo(id=uniqueID()){}

```
uniqueID() is only called when foo() is called (without arguments), not before. 

### Gather and Spread Operators 

**Spread** 

```
foo( ...[1,2,3] );
```

When ... is used in front of an array (actually, any iterable), it acts to “spread” it out into its individual values.


**Gather** 

```
function foo(x, y, ...z) {
console.log( x, y, z );
}
```

The ...z in this snippet is saying: “gather the rest of the arguments (if any) into an array called z.”

### Destructuring

**Array Destructuring**

```
function foo(){
return [1,2,3];
}

var[a,b,c] = foo();

``` 

**Object Destructuring** 

```
function foo(){
	return {a:1,b:2,c:3};
}

var{
	a:a,
	b:b,
	c:c
} = foo();

```
### Template Strings

```
Pre-ES6

var name = "Kyle";
var greeting = "Hello " + name + "!";

```

```
ES6

var name = "Kyle";
var greeting = `Hello ${name}!`;

```

### Symbols, Iterators, and Generators

**Symbols**

Symbols are a new data type added in JavaScript, as of ES6. A symbol is  unique, globally unguessable value within the context of your program. 

**Iterators**

ES6 introduced an implicit standardized interface for iterators. Many of the built-in data structures in JavaScript will now expose an iterator implementing this standard. And you can also construct your own iterators adhering to the same standard, for maximal interoperability.

**Generators**

A generator function can pause itself in mid-execution, and can be resumed either right away or at a later time.

### A great place to test out the new ES6 features is at  [ES6Fiddle](http://www.es6fiddle.net) 

