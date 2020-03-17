import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import API from "./Api";

const LoginForm = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const history = useHistory();

  const Login = e => {
    e.preventDefault();
    setLoader(true);
    setMessage("");

    API.post("/auth/signin", {
      email: email,
      password: password
    }).then(
      response => {
        const { status, message, token } = response.data;
        localStorage.setItem("auth-token", token);
        setStatus(status);
        setMessage(message);
        setLoader(false);
        history.push("/message");
      },
      error => {
        if (!error.response) {
          const networkError = "Error: Network Error";
          setMessage(networkError);
          setLoader(false);
        } else {
          const { status, message } = error.response.data;
          setStatus(status);
          setLoader(false);
          setMessage(message);
        }
      }
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

  return (
    <div>
      <nav
        id="navbar"
        class="navbar navbar-expand-lg justify-content-between navbar-light border-bottom-0 bg-white"
        data-sticky="top"
      >
        <div class="container">
          <div class="col flex-fill px-0 d-flex justify-content-between">
            <a
              id="logotext"
              class="navbar-brand mr-0 fade-page"
              href="localhost:3000"
            >
              Gambino
            </a>
          </div>
        </div>
      </nav>
      <section class="pb-0 pt-5 pt-lg-6">
        <main>
          <div class="container d-flex flex-column">
            <div class="row h-100">
              <div class="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                <div class="d-table-cell align-middle">
                  <div class="text-center mt-4">
                    <p id="login-header" class="modal-title h4">
                      Wellcome to Gambino
                    </p>
                  </div>

                  <div class="card">
                    <div id="card-body" class="card-body">
                      <div id="signup-form">
                        <form onSubmit={Login} class="needs-validation">
                          <div class="form-row">
                            <div id="emailinput">
                              <label id="email-label" for="email">
                                Email
                              </label>
                              <input
                                value={email}
                                onChange={e => setUsername(e.target.value)}
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
                          </div>
                          <Error />
                          <SpinLoader />
                          <button
                            id="signup-btn"
                            class="btn btn-outline-light"
                            type="submit"
                          >
                            Sign In
                          </button>
                          <p id="signup-word">
                            Don't Have an account
                            <NavLink id="signup-link" to="/signup">
                              Signup
                            </NavLink>
                            Here!
                          </p>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
    /*<div className="Login">
      <p>Please Signin</p>
      <p>{(status, message)}</p>
      <form onSubmit={Login}>
        <input
          value={email}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button>Login</button>
        Don't Have an account <NavLink to="/signup">Signup</NavLink> Here!
      </form>
  </div>*/
  );
};

export default LoginForm;
