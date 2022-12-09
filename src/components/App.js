import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from "styled-components";
import { Switch, Route } from 'react-router-dom';
import { getTeams } from '../database-scripts/getTeams';

import Pokedex from './Pokedex';
import MyTeams from './MyTeams';
import Header from './Header';
import BattlePage from './BattlePage';

const GlobalStyle = createGlobalStyle`
:root {
  --pokedex-red: #989898FE;
  --bulbasaur-green: #0F3036;
  --black: #A5A5A5;
  --white: #FDFCFCF6;
  --background-complement: #FFFFFFE9;
  --background: var(--pokedex-red);
}

body {
  background-color: var(--background);
  padding: 10px;
}
`
function App() {
  const [ currentTeam, setCurrentTeam ] = useState([]);
  const [ myTeams, setMyTeams ] = useState([]);
// console.log(currentTeam)
  useEffect(() => {
    getTeams(setMyTeams);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/">
          <Pokedex currentTeam={currentTeam} setCurrentTeam={setCurrentTeam} />
        </Route>
        <Route path="/my-teams">
          <MyTeams myTeams={myTeams} />
        </Route>
        <Route path="/battle">
          <BattlePage currentTeam={currentTeam} />
        </Route>
      </Switch>
    </>
  );
}

export default App;
