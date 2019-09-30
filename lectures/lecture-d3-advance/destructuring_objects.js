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

// Let us add some info about their albums to make the object slightly complicated.
const lz_album = {
  name: "Led Zepelin (Album)",
  release: 1969,
  length: {
    min: 44,
    sec: 56
  }
};

const presence = {
  name: "Presence",
  release: 1976,
  length: {
    min: 44,
    sec: 19
  }
};

lz["albums"] = [lz_album, presence];
console.log(lz);

// Let us now destructure out name of the band, name of a album, it's release year and length in one liner!
// Remember we have the same key `name` in both the band object as well as album object.
const {
  name: bandName,
  albums: [
    {
      name: lz_album_name,
      release: lz_release,
      length: { min: lz_min, sec: lz_sec }
    },
    {
      name: pr_album_name,
      release: pr_release,
      length: { min: pr_min, sec: pr_sec }
    }
  ]
} = lz;

console.log(
  `${bandName} released ${lz_album_name} in ${lz_release} and it's ${lz_min} minutes and ${lz_sec} seconds`
);
console.log(
  `${bandName} released ${pr_album_name} in ${pr_release} and it's ${pr_min} minutes and ${pr_sec} seconds`
);

// You can have default values for variables declared during destructuring
let { reunionDates = "NA" } = lz;
console.log("Reunion Info: ", reunionDates);

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
