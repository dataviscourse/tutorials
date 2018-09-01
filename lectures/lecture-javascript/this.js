function otherObject(value) {
    return {
        x: value,
        get: function () {
            return this.x;
        },
        set: function (newValue) {
            this.x = newValue;
        }
    };
}

let other = otherObject(3);
console.log("X: " + other.x);
console.log("Getter: " + other.get());
other.set(5);
console.log("Getter after set: " + other.get());
console.log("X: " + other.x);