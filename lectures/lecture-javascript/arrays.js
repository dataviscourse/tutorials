var numArray = [15, 12, 21, 4];
var empty = []; // empty array declaration
console.log(numArray[0]);
// you can but should not use arrays of different type
var multiTypeArray = [0, "This", "is", true, "unfortunately"];
console.log(multiTypeArray[1]);
console.log(multiTypeArray[3]);

// you can access the length of the array using the length attribute
var myLength = multiTypeArray.length;
console.log("Length: " + myLength);

// you can nest arrays
var nested = [[1, 2], [3, 4], [5, 6]];
console.log("First element of second array: " + nested[1][0]);

// extend arrays
numArray.push(3);
var newLength = numArray.push(4);

// remove last element from array
var lastElement = numArray.pop();

// find index of entry:
var pos = numArray.indexOf(2);

// sort an array
numArray = numArray.sort()
// [12, 15, 21, 3, 4]
console.log(numArray)

// sorting is based on string values. we need to supply a compare function
function compareNumbers(a, b) {
    return a - b;
}

numArray.sort(compareNumbers)
console.log(numArray)