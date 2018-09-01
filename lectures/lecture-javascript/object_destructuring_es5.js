//ES5
function foo() {
    return {a: 1, b: 2, c: 3};
}

let tmp = foo(),
    a = tmp.a, b = tmp.b, c = tmp.c;

console.log(a, b, c); // 1 2 3