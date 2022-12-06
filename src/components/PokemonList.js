import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import SearchForm from './SearchForm';

function PokemonList({ pokemon, onAddToTeam }) {
  const [ searchFilters, setSearchFilters ] = useState({
    searchTerm: "",
    typeFilter: "all"
  });

  const filteredPokemon = pokemon.filter(
    pkmn => {
      return pkmn.name.includes(searchFilters.searchTerm.toLowerCase()) && 
      (searchFilters.typeFilter === 'all' || pkmn.types.includes(searchFilters.typeFilter))
    }
  );

  const pokemonCards = filteredPokemon.map(
    eachPokemon => <PokemonCard key={`pokemon-${eachPokemon.id}`} pokemon={eachPokemon} onAddToTeam={onAddToTeam} />
  );

  return (
    <div className="d-flex flex-column">
      <h2 className="align-self-center">Pokemon List</h2>
      <SearchForm searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <div className="row">
        {pokemonCards}
      </div>
    </div>
  );
}
export default PokemonList;