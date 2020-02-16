import React from "react";

const NavTopDashboard = () => (
  <nav class="navbar navbar-expand navbar-light bg-white">
    <a href="/" class="sidebar-toggle d-flex mr-2">
      <i class="hamburger align-self-center"></i>
    </a>
    <div class="navbar-collapse collapse">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <button>Logout</button>
        </li>
      </ul>
    </div>
  </nav>
);

export default NavTopDashboard;
