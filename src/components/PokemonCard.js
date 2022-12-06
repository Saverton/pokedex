import React from "react";

function PokemonCard({ pokemon, onAddToTeam }) {
  function handleAddToTeamClick() {
    onAddToTeam(pokemon);
  }
  function types() {
    return pokemon.types[1]
      ? pokemon.types[0] + " " + pokemon.types[1]
      : pokemon.types[0];
  }
  return (
    <div
    >
      <div>
        <h2>#{pokemon.id}</h2>
        <button
          onClick={handleAddToTeamClick}
        >Add to Team</button>
      </div>
      <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>{"Height: " + pokemon.height}</p>
      <p>{"Weight: " + pokemon.weight}</p>
      <img
        src={pokemon.sprites.front}
        alt={pokemon.name}
      />
      <p>{types()}</p>
      <p>{`${pokemon.maxHp} ❤️`}</p>
    </div>
  );
}

export default PokemonCard;
