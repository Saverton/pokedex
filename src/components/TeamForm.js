import React, { useState } from "react";
import { postTeam } from "../database-scripts/postTeam";

function TeamForm({ currentTeam, onRemove, setShowTeam, showTeam }) {
  const [teamName, setTeamName] = useState("My Team");

  function handleTeamNameChange(e) {
    setTeamName(e.target.value);
  }

  function handleRemoveClick(teamIndex) {
    onRemove(teamIndex);
  }

  function handleSave() {
    if (currentTeam.length === 0) {
      alert("YOU MUST HAVE AT LEAST ONE POKEMON IN A TEAM!");
      return;
    }
    const teamObj = {
      name: teamName,
      pokemon: currentTeam.map((pokemon) => ({
        name: pokemon.name,
        sprite: pokemon.sprites.front,
        id: pokemon.id,
      })),
    };

    postTeam(teamObj, () =>
      alert("TEAM WAS SAVED (REPLACE ME WITH SOMETHING LESS JUNKY!)")
    );
  }

  const teamCards = currentTeam.map((pokemon, idx) => (
    <li
      className="p-1 m-1 border border-secondary rounded d-flex flex-column align-items-center"
      style={{ listStyle: "none" }}
      key={`${pokemon.name}-${idx}`}
    >
      <div className="d-flex align-items-center">
        <h3>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h3>
        <img src={pokemon.sprites.front} alt={pokemon.name} />
      </div>
      <button
        style={{ backgroundColor: `#D6D0D1` }}
        className="p-2 btn border-secondary"
        onClick={() => handleRemoveClick(idx)}
      >
        Remove from Team!
      </button>
    </li>
  ));

  return (
    <div className="teamName">
      <label className="teamNametext" htmlFor="name">Team Name: </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="The Flatiron Team"
        onChange={handleTeamNameChange}
        value={teamName}
      />

      <div className="myPokeball">
      {/* <h3> click me! </h3> */}
      <img onClick={()=>setShowTeam(prev =>!prev)} className="myPokeball" src="https://cdn3.emoji.gg/emojis/8839-pokeballsuccess.gif" width="64px" height="64px" alt="PokeballSuccess"/> 
      </div>
    
      <ul className="d-flex">
        {showTeam? teamCards : null}
        </ul>
      <button
        className="saveMyTeamBtn"
        onClick={handleSave}>
        Save My Team
      </button>
    </div>
  );
}

export default TeamForm;
