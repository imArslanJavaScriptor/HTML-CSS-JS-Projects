const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const pokemonCard = document.getElementById("pokemonCard");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonTypes = document.getElementById("pokemonTypes");
const errorMessage = document.getElementById("errorMessage");

// Fetch Pokémon data from PokeAPI
async function fetchPokemon(query) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`
    );
    if (!response.ok) throw new Error("Pokemon not found");
    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    showError(error.message);
  }
}

// Display Pokémon details in the card
function displayPokemon(pokemon) {
  errorMessage.classList.add("hidden");
  pokemonCard.classList.remove("hidden");

  pokemonImage.src = pokemon.sprites.front_default || "";
  pokemonName.textContent = capitalizeFirstLetter(pokemon.name);
  pokemonId.textContent = pokemon.id;
  pokemonTypes.textContent = pokemon.types
    .map((type) => type.type.name)
    .join(", ");
}

// Show error message
function showError(message) {
  pokemonCard.classList.add("hidden");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Handle search button click
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchPokemon(query);
  } else {
    showError("Please enter a Pokémon name or ID.");
  }
});
