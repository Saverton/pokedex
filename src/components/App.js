import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Pokedex from './Pokedex';
import MyTeams from './MyTeams';

function App() {
  return (
    <Switch>
      <Route path="/">
        <Pokedex />
      </Route>
      <Route path="/my-teams">
        <MyTeams />
      </Route>
    </Switch>
  );
}

export default App;
