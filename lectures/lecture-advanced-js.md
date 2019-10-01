---
layout: code-lecture
title: "Advanced JavaScript"
permalink: /lectures/lecture-advanced-js/
nomenu: true
---

## Destructuring

### List

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.

Destructuring assignment allows you to assign the properties of an array or object to variables using syntax that looks similar to array or object literals. This syntax can be extremely terse, while still exhibiting more clarity than the traditional property access.

Without destructuring assignment, you might access the first three items in an array like this:

{% include code.html id="without_destructuring_lists" file="without_destructuring_lists.js" code="" js="true" preview="false" %}

Using the destructuring assignment, the code becomes:
{% include code.html id="destructuring_lists" file="destructuring_lists.js" code="" js="true" preview="false" %}

Destructuring assignment supports nesting and use of spread operators. Here we see examples of some different ways to destructure lists:

{% include code.html id="advanced_destructuring" file="advanced_destructuring.js" code="" js="true" preview="false" %}

### Objects

Destructuring on objects lets you bind variables to different properties of an object. You specify the property being bound, followed by the variable you are binding its value to.

{% include code.html id="destructuring_objects" file="destructuring_objects.js" code="" js="true" preview="false" %}
{% include code.html id="destructuring_objects2" file="destructuring_objects2.js" code="" js="true" preview="false" %}

You can also use this for return values of a function:

{% include code.html id="using_destructuring_fn" file="using_destructuring_fn.js" code="" js="true" preview="false" %}

## Promises

### A Quick Introduction to Promises

Promises are a construct for designed for asynchronous functions that returns a single result asynchronously, which provides a better way of working with callbacks. A given asynchronous function returns a Promise object, which serves as a placeholder and container for the final result. Callback functions, which are registered via the Promise methods `then()` and `catch()`, are called when result returns depending on the state (fulfilled or rejected) of the Promise object.

A promise can be:

- fulfilled - The action relating to the promise succeeded
- rejected - The action relating to the promise failed
- pending - Hasn't fulfilled or rejected yet
- settled - Has fulfilled or rejected

```javascript
asyncWithPromise() // Returns a promise object
    .then(function(){ // if object's state is fulfilled, go here
        ...
    })
    .catch(function(){ // if object's state is rejected, go here
        ...
    })
```

Note that `promise.then()` takes two arguments, a callback for a success case, and another for the failure case. Both are optional, so you can add a callback for the success or failure case only.

```javascript
promise.then(
  function(result) {
    console.log(result); // "Stuff worked!"
  },
  function(err) {
    console.log(err); // Error: "It broke"
  }
);
```

So what's the difference? Essentially, `promise.then(f1).catch(f2)` reduces to `promise.then(f1, null).then(null, f2)`. This means that if the success callback function `f1` throws an error, it is caught and handled by function `f2`. In the case of `promise.then(f1, f2)`, function `f2` only handles the failure case for the original promise and ignoring any errors thrown by the `f1` callback. Both have potential [advantages/disadvantages](https://stackoverflow.com/questions/24662289/when-is-thensuccess-fail-considered-an-antipattern-for-promises), depending on how you're chaining together asynchronous calls. This ability to chain asynchronous calls is one of the major advantages of promises.

Where javascript's old asynchronous callback syntax necessitated a design pattern of nested callbacks, affectionately known as “callback hell”, promises allow us to easily chain asynchronous calls based on their respective successes and failures.

```javascript
// Callback Hell
async1(function(){
    async2(function(){
        async3(function(){
            ....
        });
    });
});

// Promise approach
var task1 = async1();
var task2 = task1.then(async2);
var task3 = task2.then(async3);

task3.catch(function(){
    // Solve your thrown errors from task1, task2, task3 here
})

// Promise approach with chaining
async1(function(){..})
    .then(async2)
    .then(async3)
    .catch(function(){
        // Solve your thrown errors here
    })
```

### Async/await

As our original example illustrated, ES6 introduces an even easier way of handling promises: `await`. The `await`operator will simply pause the execution of an asynchronous function until the value from the promise is available.

```javascript
async function getFirstUser() {
  let users = await getUsers();
  return users[0].name;
}
```

This means that we can revert to the try/catch functionality to catch errors:

```javascript
async function getFirstUser() {
  try {
    let users = await getUsers();
    return users[0].name;
  } catch (err) {
    return {
      name: "default user"
    };
  }
}
```

So what happens if we type this?:

```javascript
let user = getFirstUser();
```

Because we didn't use the await syntax, `user` will refer to a promise object (rather than the resolved value).

It’s important to remember: async functions don’t magically wait for themselves. You must await, or you’ll get a promise instead of the value you expect.

And most importantly, remember that async/await and promises are the same thing under the hood!

## Asynchronous Data Loading

Let's quickly cover an important aspect related to data loading. The code snippet below loads in a file called myData.json, and when all the plotting is finished, prints ”Done Plotting“ to the console.

```javascript
console.log("Hello"); // Prints Hello

// Creates an async request for a resource from the server using d3.json
async function loadData() {
  try {
    let data = await d3.json("myData.json");
    // This is where you insert d3 code to process and plot the data
    console.log("Data Loaded!"); // Prints when the request finishes
  } catch (error) {
    console.error(error); // Logs error if encountered
  }
}
loadData();

console.log("World"); // Prints World
```

The question is: What is the order in which the three statements above will print to the console? “Hello, World, Done Plotting” or “Hello, Done Plotting, World”?

If you answered “Hello, World, Done Plotting”, you are correct. The reason for this is because the call to `d3.json` is asynchronous. An _asynchronous_ call is defined as one in which the script is not blocked while waiting for the called code to finish. This means that the asynchronous call is not instantaneous, and javascript does not wait for it to return before continuing to run the rest of the script. Asynchronous functions are often related to doing I/O, e.g. downloading things, reading files, talking to databases, etc.

In practice, this means that you will not have guaranteed access to the data inside `MyData.json` outside of the asynchronous function. So if you have something like this:

```javascript
// Creates an async request for a resource from the server using d3.json
async function loadData() {
  try {
    let data = await d3.json("myData.json");
    //Data wrangling and cleanup.
    console.log("Done Cleaning!"); // Prints when the request finishes
  } catch (error) {
    console.error(error); // Logs error if encountered
  }
}
loadData();

//d3 functions that will process and plot your data
```

Your d3 functions will be called, before `d3.json` has returned with the data inside `myData.json` and you will either get an error or no visualization at all. In the above example, this conclusion is consistent with the fact that javascript variables are function scoped. We shouldn't expect to be able to access the `data` variable outside of `loadData()`. The `async`/`await` syntax shown in this example, however, is part of javascript ES6 and only available in d3 as of version 5. This is because, under the hood, d3 v5 uses _Promises_ to handle asynchronous callbacks.

#### Reading data without any `async` construct

{% include code.html id="basic_async" file="basic_async.html" code="" js="false" preview="true" %}

#### Reading data using `await`

{% include code.html id="async_await" file="async_await.html" code="" js="false" preview="true" %}

#### Passing callbacks to async functions

{% include code.html id="async_with_callback" file="async_with_callback.html" code="" js="false" preview="true" %}

#### Handling async functions using `then`

{% include code.html id="async_then" file="async_then.html" code="" js="false" preview="true" %}

#### Handling error in async functions

{% include code.html id="async_then_catch" file="async_then_catch.html" code="" js="false" preview="true" %}

## Debugging

### IDE

You can use IDE to debug your JavaScript files. Some recommended IDE's are:

- [Visual Studio Code](https://code.visualstudio.com/) – Free, open source version available.
- [Webstorm](https://www.jetbrains.com/webstorm/) or it's big brother PyCharm – Not free, but education/community version available with student email.
- [Atom](https://atom.io/) – Free, maintained by github! Tends to be slow for larger projects.

There are others you can use like `Netbeans`, `VIM`, etc. Debugging with IDEs is specific to which one you use and you should refer to its documentation for details. Here's example of how `VS Code` debugging looks like:

<div text-align="center">
    <img src="./images/vs_code_debug.gif" width="800px" style="padding-bottom: 21px"/>
</div>

### Console

Debugging using an IDE is very powerful and speeds up the process of hunting for bugs, but it might not always be possible (e.g if you working over a remote SSH connection). The simplest way to debug almost any programming language is printing to console. In our technical lectures we use `console.log()` frequently to quickly view the results of our operations.

JavaScript console is implemented fully by almost all modern web browsers. Below are examples of different `console` functions to debug JavaScript code.

- `console.log`
  The simplest way to debug code is to print something to the console using `log` function. There are variants of the functions like `info`, `warn` and `error`. These functions tag the output of `log` with a type denoting type of message. These types can be used to filter the output of console. Let us see some examples.
  {% include code.html id="console_log" file="console_log.js" code="" js="true" preview="false" %}
- `console.trace`
  If you look at output of `error` from above example, it adds a trace of function calls which lead to the error. We don't have to rely on `error` to do this. We can also use a `console.trace` to do similar things without tagging something as a error.
  {% include code.html id="console_trace" file="console_trace.js" code="" js="true" preview="false" %}
- `console.time` and `console.timeEnd`
  You can log time using a pair of `time` and `timeEnd` to debug some performance issue of timing dependent bug.
  {% include code.html id="console_time" file="console_time.js" code="" js="true" preview="false" %}
- `console.memory`
  You can use `memory` object to see the current heap size and memory usage of your application. Just go to the console and type `console.memory` to see details like `heapLimit`, `totalHeapSize` and `usedHeapSize`. _As of now it only works in Google Chrome. Firefox does not have support for this._
- `console.profile`
  You can use `console.profile` and `console.profileEnd` to trigger recording of performance and memory profile of browser actions. This can be analyzed in browser's profile/performance tabs.
- `console.count`
  In a case of recurring function or code, you can use `console.count()` to keep count of how many times your code is read.
  {% include code.html id="console_count" file="console_count.js" code="" js="true" preview="false" %}
- `console.assert`
  You can use `console.assert(condition, msg)` to log something when the condition is falsey. This is useful to do conditional logging without using `if-else` blocks in your code
  {% include code.html id="console_assert" file="console_assert.js" code="" js="true" preview="false" %}
- `console.group`
  After writing so many logs, you might want to organize them. A small and useful tool for that is the console.group() & console.groupEnd(). Using console group, your console logs are grouped together, while each grouping creates another level in the hierarchy. Calling groupEnd reduces one. You can also label these groups.
  {% include code.html id="console_group" file="console_group.js" code="" js="true" preview="false" %}
- `console.table`
  The best feature of console when you want to log a list of objects and go through them without individually opening each one to look at the values is `console.table`! It's also used in an example above.
  {% include code.html id="console_table" file="console_table.html" code="" js="false" preview="true" %}
