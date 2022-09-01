// -- "local", function-scoped variables --
// var is discouraged because of the uncommon scope
var name = "Alex";

// New in ES6
// -- "local", block-scoped variables --
let age = 36;

// New in ES6
// -- constants -- but note, complex data types remain mutable
const NATIONALITY = "Austrian";

// Throws a type error
// NATIONALITY = "USA";

// Careful! Complex data types are still mutable
const TEST = [2, 3, 4];
console.log("Original Array:", TEST);
TEST[2] = 9;
console.log("Modified Array:", TEST);