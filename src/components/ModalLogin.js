import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import API from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Example() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Login = e => {
    e.preventDefault();

    API.post("/auth/signin", {
      email: email,
      password: password
    }).then(
      response => {
        const { message, token } = response.data;
        localStorage.setItem("auth-token", token);
        setMessage(message);
        history.push("/message");
      },
      error => {
        if (!error.response) {
          const networkError = "Error: network error";
          setMessage(networkError);
        } else {
          const { message } = error.response.data;
          setMessage(message);
        }
      }
    );
  };

  return (
    <div>
      <a onClick={handleShow} id="signin" class="btn btn-outline-light">
        Sign In
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wellcome to Gambino</Modal.Title>
        </Modal.Header>

        <div className="Login">
          <div id="login">
            <form onSubmit={Login} class="needs-validation">
              <div class="form-row">
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
                <br />
                <div class="col-md-4 mb-3">
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
              </div>
              <Error />
              <button
                id="signup-btn"
                class="btn btn-outline-light"
                type="submit"
              >
                Sign In
              </button>
              <p id="signuplink">
                Don't Have an account{" "}
                <NavLink id="signup-link" to="/signup">
                  Signup{" "}
                </NavLink>
                Here!
              </p>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Example;
