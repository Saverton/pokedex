import React from 'react';

import PokemonCard from './PokemonCard';

function PokemonList({ pokemon }) {
  const pokemonCards = pokemon.map(
    eachPokemon => <PokemonCard key={`pokemon-${eachPokemon.id}`} pokemon={eachPokemon} />
  );

  return (
    <div>
      <h2>Pokemon List</h2>
      <div className="row">
        {pokemonCards}
      </div>
    </div>
  );
}

export default PokemonList;