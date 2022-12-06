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
    <div className="m-1 col-lg-2 col-md-3 border border-primary pokemon-card d-flex flex-column align-items-center">
      <div className="col-12 d-flex justify-content-between p-2">
        <h2>{pokemon.name}</h2>
        <button className = "btn btn-success" onClick={handleAddToTeamClick}>Add to Team</button>
      </div>
      <p>{"Height: " + pokemon.height}</p>
      <p>{"Weight: " + pokemon.weight}</p>
      <img
        className="img-thumbnail img-fluid"
        src={pokemon.sprites.front}
        alt={pokemon.name}
      />
      <p>{types()}</p>
      <p>{pokemon.hp || "x"}</p>
    </div>
  );
}

export default PokemonCard;
