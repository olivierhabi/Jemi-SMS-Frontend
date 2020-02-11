import React, { useState, useEffect } from "react";
import API from "./Api";

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const deleteContact = async id => {
    await API.delete(`/contact/${id}`, options)
      .then(res => {
        setMessage(res.data.message);
        fetchData();
      })
      .catch(err => console.log(err));
  };

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };
  const fetchData = async () => {
    let mounted = true;
    await API.get("/contact", options)
      .then(res => {
        if (mounted) {
          setData(res.data.contactData);
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(mounted => {
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const ContactData = ({ contact, deleteContact }) => {
    return (
      <div>
        <li key={contact.id}>
          {contact.name}, {contact.phone}
          <button onClick={() => deleteContact(contact.id)}> Remove</button>
        </li>
      </div>
    );
  };
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1> My Saved contact</h1>
      <p>{message}</p>
      <ul>
        {data.map(contact => (
          <ContactData
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))}
        <button>Remove selected</button>
        <button onClick={() => refreshPage()}>Refresh</button>
      </ul>
    </div>
  );
}
export default App;
