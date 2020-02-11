import React, { useState } from "react";
import DropZone from "react-dropzone-csv-to-json";
import API from "./Api";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

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
        console.log(response);
      },
      error => {
        console.log(error.message);
      }
    );
  };

  return (
    <div>
      <div>
        <DropZone
          getJson={jsonResult => {
            this.setState({ jsonResult });
          }}
        >
          <p>Add a file and see for yourself</p>
        </DropZone>
        {this.state.jsonResult ? (
          <div>{JSON.stringify(this.state.jsonResult)}</div>
        ) : null}
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
