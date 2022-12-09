import React from 'react';

function TeamCard({ team }) {
  const teamPokemon = team.pokemon.map(
    (pkmn, idx) => (
    <div className='myTeamsPokemon'>
      <span key={`${pkmn.name}-${idx}`}>
        <h4 >{pkmn.name}</h4>
        <img src={pkmn.sprite} alt={`${pkmn.name} sprite`} />
      </span>
      </div>
    )
  );
  
  return (
    <div>
      <h3 className='teamNames'>{team.name}</h3>
      <ul className='myTeams'>
        {teamPokemon}
      </ul>
    </div>
  );
}

export default TeamCard;