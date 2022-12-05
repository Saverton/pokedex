import React from 'react';

function PokemonCard({ pokemon, onAddToTeam }) {
  function handleAddToTeamClick() {
    onAddToTeam(pokemon);
  }

  return( 
    
    <div>
     <h2>{pokemon.name}</h2> 
      <p>{pokemon.height}ft</p>
      <p>{pokemon.weight}</p>
        <img
          src={pokemon.sprites.front}
          alt={pokemon.name}
          className="card__image"
        />
      <p>{pokemon.types}</p>
      <p>{pokemon.hp||'x'}</p>
      <button onClick={handleAddToTeamClick}>Add to Team!</button>
    </div>
  );
}

export default PokemonCard;