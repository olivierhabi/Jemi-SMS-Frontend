import React, { useState, useEffect } from "react";
import API from "./Api";
import { O2A } from "object-to-array-convert";
import { useHistory } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      await API.get("/contact", options)
        .then(res => {
          if (mounted) {
            setData(res.data.contactData);
          }
        })
        .catch(err => console.log(err));
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [history]);
  const deleteContact = async id => {
    await API.delete(`/contact/${id}`, options)
      .then(res => {
        setMessage(res.data.message);

        console.log(data);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1> My Saved contact</h1>
      <p>{message}</p>
      <ul>
        {data.map(contact => (
          <div>
            <li key={contact.id}>
              {contact.name}, {contact.phone}{" "}
              <button onClick={() => deleteContact(contact.id)}> Remove</button>
            </li>
          </div>
        ))}
        <button>Remove selected</button>
      </ul>
    </div>
  );
}
export default App;
