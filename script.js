"use strict";

const items = [
  { name: "Potion", type: "Healing", price: 10 },
  { name: "Scroll of Healing", type: "Healing", price: 7 },
  { name: "Elixir", type: "Healing", price: 25 },
  { name: "Bomb", type: "Damage", price: 15 },
  { name: "Arrow", type: "Damage", price: 5 },
];

const main = document.getElementById("main");

// forEach is an array method

// forEach will set up a forLoop and loop through the entire array and each item with keys

// map can do more
const elements = items.map((item) => {
  const p = document.createElement("p");
  p.textContent = item.name;
  return p;
});

// console.log(elements)
// main.append(...elements)no n

const withTax = items.map((item) => {
  return {
    name: item.name,
    type: item.type,
    price: (item.price * 1.1).toFixed(2),
  };
});

// console.log(withTax);

// Filter

const healingItems = items.filter((item) => {
  return item.type === "Healing";
});

// console.log(healingItems)

const expensive = items.filter((item) => {
  return item.price >= 15;
});

// console.log(expensive)

function render(myItems, heading) {
    const h2 = document.createElement("h2")
    h2.textContent = heading;
    main.appendChild(h2);
    // because its an array, use forEach function
    myItems.forEach((item) => {
        const name = document.createElement("p");
        name.textContent = item.name;
        const typeOfItem = document.createElement("p");
        typeOfItem.textContent = item.type;
        const price = document.createElement("p");
        price.textContent = item.price;
        const hr = document.createElement("hr");
        if (!item.name) {
            main.appendChild(hr);
            return
        }
        main.appendChild(name);
        main.appendChild(typeOfItem);
        main.appendChild(price);
        main.appendChild(hr);
});
}


render(expensive, "Expensive Items");
render([{}])
render(healingItems, "Healing Items");
render([{}]);
render(withTax, "Items with Taxes");



let sum = 0; 

for (let i = 0 ; i < items.length; i++){
    const item = withTax[i];

    sum += Number(item.price)


}

console.log(sum)

// Reduce method

const total = items.reduce((sum, item) => {
    return sum + item.price
}, 0)

console.log(total)



const counts = items.reduce((result, item) => {
    if (result[item.type] === undefined) {
        // if you haven't seen this yet, assign it to 1
        result[item.type] = 1
    } else {
        // if we have seen it already, increase the value by 1
        result[item.type] = result[item.type] +1
    }
    return result
}, {})

async function getData(url) {
    try {
        const res = await fetch(url)
        if (!res.ok) {
            throw new Error ("No fetchy")
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
        
    }
}

function renderPokemon({ results }) {
    results.forEach(pokemon => {
        const p = document.createElement("p")

        const firstLetter = pokemon.name.charAt(0).toUpperCase()
        const remaining = pokemon.name.slice(1)
        const fullname = firstLetter + remaining
        
        p.textContent = fullname;
        main.appendChild(p)
    })
}

async function run() {
    try {
        const pokemon = await getData("https://pokeapi.co/api/v2/pokemon/");
        renderPokemon(pokemon)
                
    } catch (error) {
        console.log(error)
    }
}

run()