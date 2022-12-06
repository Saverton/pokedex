import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header
    style={{backgroundColor: `#fc465e`}}
    >
      <h1>Pokedex</h1>
      <nav>
        <NavLink to="/">
          Pokedex
        </NavLink>
        <NavLink to="/my-teams">
          My Teams
        </NavLink>
        <NavLink to="/battle">
          Battle!
        </NavLink>
      </nav>
    </header>
  )
}

export default Header;