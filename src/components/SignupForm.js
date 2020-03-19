import React, { useState } from "react";
import API from "./Api";
import Modal from "react-bootstrap/Modal";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "../style/styles.scss";

const SignupForm = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const singUp = e => {
    e.preventDefault();
    setLoader(true);
    setMessage("");

    API.post("/users", {
      username: username,
      email: email,
      password: password,
      phone: phone
    }).then(
      response => {
        const { message } = response.data;
        setMessage(message);
        setLoader(false);
        // history.push("/account");
      },
      error => {
        if (!error.response) {
          const networkError = "Error: network error";
          setMessage(networkError);
          setLoader(false);
        } else {
          const { message } = error.response.data;
          setMessage(message);
          setLoader(false);
        }
      }
    );
    setPassword("");
  };

  const Error = () => {
    if (!message) {
      return null;
    }
    return (
      <div>
        <p id="error-message">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {message}
        </p>
      </div>
    );
  };

  const SpinLoader = () => {
    if (!loader) {
      return null;
    } else if (loader) {
      return (
        <div>
          <div id="nb-spinner-button"></div>
        </div>
      );
    }
  };

  return (
    <div>
      <a onClick={handleShow} id="signup" class="btn btn-outline-light">
        Sign Up
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register Your Account.</Modal.Title>
        </Modal.Header>

        <div id="signup-form-modal">
          <form onSubmit={singUp} class="needs-validation">
            <div class="form-row">
              <div id="username-input">
                <label id="username-label" for="usrename">
                  Username
                </label>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div id="emailinput">
                <label id="email-label" for="email">
                  Email
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div id="password-input">
                <label id="password-label" for="password">
                  Password
                </label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <div id="phone-input">
                <label id="phone-label" for="phone">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  type="phone"
                  class="form-control"
                  id="phone"
                  placeholder="Phone"
                  required
                />
              </div>
            </div>
            <Error />
            <SpinLoader />
            <button id="signup-btn" class="btn btn-outline-light" type="submit">
              Sign Up
            </button>
            <p id="signup-word">
              Have an account
              <NavLink id="signup-link" to="/signin">
                Login
              </NavLink>{" "}
              Here!
            </p>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export { SignupForm as default };
