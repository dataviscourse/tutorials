function yetAnotherObject() {
    return {
        x: 3,
        get: function () {
            console.log("This:")
            console.log(this)
            return this.x
        }
    };
}

obj = yetAnotherObject()
console.log("As expected: " + obj.get()); // fine
let t = obj.get;
console.log("Problem: " + t()); // *NOT* fine, this is bound to the context of the calling object, which is the global "this" Window