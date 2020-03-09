import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import API from "./Api";

const NavTopDashboard = () => {
  const [balance, setBalance] = useState("");

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };
  const fetchData = async () => {
    let mounted = true;
    await API.get("/balance", options)
      .then(res => {
        if (mounted) {
          setBalance(res.data.data.balance);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(mounted => {
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <nav class="navbar navbar-expand navbar-light bg-white">
      <a href="/" class="sidebar-toggle d-flex mr-2">
        <i class="hamburger align-self-center"></i>
      </a>
      <div class="navbar-collapse collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <p id="nav-inline-balance">{balance} FRW</p>
            <button
              align="left"
              id="logout-btn"
              class="btn btn-outline-light"
              type="submit"
            >
              <NavLink to="/logout" activeClassName="is-active" exact={true}>
                Logout
              </NavLink>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavTopDashboard;
