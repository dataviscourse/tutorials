// adding, substracting,  multiplying, dividing
let sum = 1 + 3;
sum += 1;
sum++;
sum--;
let division = sum/13;

// modulo
let mod = division % 2;

// typeof operator
typeof(division); // returns string "number"
let type = typeof division; // assigns string number to letiable type
console.log(type);

// String concatenation
let compoundString = "two " + "words";

// Parsing/Casting - This is important when you read data from csv files
let myNumber = parseInt("13");
console.log("Int:", myNumber);

myNumber = parseFloat("17.5");
console.log("Float:", myNumber);

myNumber = parseInt("17.5");
console.log("Float to Int:", myNumber);

myNumber = +"33.5";
console.log("Shorthand parse:", myNumber);