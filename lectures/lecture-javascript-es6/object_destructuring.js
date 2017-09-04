function foo() {
	return {a:1,b:2,c:3};
}

//ES5

var tmp = foo(),
a = tmp.a, b = tmp.b, c = tmp.c;

console.log( a, b, c ); // 1 2 3

//ES6

let {a:a,b:b,c:c} = foo();

console.log( a, b, c ); // 1 2 3
