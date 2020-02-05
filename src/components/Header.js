import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <header>
    <h1>Project 11 Dashboard</h1>
    <NavLink to="/contact" activeClassName="is-active">
      Contact
    </NavLink>
    <NavLink to="/message" activeClassName="is-active" exact={true}>
      message
    </NavLink>
    <NavLink to="/logout" activeClassName="is-active" exact={true}>
      Logout
    </NavLink>
  </header>
);

export default Header;
