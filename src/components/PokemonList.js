import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemon, onAddToTeam, searchTerm, setSearchTerm }) {

  const pokemonCards = pokemon.map(
    eachPokemon => <PokemonCard key={`pokemon-${eachPokemon.id}`} pokemon={eachPokemon} onAddToTeam={onAddToTeam} />
  );

  return (
    <div className="d-flex flex-column">
      <h2 className="align-self-center">Pokemon List</h2>
      <div className="row">
        {pokemonCards}
      </div>
    </div>
  );
}
export default PokemonList;