import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { postPokemon } from "./database-scripts/postPokemon.js";
import { deletePokemon } from "./database-scripts/deletePokemon.js";
import { postTeam } from "./database-scripts/postTeam.js";
import { deleteTeam } from "./database-scripts/deleteTeam.js";
import Pokemon from "./simulator/Pokemon";
import { createStatusEffect } from "./simulator/status-effects/StatusEffectFactory";

const pkmn = new Pokemon({
  id: 78,
  name: "rapidash",
  height: 17,
  weight: 950,
  sprites: {
    front:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png",
    back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/78.png",
  },
  types: ["fire"],
  maxHp: 65,
  stats: {
    attack: 100,
    defense: 70,
    spAttack: 80,
    spDefense: 80,
    speed: 105,
  },
  possibleMoves: [
    4, 9, 13, 34, 33, 40, 42, 44, 53, 62, 64, 84, 89, 101, 105, 106, 118, 132,
    138, 142, 145, 146, 154,
  ],
});
const burn = createStatusEffect("burn", pkmn);
pkmn.statusEffect = burn;
burn.runSideEffect();
console.log(pkmn);
// console.log(burn);
// const para = createStatusEffect("paralyze", pkmn);
// console.log(para);
// const pois = createStatusEffect("poison", pkmn);
// console.log(pois);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
