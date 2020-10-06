const mySum = (...numbers) =>
{
    let s = 0;
    for (let num of numbers)
    {
        s += num;
    }
    return s;
}

console.log(mySum(1,2,3));
console.log(mySum(1,2,5,3,4,7,4,2,5,7,2));