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
import Move from "./simulator/Move";

const moveObj = {
  name: "Mega Kick",
  type: "fighting",
  stats: {
    category: "physical",
    power: "120",
    accuracy: "75",
    pp: "5",
    effect: "",
  },
  id: 81,
};

const move = new Move(moveObj);
const baseDamage = move.baseDamage(100, 50, 20);
console.log(baseDamage);

const modifiedDamage = move.modifiedDamage(baseDamage, ["normal", "fighting"], ["dragon"])

console.log()
console.log(move.finalDamage(100, 50, 20, ["normal", "fighting"], ["dragon"]));
console.log(move.finalDamage(100, 50, 20, ["normal", "fighting"], ["normal", "psychic"]));

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
