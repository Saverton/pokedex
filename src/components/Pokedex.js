import React, { useState, useEffect } from 'react';

import PokemonList from './PokemonList';
import SearchForm from './SearchForm';
import TeamForm from './TeamForm';
import PokemonCard from './PokemonCard';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/?limit=151' // gets original 151 pokemon

function Pokedex() {
  const [ pokemon, setPokemon ] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        console.table(data);
        setPokemon(data.results);
      })
  }, []);

 //const pokemonUrl={pokemon.sprites}

  return (
    <main>
      <SearchForm />
      <TeamForm />
      <PokemonList pokemon={pokemon} />
      <PokemonCard pokemon={pokemon}/>
      
    </main>
  );
}

export default Pokedex;