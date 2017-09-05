// Inheritance, with no classes
let base = {
    v1: 1,
    v2: 2
};

let derived = {
    v1: 5,
    v3: 3,
    v4: 4
};

console.log("Base v1: " + base.v1);
console.log("Derived v1: " + derived.v1);
console.log("Derived v2: " + derived.v2);

// this calls sets the prototype of derived to be the base
Object.setPrototypeOf(derived, base);
console.log("Derived v1: " + derived.v1 + " accessing the overridden v1 in derived");
console.log("Derived v2: " + derived.v2 + " accessing the base v2");

// Instead of using setPrototypeOf, use Object.create()
// the first parameter of the object is the prototype
let emptyObject = Object.create(null); // this is just the same as {}
let baseObject = Object.create(emptyObject);
let derivedObject = Object.create(baseObject); // etc.