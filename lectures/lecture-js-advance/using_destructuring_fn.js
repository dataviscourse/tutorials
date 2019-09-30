// You can also use this syntax if a function returns multiple values as a list or object!
function returnMultipleAsList() {
  return ["A", "B", "C"];
}

const [A, B, C] = returnMultipleAsList();
console.log(A, B, C);

function returnMultipleAsObject() {
  return {
    first: "X",
    second: "Y",
    third: "Z"
  };
}

const { first, second, third } = returnMultipleAsObject();
console.log(first, second, third);
