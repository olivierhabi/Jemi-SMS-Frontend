import React from "react";
import { NavLink } from "react-router-dom";

const NavTopDashboard = () => (
  <nav class="navbar navbar-expand navbar-light bg-white">
    <a href="/" class="sidebar-toggle d-flex mr-2">
      <i class="hamburger align-self-center"></i>
    </a>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <button>
            <NavLink to="/logout" activeClassName="is-active" exact={true}>
              Logout
            </NavLink>
          </button>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavTopDashboard;
