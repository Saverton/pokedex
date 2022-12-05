import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
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
