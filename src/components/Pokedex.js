import React, { useState, useEffect } from "react";

import PokemonList from "./PokemonList";
import TeamForm from "./TeamForm";
import PokemonCard from "./PokemonCard";

// COMMAND TO START JSON-SERVER => json-server -wp 8000 db.json OR npm run server
const API_URL = "http://localhost:8000/pokemon"; // gets original 151 pokemon

function Pokedex({ currentTeam, setCurrentTeam }) {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredPokemon = pokemon.filter(
    pkmn => pkmn.name.includes(searchTerm.toLowerCase())
  );

  return (
    <main className="p-3" style={{ backgroundColor: `#fc465e` }}>
      <TeamForm currentTeam={currentTeam} onRemove={removePokemonFromTeam} />
      <PokemonList
        pokemon={filteredPokemon}
        onAddToTeam={addPokemonToTeam}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </main>
  );
}

export default Pokedex;
