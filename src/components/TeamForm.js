import React, { useState } from 'react';
import { postTeam } from '../database-scripts/postTeam';

function TeamForm({ currentTeam, onRemove }) {
  const [ teamName, setTeamName ] = useState("My Team");

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
      pokemon: currentTeam.map(
        pokemon => ({
          name: pokemon.name,
          sprite: pokemon.sprites.front,
          id: pokemon.id
        })
      )
    };

    postTeam(teamObj, () => alert("TEAM WAS SAVED (REPLACE ME WITH SOMETHING LESS JUNKY!)"));
  }

  const teamCards = currentTeam.map(
    (pokemon, idx) => (
      <li key={`${pokemon.name}-${idx}`}>
        <img src={pokemon.sprites.front} alt={pokemon.name} />
        <button className="btn btn-success" onClick={() => handleRemoveClick(idx)}>Remove from Team!</button>
      </li>
    )
  );

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
      <ul>
        {/* populate with up to 6 pokemon! */}
        {teamCards}
      </ul>
      <button className="btn btn-success" onClick={handleSave}>Save Team to Database!</button>
    </div>
  );
}

export default TeamForm;