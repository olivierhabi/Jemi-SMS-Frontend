import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";
import API from "./Api";
import { useHistory } from "react-router-dom";
import DropZone from "../lib/DropZone";
import ContactOnePage from "./ContactOnePage";

const ContactPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    jsonResult: null
  });
  const history = useHistory();

  const importContact = e => {
    e.preventDefault();

    const data = state.jsonResult;

    const token = localStorage.getItem("auth-token");

    const options = {
      headers: { Authorization: token }
    };
    if (data === null) {
      setErrorMessage("Please Import Your Contact file");
      console.log("Please Import Your Contact file");
      return;
    }

    for (var i = 0; i < data.length; i++) {
      const name = data[i].name;
      const phone = data[i].phone;
      API.post(
        "/contact",
        {
          name: name,
          phone: phone
        },
        options
      )
        .then()
        .catch(err => {
          console.log(err.message);
        });
    }
    history.push("/contacts");
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
    <main class="content">
      <div class="container-fluid p-0">
        <h1 id="header-h1" class="h3 mb-3">
          Contacts
        </h1>
        <div id="message-row">
          <div class="card">
            <ContactOnePage />
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
                                      defaultValue={contact.name}
                                      class="form-control"
                                      id="contact-save"
                                    />
                                  </div>
                                  <div id="username-input">
                                    <input
                                      key={index}
                                      type="text"
                                      name="phone"
                                      defaultValue={contact.phone}
                                      class="form-control"
                                      id="contact-save"
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
              <form class="needs-validation" onSubmit={importContact}>
                <div class="form-row">
                  <Error />
                </div>
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
        </div>
      </div>
    </main>
  );
  /*<div>
      <div style={{ width: 640, margin: "15px auto" }}>
        <div>
          <DropZone
            getJson={jsonResult => {
              setState({ jsonResult });
            }}
          >
            <p>Add a file and see for yourself</p>
          </DropZone>
          <form onSubmit={importContact}>
            {state.jsonResult ? (
              <div>
                {state.jsonResult.map(contact => (
                  <div>
                    <input
                      type="text"
                      name="name"
                      defaultValue={contact.name}
                    />
                    <input
                      type="text"
                      name="phone"
                      defaultValue={contact.phone}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            <button>Import contacts</button>
          </form>
        </div>
      </div>
      <div>
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
          <button>Save contact</button>
        </form>
                </div>
    </div>*/
};

export default ContactPage;
