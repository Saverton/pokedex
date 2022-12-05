import React from 'react';

import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
  const pokemonCards = pokemon.map(
    eachPokemon => <PokemonCard key={`pokemon-${eachPokemon.id}`} pokemon={eachPokemon} />
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