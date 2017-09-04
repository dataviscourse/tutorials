// ES6 arrow function syntax
my_numbers = [1,2,3].map(n => n + 1);
console.log("Before Transpile: " + my_numbers);

// is interpreted and translated to this ES5 syntax:
my_numbers = [1,2,3].map(function(n) {
        return n + 1;
    });
console.log("After Transpile: " + my_numbers);