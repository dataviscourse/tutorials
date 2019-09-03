//ES6
function foo() {
    return {a: 1, b: 2, c: 3};
}

let {a, b, c} = foo();
//Which is the shorthand version of 
//let {a:a,b:b,c:c} = foo();

console.log(a, b, c); // 1 2 3


// This is very useful for destructing objects
const person = {
     name: "John Doe",
     address: "SLC"
};

const {name, address} = person;
console.log(name, address);