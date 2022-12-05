import React, { useState, useEffect } from 'react';

import PokemonList from './PokemonList';
import SearchForm from './SearchForm';
import TeamForm from './TeamForm';
import PokemonCard from './PokemonCard';

// COMMAND TO START JSON-SERVER => json-server -wp 8000 db.json OR npm run server
const API_URL = 'http://localhost:8000/pokemon' // gets original 151 pokemon

function Pokedex() {
  const [ pokemon, setPokemon ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        console.table(data);
        setPokemon(data);
      })
  }, []);
  
  const filteredPokemon = pokemon.filter(
    pkmn => pkmn.name.includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TeamForm />
      <PokemonList pokemon={filteredPokemon} />
    </main>
  );
}

export default Pokedex;