const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr);

// We can destructure only first few variable of the array and
// separate the rest out in a different array.
const [var1, var2, var3, ...remainingVars] = arr;
console.log(var1, var2, var3, remainingVars);

// We can skip over some values if we want to.
const [, , , ...shorter_list] = arr;
console.log(shorter_list);

// The nesting pattern can be as deep as we want it
const [a, [b, c], [[d, e, f], [g, h]]] = [1, [2, 3], [[4, 5, 6], [7, 8]]];
console.log(a, b, c, d, e, f, g, h);

// Another fun use is to swap values
let [x, y] = [23, 32];
console.log("x is ", x);
console.log("y is ", y);

[x, y] = [y, x];
console.log("x is now", x);
console.log("y is now", y);