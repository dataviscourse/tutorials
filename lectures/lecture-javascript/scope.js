function demoFunctionScope() {
    var varA = 2;
    if (true) {
        var varB = 3;
    }
    console.log("In Function Scope:", varA + varB);
}
demoFunctionScope();

function demoBlockScope() {
    let letA = 2;
    if (true) {
        let letB = 3;
    }
    // undefined!
    // console.log("In Block Scope:", letA + letB);
}
demoBlockScope();

function demoGlobalScope(){
    // DON'T EVER DO THIS!!!!
    globalA = 3;
}
demoGlobalScope();
console.log("Here I can access a variable defined inside a function: ", globalA);