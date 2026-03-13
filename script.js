"use strict";

const baseURL = "https://swapi.dev/api/species";
const mainEl = document.getElementById("mainEl");

const swSpecies = [
  { name: "Human", classification: "mammal", lifespan: 120 },
  { name: "Wookie", classification: "mammal", lifespan: 400 },
  { name: "Hutt", classification: "gastropod", lifespan: 1000 },
  { name: "Yoda's species", classification: "mammal", lifespan: 900},
  { name: "Ewok", classification: "mammal", lifespan: 120},
  { name: "Test Species", classification: "mammal", lifespan: 58},
];

// *map function to return a new array of each object with the lifespans halved*

const halfLifespans = swSpecies.map((object) => {
  return {
    name: object.name,
    classification: object.classification,
    lifespan: object.lifespan * 0.5,
  };
});

render2(halfLifespans, "Map function used to half all lifespans:");

// *filter function to filter out only mammals*

const mammalsOnly = swSpecies.filter((item) => {
  return item.classification === "mammal";
});

render2(mammalsOnly, "Filter function used to filter for only mammals (normal lifespans):");


// *reduce function to get average lifespan of only mammals*

// basic function to find the average of an array of just numbers, console reads 2.5
function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
    
}
console.log(average([1,2,3,4]))


// finding an average from values found in an array of objects, WITHOUT REDUCE

let lifespanSum = 0;
let itemsFound = 0;

const len = swSpecies.length // get length of array, or how many objects in the array

let eachObject = null;

for (let i = 0; i < len; i++) {//forLoop
    eachObject = swSpecies[i]; // loops through array swSpecies
    //for each object in the array
        lifespanSum = eachObject.lifespan + lifespanSum; 
        itemsFound = itemsFound + 1;
    
}

const avgLifespan1 = lifespanSum / itemsFound;
console.log(avgLifespan1)

render3(avgLifespan1,"hi")


// * code related to pulling from API after this *
// generic fetch function
async function getData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Something went wrong with fetching the data.");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// generic render function to render data in a paragraph at "mainEl" element, looping through each object and pulling the value for the key "name" and adding it to a list
// it also capitalizes and adds the first letter and removes the uncapitalized letter, replacing it

function render({ results }, heading) {
  // heading of section
  const h2 = document.createElement("h2");
  h2.textContent = heading;
  mainEl.appendChild(h2);

  // forEach to render each value from each object with key "name"

  results.forEach((data) => {
    const p = document.createElement("p");

    p.textContent = data.name;
    mainEl.appendChild(p);
  });
}

// generic render function for non-API array data, used for data with lifespans in this code

function render2(object, heading) {
  // heading of section
  const h2 = document.createElement("h2");
  h2.textContent = heading;
  mainEl.appendChild(h2);

  // forEach to render each value from each object with keys "name", "classification", and "lifespan"

  object.forEach((item) => {
    const name = document.createElement("p");
    name.textContent = "Name: " + item.name;
    mainEl.appendChild(name);
    const classification = document.createElement("p");
    classification.textContent = "Classification: " + item.classification;
    mainEl.appendChild(classification);

    const lifespanOutput = document.createElement("p");
    lifespanOutput.textContent = "Lifespan: " + item.lifespan;
    mainEl.appendChild(lifespanOutput);

    //   insert a hr line after each object output and if it is an empty array, do it as well and end function
    const hr = document.createElement("hr");
    if (!object.name) {
      mainEl.appendChild(hr);
      return;
    }
  });
}

function render3(thing, heading) {
  // heading of section
    const h2 = document.createElement("h2");
    h2.textContent = heading;
    mainEl.appendChild(h2);
    const p = document.createElement("p")
    p.textContent=thing
    //   insert a hr line after each object output and if it is an empty array, do it as well and end function
    const hr = document.createElement("hr");
    mainEl.appendChild(hr);
}

// main function used to pull data from SWAPI and render "results" in a list, the render function identifies which key from results to render

async function main() {
  try {
    const swdata = await getData(baseURL);
    console.log(swdata.results);
    render(swdata, "Star Wars species pulled from SWAPI:");
  } catch (error) {
    console.log(error);
  }
}

main();
