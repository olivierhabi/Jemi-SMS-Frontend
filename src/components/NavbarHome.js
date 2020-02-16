import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SignupForm from "./SignupForm";
import "../style/styles.scss";

const NavBarHome = () => {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return (
    <nav className="navbar">
      <div align="left" className="authbutton">
        <NavLink className="signin" to="/signin" activeClassName="is-active">
          Signin
        </NavLink>
        <button onClick={openModal} className="signup">
          Signup
        </button>
        <SignupForm closeModal={closeModal} show={show} />
      </div>
    </nav>
  );
};

export default NavBarHome;
