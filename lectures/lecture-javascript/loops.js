// for loops
let output = "";
for (let i = 0; i < 10; ++i) {
    output += i + ", ";
}
console.log("For loop: " + output);

// while loops;
let i = 3;
output = "";
while (i < 100) {
    output += i + ", ";
    i = i * 2;
}
console.log("While loop: " + output);

// Do-while loops:
i = 3;
output = "";
do {
    output += i + ", ";
    i = i * 2;
} while (i < 100);
console.log("Do while loop: " + output);

let years = [1954, 1949, 1981, 1982];
// Looping over an array with the built-in forEach function
console.log("Foreach function")
years.forEach(function (d) {
    console.log(d)
});

// Looping over an array with the new for of loop
console.log("For of loop (newish)");
for (let year of years) {
    console.log(year)
}

// Side-note: don't use for-in - it loops through object enumerables,
// also, order isn't guaranteed!
console.log("For in loop: not what you'd expect!");
for (let year in years) {
    // you probably thought that you'll just get the year here, right?
    console.log(year);
    // what you really get are the object keys
    console.log(years[year]);
}

// for-in for an object
let object1 = {a: 1, b: 2, c: 3};
for (let property in object1) {
    console.log(property, object1[property]);
}