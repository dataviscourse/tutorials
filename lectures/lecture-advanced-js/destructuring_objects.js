// Lets define a JS object representing the band Led Zepellin
const lz = {
  name: "Led Zeppelin",
  active: "1968 - 1980",
  members: ["Robert Plant", "Jimmy Page", "John Paul", "John Bonham"]
};
console.log(lz);

// We destructure out the name of the band and the years they were active
let { name, active, members } = lz;
console.log("Name:", name);
console.log("Years Active:", active);
console.log("Members:", members);
// console.log("Members:", ...members);
