// defining an object
obj = {
    key1: 3,
    key2: 4
};

// accessing an object either via the familiar . notation
console.log("Value of key1: " + obj.key1);
// or when referring to them as string
console.log("Value of key2: " + obj["key2"]);


// you can also define objects like this - which looks a lot like JSON!
otherObject = {
    "stringKey1": "3",
    "stringKey2": "4"
}
console.log("Value of stringKey1: " + otherObject.stringKey1);

// you can extend objects dynamically:
otherObject.newKey = "dynamicallyAdded";
console.log("Value of newKey: " + otherObject.newKey);