import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header
    >
      <h1 className="headerImg">Pokedex</h1>
      <nav>
        {/* <ul> */}
          <div className="links">
             <NavLink exact to="/">
                Pokedex
              </NavLink>

              <NavLink to="/my-teams">
                My Teams
              </NavLink>
              
              <NavLink to="/battle">Battle </NavLink>
          
          </div>
          {/* <div>
            <h3>
              <NavLink to="/my-teams">
                My Teams
              </NavLink>
            </h3> */}
          {/* </div>
          <div>
            <h3>
              <NavLink to="/battle">
                Battle!
              </NavLink>
            </h3> */}
          {/* </div> */}
        {/* </ul> */}
      </nav>
    </header>
  );
}

export default Header;
