import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header
    >
      <h1>Pokedex</h1>
      <nav>
        <ul>
          <li>
            <h3>
              <NavLink exact to="/">
                Pokedex
              </NavLink>
            </h3>
          </li>
          <li>
            <h3>
              <NavLink to="/my-teams">
                My Teams
              </NavLink>
            </h3>
          </li>
          <li>
            <h3>
              <NavLink to="/battle">
                Battle!
              </NavLink>
            </h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
