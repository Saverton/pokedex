import React, { useState } from "react";
import { postTeam } from "../database-scripts/postTeam";

function TeamForm({ currentTeam, onRemove }) {
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
        style={{ backgroundColor: `#BFB9BA` }}
        className="p-2 btn border-secondary"
        onClick={() => handleRemoveClick(idx)}
      >
        Remove from Team!
      </button>
    </li>
  ));

  return (
    <div>
      <h3>My Team : </h3>
      <label htmlFor="name">Team Name : </label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="My Team"
        onChange={handleTeamNameChange}
        value={teamName}
      />
      <ul className="d-flex">{teamCards}</ul>
      <button
        style={{ backgroundColor: `#BFB9BA`}}
        className="btn border-secondary"
        onClick={handleSave}
      >
        Save Team to Database!
      </button>
    </div>
  );
}

export default TeamForm;
