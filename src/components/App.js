import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { getTeams } from '../database-scripts/getTeams';

import Pokedex from './Pokedex';
import MyTeams from './MyTeams';
import Header from './Header';

function App() {
  const [ currentTeam, setCurrentTeam ] = useState([]);
  const [ myTeams, setMyTeams ] = useState([]);

  useEffect(() => {
    getTeams(setMyTeams);
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Pokedex currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
        </Route>
        <Route path="/my-teams">
          <MyTeams myTeams={myTeams} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
