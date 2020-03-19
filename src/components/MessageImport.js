import React, { useState } from "react";
import API from "./Api";
import DropZone from "../lib/DropZone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const MessagePage = () => {
  const [state, setState] = useState({
    jsonResult: null
  });
  const [message, setMessage] = useState("");
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
    const data = state.jsonResult;
    if (data === null) {
      setStatusMessage("Please Import your contact file");
      setLoader(false);
      return;
    }
    const allMessage = message.match(/[\s\S]{1,160}/g) || [];

    for (var i = 0; i < data.length; i++) {
      const phone = data[i];

      for (var a = 0; a < allMessage.length; a++) {
        const message = allMessage[a];
        console.log(phone.phone);

        await API.post(
          "/message",
          {
            message: message,
            sender: sender,
            phone: phone.phone
          },
          options
        ).then(
          response => {
            setStatusMessage("Message sent");
            console.log(response);
            setLoader(false);
            setMessage("");
            setSender("");
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
  console.log(statusMessage);
  return (
    <main class="content">
      <div class="container-fluid p-0">
        <h1 id="header-h1" class="h3 mb-3">
          Import CSV
        </h1>
        <div id="message-row">
          <div class="card">
            <NavLink to="/message" activeClassName="is-active" exact={true}>
              <button
                align="left"
                id="one-message-btn"
                class="btn btn-outline-light"
                type="submit"
              >
                Back
              </button>
            </NavLink>

            <div id="signup-form">
              <div class="media">
                <div class="media-body">
                  <div id="import-content">
                    <div>
                      <DropZone
                        getJson={jsonResult => {
                          setState({ jsonResult });
                        }}
                      >
                        <p id="import-contact">
                          <FontAwesomeIcon icon={faFileImport} />
                          Import Contact.
                        </p>
                      </DropZone>
                    </div>
                  </div>

                  {state.jsonResult ? (
                    <div>
                      <label id="username-label" for="usrename">
                        Imported Contacts
                      </label>
                      <div
                        id="contacts-forms"
                        class="container-fluid vh-50 d-flex flex-column"
                      >
                        <div
                          id="locationlist"
                          class="col overflow-auto bg-info"
                        >
                          <div class="position-absolute">
                            {state.jsonResult.map((contact, index) => {
                              // eslint-disable-next-line no-redeclare
                              var index = index + 1;
                              return (
                                <div class="form-row">
                                  <p id="index-number">{index}. </p>
                                  <div id="username-input">
                                    <input
                                      key={index}
                                      type="text"
                                      name="phone"
                                      defaultValue={contact.phone}
                                      class="form-control"
                                      id="contact"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <form class="needs-validation" onSubmit={sendMessage}>
                <div class="form-row">
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
