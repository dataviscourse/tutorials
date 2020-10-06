let originalArray = [1,2,3];
let copy1 = originalArray;
let copy2 = [...originalArray];

originalArray[1] = 'cat';

console.log(originalArray);
console.log(copy1);
console.log(copy2);