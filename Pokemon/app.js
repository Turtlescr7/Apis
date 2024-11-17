async function getAllPokemon() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=100000"
  );
  const data = await response.json();
  return data.results; // Returns an array of { name, url }
}

async function fetchRandomPokemon() {
  const container = document.getElementById("pokemonContainer");
  container.innerHTML = "Loading...";

  // Fetch all Pokémon
  const allPokemon = await getAllPokemon();

  // Get three random Pokémon
  const randomPokemon = Array.from(
    { length: 3 },
    () => allPokemon[Math.floor(Math.random() * allPokemon.length)]
  );

  // Fetch data for the three Pokémon
  const pokemonInfo = await Promise.all(
    randomPokemon.map(async (pokemon) => {
      const pokemonData = await fetch(pokemon.url).then((res) => res.json());
      const speciesData = await fetch(pokemonData.species.url).then((res) =>
        res.json()
      );

      // Get the description in English
      const flavorText = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      return {
        name: pokemon.name,
        image: pokemonData.sprites.front_default,
        description: flavorText
          ? flavorText.flavor_text.replace(/\n|\f/g, " ")
          : "No description available.",
      };
    })
  );

  // Update the UI
  container.innerHTML = "";
  pokemonInfo.forEach((pokemon) => {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p>${pokemon.description}</p>
        `;
    container.appendChild(div);
  });
}

// Add event listener to the button
document
  .getElementById("fetchButton")
  .addEventListener("click", fetchRandomPokemon);
