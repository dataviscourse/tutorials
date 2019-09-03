// The familiar if
if (1 === parseInt("1")) {
    console.log("First if");
    // note that you can use parseInt or the
    // unary + operator, the latter is usually better
} else if (2 === +"3") {
    console.log("Else if");
} else {
    console.log("else");
}

// notice the type coercion that happens with just regular == signs
if (1 == "1") {
    console.log("We'll just parse that for you, OK?");
}

// use === to not do that implicitly
if (1 === "1") {
    // not reaching this
} else {
    console.log("String and Int are not the same! This is safer!");
}

// The ternary if operator
// CONDITION ? WHAT_HAPPENS_IF_CONDITION_TRUE : WHAT_HAPPENS_IF_CONDITION_FALSE
true === true ? console.log(true) : console.log(false);

// Switch statements
let i = "some case";
switch (i) {
    case "string literals ok":
        console.log("Yes");
        break;
    case "some case":
        console.log("switch matches!");
        break;
    default:
        console.log("Default");
}