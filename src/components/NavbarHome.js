import React from "react";
import { NavLink } from "react-router-dom";

const NavBarHome = () => (
  <header>
    <h1>Project 11 HomePage</h1>
    <NavLink to="/signup" activeClassName="is-active" exact={true}>
      Signup
    </NavLink>
    <NavLink to="/signin" activeClassName="is-active">
      Signin
    </NavLink>
  </header>
);

export default NavBarHome;
