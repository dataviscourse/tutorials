// adding, substracting,  multiplying, dividing
let sum = 1 + 3;
sum += 1;
sum++;
sum--;
let divResult = sum / 13;

// modulo
let mod = divResult % 2;

// typeof operator
typeof (divResult); // returns string "number"
let typeResult = typeof (divResult); // assigns string "number" to letiable type
console.log("typeResult:", typeResult); 

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