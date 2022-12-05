import React from 'react';

function PokemonCard({ pokemon }) {
  

  return( 
    
    <div>
     <h2>{pokemon.name}</h2> 
      <p>{pokemon.height}</p>
      <p>{pokemon.weight}</p>
        <img
          src={pokemon.sprites}
          alt={pokemon.name}
          className="card__image"
        />
      <p>{pokemon.types}</p>
      <p>{pokemon.hp||'x'}</p>
    </div>
  );
}

export default PokemonCard;