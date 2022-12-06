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
    className="p-1 border border-danger rounded col-lg-2 col-md-3 d-flex flex-column align-items-center"
    style={{backgroundColor: `#D2F6AE`}}
    >
      <div className="col-12 d-flex justify-content-between p-2">
        <h2>#{pokemon.id}</h2>
        <button
          className = "btn"
          style={{backgroundColor: `#BFB9BA`}}
          onClick={handleAddToTeamClick}
        >Add to Team</button>
      </div>
      <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>{"Height: " + pokemon.height}</p>
      <p>{"Weight: " + pokemon.weight}</p>
      <img
        className="img-thumbnail img-fluid"
        src={pokemon.sprites.front}
        alt={pokemon.name}
      />
      <p>{types()}</p>
      <p>{`${pokemon.maxHp} ❤️`}</p>
    </div>
  );
}

export default PokemonCard;
