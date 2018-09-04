class Base {
    // the constructor
    constructor(first, second) {
        // this is how you assign member variables
        this.first = first;
        this.second = second;
    }

    // a method
    multiply() {
        return this.first * this.second
    }
}

let baseInstance = new Base(2, 4);
console.log("Base multiply: " + baseInstance.multiply());

// how to extend a class
class Derived extends Base {
    constructor(first, second, third) {
        super(first, second);
        this.third = third;
    }

    multiply() {
        return this.first * this.second * this.third;
    }
}

let derivedInstance = new Derived(2, 4, 6);
console.log("Derived multiply: " + derivedInstance.multiply());