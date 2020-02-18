import React, { useState } from "react";
import API from "./Api";
import DropZone from "../lib/DropZone";
import Dropzone from "react-dropzone";

const MessagePage = () => {
  const [state, setState] = useState({
    jsonResult: null
  });
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const sendMessage = async e => {
    e.preventDefault();

    const token = localStorage.getItem("auth-token");
    const options = {
      headers: { Authorization: token }
    };
    const data = state.jsonResult;
    // console.log(data);
    // console.log(sender);
    // console.log(message);
    if (data === null) {
      setStatusMessage("Please Import your contact file");
      return;
    }
    for (var i = 0; i < data.length; i++) {
      const phone = data[0].phone;

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
          setMessage("");
          setSender("");
        },
        error => {
          console.log(error);
          // const { status, message } = error.response.data;
          // setStatus(status);
          // setMessage(message);
        }
      );

      // console.log([
      //   {
      //     phone,
      //     sender,
      //     message
      //   }
      // ]);
    }
  };

  return (
    <main class="content">
      <div class="container-fluid p-0">
        <h1 class="h3 mb-3">Messages</h1>
        <div id="message-row">
          <div class="row">
            <div id="form-sender-card" class="card">
              <div id="signup-form">
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
            </div>

            <div class="col">
              <div id="import-card" class="card">
                <div class="card-body">
                  <div class="media">
                    <div class="media-body">
                      <div id="import-content">
                        <div>
                          <DropZone
                            getJson={jsonResult => {
                              setState({ jsonResult });
                            }}
                          >
                            <p id="import-contact">Import Contact.</p>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  /*<div>
      <h1> Send Message </h1>
      <div style={{ width: 640, margin: "15px auto" }}>
        <div>
          <DropZone
            getJson={jsonResult => {
              setState({ jsonResult });
            }}
          >
            <p>Add a file and see for yourself</p>
          </DropZone>
        </div>
      </div>
      <div>
        <p>{statusMessage}</p>
        <form onSubmit={importContact}>
          {state.jsonResult ? (
            <div>
              {state.jsonResult.map(contact => (
                <div>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={contact.phone}
                  />
                </div>
              ))}
            </div>
          ) : null}
          <label for="sender">Sender</label>
          <input
            type="text"
            value={sender}
            placeholder="Sender"
            onChange={e => setSender(e.target.value)}
          />
          <label for="message">Message</label>
          <textarea
            type="text"
            value={message}
            placeholder="Your Message"
            onChange={e => setMessage(e.target.value)}
          />
          <button>Send Message</button>
        </form>
      </div>
              </div>*/
};

export default MessagePage;
