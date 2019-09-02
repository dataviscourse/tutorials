let numArray = [15, 12, 21, 4];
let empty = []; // empty array declaration
console.log(numArray[0]);
// you can but should not use arrays of different type
let multiTypeArray = [0, "This", "is", true, "unfortunately"];
console.log(multiTypeArray[1]);
console.log(multiTypeArray[3]);

// you can access the length of the array using the length attribute
let myLength = multiTypeArray.length;
console.log("Length: " + myLength);

// you can nest arrays
let nested = [[1, 2], [3, 4], [5, 6]];
console.log("First element of second array: " + nested[1][0]);

// extend arrays
numArray.push(3);
// push returns the new length
let newLength = numArray.push(4);

// remove last element from array and return it
let lastElement = numArray.pop();

// find index of entry:
let pos = numArray.indexOf(21);
console.log("Index: ", pos);

// sort an array
numArray.sort();
// [12, 15, 21, 3, 4]
console.log("Sorted as strings: ", numArray);

// sorting is based on string values by default.
// We need to supply a compare function if we want to sort numerically.
function compareNumbers(a, b) {
    return a - b;
}

numArray.sort(compareNumbers);
console.log("Sorted as numbers: ", numArray);

// here is a shorthand version of this

numArray.sort((a, b) => b-a);
console.log("Reverse sorted:", numArray); 