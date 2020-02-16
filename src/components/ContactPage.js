import React, { useState } from "react";
import API from "./Api";
import { useHistory } from "react-router-dom";
import DropZone from "../lib/DropZone";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState({
    jsonResult: null
  });
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

  const importContact = e => {
    e.preventDefault();

    const data = state.jsonResult;

    const token = localStorage.getItem("auth-token");

    const options = {
      headers: { Authorization: token }
    };
    if (data === null) {
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

  return (
    <div>
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
    </div>
  );
};

export default ContactPage;
