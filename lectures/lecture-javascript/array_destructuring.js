function foo() {
	return [1,2,3];
}

//ES5
var tmp = foo(),
a = tmp[0], b = tmp[1], c = tmp[2];
console.log( a, b, c ); // 1 2 3

//ES6
let [x,y,z] = foo();
console.log( x, y, z ); // 1 2 3