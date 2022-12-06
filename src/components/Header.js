import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <header
      className="d-flex flex-column align-items-center"
      style={{ backgroundColor: `#fc465e` }}
    >
      <h1 style={{backgroundColor: "#D2F6AE"}}className="rounded col-12">Pokedex</h1>
      <nav className="flex-row col-12">
        <ul style={{ listStyle: "none" }} className="d-flex flex-row justify-content-around">
          <li className="text-decoration-underline">
            <h3>
              <NavLink className="link-secondary" exact to="/">
                Pokedex
              </NavLink>
            </h3>
          </li>
          <li className="text-decoration-underline">
            <h3>
              <NavLink className="link-secondary" to="/my-teams">
                My Teams
              </NavLink>
            </h3>
          </li>
          <li className="text-decoration-underline">
            <h3>
              <NavLink className="link-secondary" to="/battle">
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
