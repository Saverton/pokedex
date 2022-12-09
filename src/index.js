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
import DamageQueue from "./simulator/DamageQueue";

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
