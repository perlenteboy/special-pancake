// grab the things we need ----------
const pokemonContainer = document.querySelector(".pokemon-container");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input[type=text]");

console.log(inputEl);

// listen for user events -------------
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  pokemonContainer.innerHTML = "";
  getPokemon(inputEl.value);
});

// define our functions/actions ------------
async function getPokemon(name = "1") {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();
  console.log(pokemon.types)

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  pokemonEl.innerHTML = `
    <div class="info">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        pokemon.id
      }.png" width="200">
        <h2>${pokemon.name}</h2>
        <p>Pokemon Type: 
        ${pokemon.types
            .map((type) => {
              return `${type.type.name},`;
            })
            .join("")}
        </p>
    </div>
    <div class="stats">
      ${pokemon.stats
        .map((stat) => {
          return `<p>${stat.stat.name}: ${stat.base_stat}</p>`;
        })
        .join("")}
    </div>
    <div class="abilities">
    ${pokemon.abilities
      .map((ability) => {
        return `<p>${ability.ability.name}</p>`;
      })
      .join("")}
    <div>
    
  `;

  pokemonContainer.appendChild(pokemonEl);
}

// run things ----------------
getPokemon();
