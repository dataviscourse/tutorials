function someFunction(v) {
    if (v < 10) {
        return v;
    } else {
        return v*v;
    }
}

// this is how you should use this function
console.log("Function for 30: " + someFunction(30));
console.log("Function for -5: " + someFunction(-5));

// But, as usual, JavaScript lets you do strange things that are convenient sometimes, and confusing at other times:
console.log("Function for string that can be converted to a number (50): " + someFunction("50"));
console.log("Function for string that cannot be converted to a number (JavaScript still tries!): " + someFunction("what?"));
console.log("Function with more parameters (we'll just ignore them, right?): " + someFunction(30, "huh?"));
console.log("Function with no parameters (oh, you meant undefined!): " + someFunction());