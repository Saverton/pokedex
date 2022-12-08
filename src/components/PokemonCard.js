import React from "react";
import { CardContent, CardHeader, Sprite, Button } from "../shared";

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
    <CardContent>
      <CardHeader>
        <h2>#{pokemon.id}</h2>
        <Button className="addToTeamBtn" onClick={handleAddToTeamClick}>Add to Team</Button>
      </CardHeader>
      <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>{"Height: " + pokemon.height}</p>
      <p>{"Weight: " + pokemon.weight}</p>
      <Sprite src={pokemon.sprites.front} alt={pokemon.name} />
      <p>{types()}</p>
      <p>{`${pokemon.maxHp} ❤️`}</p>
    </CardContent>
  );
}

export default PokemonCard;
