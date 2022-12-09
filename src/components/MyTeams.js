import React from 'react';
import TeamCard from './TeamCard';

function MyTeams({ myTeams }) {
  const teamCards = myTeams.map(
    team => <TeamCard key={team.id} team={team} />
  );
  
  return (
    <>
      <h1 className='myTeamsLink'>My Teams </h1>
      {teamCards}
    </>
  );
}

export default MyTeams;