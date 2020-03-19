import React, { useState } from "react";
import API from "./Api";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ContactOnePage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  const contactSave = e => {
    e.preventDefault();
    const token = localStorage.getItem("auth-token");
    const options = {
      headers: { Authorization: token }
    };
    API.post(
      "/contact",
      {
        name: name,
        phone: phone
      },
      options
    ).then(
      response => {
        setErrorMessage(response.data.message);
        console.log(response.data.message);
        history.push("/contacts");
      },
      error => {
        console.log(error.message);
      }
    );
  };

  const Error = () => {
    if (!errorMessage) {
      return null;
    }
    return (
      <div>
        <p id="error-message">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {errorMessage}
        </p>
      </div>
    );
  };

  return (
    <div>
      <button
        onClick={handleShow}
        align="left"
        id="one-message-btn"
        class="btn btn-outline-light"
        type="submit"
      >
        Contact
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Single Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="one-message-form">
            <form onSubmit={contactSave} class="needs-validation">
              <div class="form-row">
                <div id="">
                  <label id="username-label" for="usrename">
                    Name
                  </label>
                  <input
                    value={name}
                    placeholder="Name"
                    onChange={e => setName(e.target.value)}
                    type="text"
                    class="form-control"
                    id="phone-one"
                    required
                  />
                </div>
                <div id="">
                  <label id="username-label" for="usrename">
                    Phone
                  </label>
                  <input
                    value={phone}
                    placeholder="Phone number"
                    onChange={e => setPhone(e.target.value)}
                    type="text"
                    class="form-control"
                    id="phone-one"
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
                Send
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    /*<div>
      <p>Add contact</p>
      <form onSubmit={contactSave}>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={e => setName(e.target.value)}
        />
        <input
          value={phone}
          type="text"
          placeholder="phone"
          onChange={e => setPhone(e.target.value)}
        />
        <Error />
        <button>Save contact</button>
      </form>
    </div>*/
  );
};

export default ContactOnePage;
