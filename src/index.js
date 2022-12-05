import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { postPokemon } from "./database-scripts/postPokemon";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//test code for team updating
const mockTeam = [
  {
    name: "Bulbasaur"
  }
]
const charizardTest = {
  name: "charizard",
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
const teamID = 1;
postPokemon(1, mockTeam, charizardTest);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
