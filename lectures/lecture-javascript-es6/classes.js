class Base{
    constructor(first, second)
    {
        this.first = first;
        this.second = second;
    }

    multiply()
    {
        return this.first * this.second
    }
}

// how to extend a class
class Derived extends Base {
    constructor(first, second, third)
    {
        super(first, second);
        this.third = third;
    }

    multiply()
    {
        return this.first * this.second * this.third;
    }
}

let baseInstance = new Base(2, 4);
console.log("Base multiply: " + baseInstance.multiply());

let derivedInstance = new Derived(2, 4, 6);
console.log("Derived multiply: " + derivedInstance.multiply());