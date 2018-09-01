// for loops
let output = "";
for (let i = 0; i < 10; ++i) {
    output += i + ", ";
}
console.log("For loop: " + output);

// while loops;
i = 3;
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
years.forEach(function(d){
    console.log(d)
});

// Looping over an array with the new (ECMA Script 6) - this might not work in your browser yet!
console.log("For of loop is new");
for (year of years){
    console.log(year)
}

// Side-note: don't use for-in - it loops through object enumreables,
// not through array indices
// also, order isn't guaranteed!
console.log("For in loop: not what you'd expect!");
for (let year in years){
    console.log(year);
    console.log(years[year]);
}