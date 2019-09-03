function numberFunction(myNumber) {
    if (myNumber < 10) {
        return myNumber;
    } else {
        return myNumber * myNumber;
    }
}

// this is how you should use this function
console.log("Function for 30: " + numberFunction(30));
console.log("Function for -5: " + numberFunction(-5));

// But, as usual, JavaScript lets you do strange things that are convenient sometimes, and confusing at other times:
console.log("Function for string that can be converted to a number (50):", numberFunction("50"));

console.log("Function for string that cannot be converted to a number (JavaScript still tries!):", numberFunction("what?"));

console.log("Function with more parameters (we'll just ignore the extra ones, right?):", numberFunction(30, "huh?"));

console.log("Function with no parameters (oh, you meant undefined!)", numberFunction());