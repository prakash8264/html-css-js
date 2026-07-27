document.getElementById("pokemonInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    fetchPokemon();
  }
});

async function fetchPokemon() {
  const input = document.getElementById("pokemonInput").value.trim().toLowerCase();
  const sprite = document.getElementById("pokemonSprite");
  const errorMsg = document.getElementById("errorMessage");
  const infoBox = document.getElementById("pokemonInfo");

  if (!input) return;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

    if (!response.ok) {
      throw new Error("Pokémon not found");
    }

    const data = await response.json();

    sprite.src = data.sprites.front_default;
    sprite.style.display = "block";
    errorMsg.textContent = "";

    document.getElementById("pokemonName").textContent = data.name.toUpperCase();
    document.getElementById("pokemonId").textContent = "#" + data.id;
    document.getElementById("pokemonTypes").textContent = data.types.map(t => t.type.name).join(", ");
    document.getElementById("pokemonHeight").textContent = (data.height / 10) + " m";
    document.getElementById("pokemonWeight").textContent = (data.weight / 10) + " kg";
    document.getElementById("pokemonExp").textContent = data.base_experience;
    document.getElementById("pokemonAbilities").textContent = data.abilities.map(a => a.ability.name).join(", ");

    infoBox.style.display = "block";
  } catch (error) {
    sprite.style.display = "none";
    errorMsg.textContent = "Pokémon not found!";
    infoBox.style.display = "none";
  }
}

document.getElementById("pokemonInput").value = "pikachu";
fetchPokemon();