import React from 'react';

import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
  const pokemonCards = pokemon.map(
    (eachPokemon, idx) => <li key={`pokemon-${idx + 1}`}>{eachPokemon.name}</li>
  );

  return (
    <div>
      <p>Pokemon List</p>
      <ul>
        {pokemonCards}
      </ul>
    </div>
  );
}

export default PokemonList;