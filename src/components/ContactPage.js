import React, { useState } from "react";
import API from "./Api";
import { useHistory } from "react-router-dom";
import DropZone from "../lib/DropZone";

const ContactPage = () => {
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
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        });
      console.log(name, phone);
    }
    history.push("/contacts");
  };

  return (
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
                  <input type="text" name="name" defaultValue={contact.name} />
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
  );
};

export default ContactPage;
