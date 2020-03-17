import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import API from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function Example() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loader, setLoader] = useState(false);

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };
  const fetchData = async () => {
    let mounted = true;
    await API.get("/users", options)
      .then(res => {
        if (mounted) {
          setEmail(res.data.data.email);
          setUsername(res.data.data.username);
          setPhone(res.data.data.phone);
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

  const handleClose = () => {
    setMessage("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const Update = e => {
    e.preventDefault();
    setLoader(true);
    setMessage("");

    API.post(
      "/users/update",
      {
        email: email,
        password: password,
        newPassword: newPassword
      },
      options
    ).then(
      response => {
        const message = response.data.message;
        setMessage(message);
        setLoader(false);
      },
      error => {
        if (!error.response) {
          const networkError = "Error: Network Error";
          setMessage(networkError);
        } else {
          const { message } = error.response.data;
          setMessage(message);
          setLoader(false);
        }
      }
    );
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
      <a onClick={handleShow} id="signup-btn" class="btn btn-outline-light">
        Edit
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Profile</Modal.Title>
        </Modal.Header>

        <div className="Login">
          <div id="login">
            <form onSubmit={Update} class="needs-validation">
              <div class="form-row">
                <div id="emailinput">
                  <label id="email-label" for="email">
                    Username
                  </label>
                  <input
                    value={username}
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Username"
                    readOnly
                  />
                </div>
                <div id="emailinput">
                  <label id="email-label" for="email">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={e => {
                      e.persist();
                      setEmail(e.target.value);
                      return;
                    }}
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    required
                  />
                </div>
                <div id="emailinput">
                  <label id="email-label" for="email">
                    Email
                  </label>
                  <input
                    value={phone}
                    type="text"
                    class="form-control"
                    id="email"
                    placeholder="Email"
                    readOnly
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
                <div id="emailinput">
                  <label id="email-label" for="email">
                    New Password
                  </label>
                  <input
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    type="password"
                    class="form-control"
                    id="email"
                    placeholder="New Password"
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
                Save
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Example;
