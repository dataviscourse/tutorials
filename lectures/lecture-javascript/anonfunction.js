let myNumbers = [13, 16, 19, 22];

// map executes a function to every element of an array and returns a new array
myNumbers = myNumbers.map(function(d){
    return d * 2;
});

console.log(myNumbers);