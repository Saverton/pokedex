import React from 'react';

function TeamCard({ team }) {
  const teamPokemon = team.pokemon.map(
    (pkmn, idx) => (
      <span key={`${pkmn.name}-${idx}`}>
        <h4>{pkmn.name}</h4>
        <img src={pkmn.sprite} alt={`${pkmn.name} sprite`} />
      </span>
    )
  );
  
  return (
    <div>
      <h3>{team.name}</h3>
      <ul>
        {teamPokemon}
      </ul>
    </div>
  );
}

export default TeamCard;