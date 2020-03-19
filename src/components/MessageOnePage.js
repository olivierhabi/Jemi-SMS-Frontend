import React, { useState } from "react";
import API from "./Api";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [phone, setPhone] = useState("");
  const [loader, setLoader] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [response, setResponse] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setMessage("");
    setSender("");
    setPhone("");
    setLoader(false);
    setResponse(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const history = useHistory();

  const sendMessage = async e => {
    e.preventDefault();
    setLoader(true);

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
        setResponse(true);
        setLoader(false);
        history.push("/messages");
      },
      error => {
        // console.log(error);
        const { message } = error.response.data;
        setStatusMessage(message);
        setResponse(true);
        setLoader(false);
      }
    );
  };
  // console.log(statusMessage);
  // const Error = () => {
  //   if (!statusMessage) {
  //     return null;
  //   }
  //   return (
  //     <div>
  //       <p id="error-message">
  //         <FontAwesomeIcon icon={faExclamationCircle} />
  //         {statusMessage}
  //       </p>
  //     </div>
  //   );
  // };

  if (loader) {
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
            <Modal.Title>Wait for Response</Modal.Title>
          </Modal.Header>
          <div id="spinner-modal">
            <div id="nb-spinner"></div>
          </div>
        </Modal>
      </div>
    );
  }

  if (response) {
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
            <Modal.Title>Response</Modal.Title>
          </Modal.Header>
          <div id="response-modal">
            <p>
              <div class="inline-status">
                <FontAwesomeIcon id="error-icon" icon={faExclamationCircle} />
                {statusMessage}
              </div>
            </p>
          </div>
        </Modal>
      </div>
    );
  }

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
          <div id="one-message-form">
            <form onSubmit={sendMessage} class="needs-validation">
              <div class="form-row">
                <div id="">
                  <label id="username-label" for="usrename">
                    Phone
                  </label>
                  <input
                    maxlength="10"
                    value={phone}
                    placeholder="Phone number"
                    onChange={e => {
                      const phone = e.target.value;
                      if (phone.match(/^[0-9]*$/)) {
                        setPhone(phone);
                      }
                    }}
                    // onChange={e => setPhone(e.target.value)}
                    type="text"
                    class="form-control"
                    id="phone-one"
                    required
                  />
                </div>
                <div id="">
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
