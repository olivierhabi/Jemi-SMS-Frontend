import React, { useState } from "react";
import { findPhoneNumbersInText } from "libphonenumber-js";
import API from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import MessageOnePage from "./MessageOnePage";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [sender, setSender] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const sendMessage = async e => {
    e.preventDefault();
    setLoader(true);
    setStatusMessage("");

    const token = localStorage.getItem("auth-token");
    const options = {
      headers: { Authorization: token }
    };
    const findNumbers = findPhoneNumbersInText(`${phone}`, "RW");
    const data = findNumbers.map(x => x.number.number);
    const allMessage = message.match(/[\s\S]{1,160}/g) || [];
    console.log(data);
    if (data.length === 0) {
      setStatusMessage("Phone numbers is incorrect");
      setLoader(false);
      return;
    }
    for (var i = 0; i < data.length; i++) {
      const phone = data[i];

      for (var a = 0; a < allMessage.length; a++) {
        const message = allMessage[a];

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
            setStatusMessage("Message sent");
            setLoader(false);
            setMessage("");
            setSender("");
            setPhone("");
          },
          error => {
            const { message } = error.response.data;

            setStatusMessage(message);
            setLoader(false);
          }
        );
      }
    }
  };

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
    <main class="content">
      <div class="container-fluid p-0">
        <h1 id="header-h1" class="h3 mb-3">
          Messages
        </h1>
        <div id="message-row">
          <div class="card">
            <MessageOnePage />

            <div id="signup-form">
              <form class="needs-validation" onSubmit={sendMessage}>
                <div class="form-row">
                  <div id="username-input">
                    <label id="username-label" for="message">
                      Phone Numbers
                    </label>
                    <br />
                    <textarea
                      type="text"
                      id="message"
                      value={phone}
                      placeholder="Your phone numbers"
                      onChange={e => setPhone(e.target.value)}
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
                      id="sender"
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
                      id="message"
                      value={message}
                      placeholder="Your Message"
                      onChange={e => setMessage(e.target.value)}
                    />
                    <br />
                    <p id="message-length">
                      {message.length} Characters of message{" "}
                      {Math.ceil(message.length / 160)}
                    </p>
                  </div>
                </div>
                <Error />
                <SpinLoader />
                <button
                  id="signup-btn"
                  class="btn btn-outline-light"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MessagePage;
