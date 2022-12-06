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

  function removePokemonFromTeam(pokemonTeamIndex) {
    setCurrentTeam(currentTeam.filter((_, idx) => idx !== pokemonTeamIndex));
  }

  return (
    <main className="p-3" style={{ backgroundColor: `#fc465e` }}>
      <TeamForm currentTeam={currentTeam} onRemove={removePokemonFromTeam} />
      <PokemonList pokemon={pokemon} onAddToTeam={addPokemonToTeam} />
    </main>
  );
}

export default Pokedex;
