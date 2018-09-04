function yetAnotherObject() {
    let that = this;
    return {
        x: 3,
        get: function () {
            console.log("That:");
            console.log(that);
            return that.x
        }
    };
}

let obj = yetAnotherObject();
console.log("As expected: " + obj.get()); // fine
// re-assigning the getter only to another object
let t = obj.get;
console.log("Problem: " + t()); // *NOT* fine, this is bound to the context of the calling object, which is the global "this" Window