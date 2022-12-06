import React, { useState, useEffect } from 'react';

import PokemonList from './PokemonList';
import SearchForm from './SearchForm';
import TeamForm from './TeamForm';
import PokemonCard from './PokemonCard';

// COMMAND TO START JSON-SERVER => json-server -wp 8000 db.json OR npm run server
const API_URL = 'http://localhost:8000/pokemon' // gets original 151 pokemon

function Pokedex({ currentTeam, setCurrentTeam }) {
  const [ pokemon, setPokemon ] = useState([]);
  const [ searchFilters, setSearchFilters ] = useState({
    searchTerm: "",
    typeFilter: "all"
  });

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        // console.table(data);
        setPokemon(data);
      })
  }, []);

  function addPokemonToTeam(pokemon) {
    if (currentTeam.length < 6) {
      setCurrentTeam([...currentTeam, pokemon]);
    } else {
      alert('A TEAM CAN ONLY HAVE 6 POKEMON!');
    }
  }

  function removePokemonFromTeam(pokemonTeamIndex) {
    setCurrentTeam(currentTeam.filter((_, idx) => idx !== pokemonTeamIndex));
  }
  
  const filteredPokemon = pokemon.filter(
    pkmn => {
      return pkmn.name.includes(searchFilters.searchTerm.toLowerCase()) && 
      (searchFilters.typeFilter === 'all' || pkmn.types.includes(searchFilters.typeFilter))
    }
  );

  return (
    <main>
      <TeamForm currentTeam={currentTeam} onRemove={removePokemonFromTeam} />
      <SearchForm searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <PokemonList pokemon={filteredPokemon} onAddToTeam={addPokemonToTeam} />
    </main>
  );
}

export default Pokedex;