// defining an object
let obj = {
    key1: 3,
    key2: 4
};

// accessing an object either via the familiar . notation
console.log("Value of key1:", obj.key1);
// accessing an object with a string key. This is often not a good idea
// because you are not using an explicit reference, which makes refactoring
// more difficult
console.log("Value of key2:", obj["key2"]);

// you can also define objects like this - which looks a lot like JSON!
let otherObject = {
    "key3": 3,
    "key4": 4
};


// you can extend objects dynamically:
otherObject.newKey = "dynamicallyAdded";
console.log("Value of newKey:", otherObject.newKey);

// note that, unlike for arrays, objects containing mixed data types are perfectly good coding style!
// in fact, that's what objects are designed for
let person = {
    name: "Alex",
    birthYear: 1981,
    nationality: "Austria",
    countries: ["Austria", "Canada", "USA", "France"]
};