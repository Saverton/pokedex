import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { postPokemon } from "./database-scripts/postPokemon";
import { deletePokemon } from "./database-scripts/deletePokemon";
import { postTeam } from "./database-scripts/postTeam";
import { deleteTeam } from "./database-scripts/deleteTeam";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

//test code for team updating
const mockTeam = 
  {
    teamName: "Rimon",
    pokemon: [{
      name: "Bulbasaur",
    }],
  }
const charizardTest = {
  name: "Charizard",
  moves: [
    {
      name: "ember",
      baseDamage: "40",
      damageType: "special",
      strongAgainst: ["grass", "bug", "steel"],
      weakAgainst: ["water", "rock", "ground"],
    },
  ],
};
mockTeam.pokemon.push(charizardTest);

const rayquazaTest = {
  name: "rayquaza",
  moves: [
    {
      name: "dragon rush",
      baseDamage: "80",
      damageType: "physical",
      strongAgainst: ["dragon"],
      weakAgainst: ["ice", "steel"],
    },
  ],
};
mockTeam.pokemon.push(rayquazaTest);
// postTeam(mockTeam);
// postTeam(mockTeam);
// deleteTeam(1);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
