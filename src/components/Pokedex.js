import React, { useState, useEffect } from "react";

import PokemonList from "./PokemonList";
import TeamForm from "./TeamForm";

// COMMAND TO START JSON-SERVER => json-server -wp 8000 db.json OR npm run server
const API_URL = "http://localhost:8000/pokemon"; // gets original 151 pokemon

function Pokedex({ currentTeam, setCurrentTeam }) {
  const [ pokemon, setPokemon ] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);

  function addPokemonToTeam(pokemon) {
    if (currentTeam.length < 6) {
      setCurrentTeam([...currentTeam, pokemon]);
    } else {
      alert("A TEAM CAN ONLY HAVE 6 POKEMON!");
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

  return (
    <main
    className="p-3"
    style={{backgroundColor: `#fc465e`}}
    >
      <button id= "randTeamBtn" onClick={generateRandomTeam}>generate random team</button>
      <TeamForm currentTeam={currentTeam} onRemove={removePokemonFromTeam} />
      <PokemonList pokemon={pokemon} onAddToTeam={addPokemonToTeam} />
    </main>
  );
}

export default Pokedex;
