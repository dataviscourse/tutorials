//ES5
function foo() {
    return {a: 1, b: 2, c: 3};
}

let tmp = foo();
let a = tmp.a;
let b = tmp.b;
let c = tmp.c;

console.log(a, b, c); // 1 2 3