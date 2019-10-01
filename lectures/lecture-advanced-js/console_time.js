console.log("Timer started");
console.time();
for (let i = 0; i <= 2000000; ++i) {}
console.timeEnd();

console.time("For loop timer");
for (let i = 0; i <= 2000000; ++i) {}
console.timeEnd("For loop timer");