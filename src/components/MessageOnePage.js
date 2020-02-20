import React, { useState } from "react";
import API from "./Api";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [phone, setPhone] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const history = useHistory();

  const sendMessage = async e => {
    e.preventDefault();

    const token = localStorage.getItem("auth-token");
    const options = {
      headers: { Authorization: token }
    };

    await API.post(
      "/message",
      {
        message: message,
        sender: sender,
        phone: phone
      },
      options
    ).then(
      response => {
        // console.log(response.data.message);
        const { message } = response.data;
        setStatusMessage(message);
        setMessage("");
        setSender("");
        setPhone("");
        history.push("/messages");
      },
      error => {
        // console.log(error);
        const { message } = error.response.data;
        setMessage(message);
      }
    );
  };
  console.log(statusMessage);
  const Error = () => {
    if (!statusMessage) {
      return null;
    }
    return (
      <div>
        <p id="error-message">
          <FontAwesomeIcon icon={faExclamationCircle} />
          {statusMessage}
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
        Single
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Single Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div id="signup-form">
            <form onSubmit={sendMessage} class="needs-validation">
              <div class="form-row">
                <div id="username-input">
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
                <div id="username-input">
                  <label id="username-label" for="usrename">
                    Sender
                  </label>
                  <input
                    type="text"
                    value={sender}
                    placeholder="Sender"
                    onChange={e => setSender(e.target.value)}
                    class="form-control"
                    id="sender-one"
                    required
                  />
                </div>
                <div id="username-input">
                  <label id="username-label" for="message">
                    Message
                  </label>
                  <br />
                  <textarea
                    type="text"
                    value={message}
                    placeholder="Your Message"
                    onChange={e => setMessage(e.target.value)}
                    id="message-one"
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
  );
};

export default MessagePage;
