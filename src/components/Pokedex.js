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

function generateRandomTeam() {
  let count = 0;
  let newArray = []
  while(count <6){
    count++
    let randNum = Math.floor(Math.random() * 151) + 1
    let findPokemon = pokemon.find((poke)=> poke.id === randNum)
    newArray.push(findPokemon)
  }
  setCurrentTeam(newArray)
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
    <main
    className="p-3"
    style={{backgroundColor: `#fc465e`}}
    >
      <button id= "randTeamBtn" onClick={generateRandomTeam}>generate random team</button>
      <TeamForm currentTeam={currentTeam} onRemove={removePokemonFromTeam} />
      <SearchForm searchFilters={searchFilters} setSearchFilters={setSearchFilters} />
      <PokemonList pokemon={filteredPokemon} onAddToTeam={addPokemonToTeam} />
    </main>
  );
}

export default Pokedex;