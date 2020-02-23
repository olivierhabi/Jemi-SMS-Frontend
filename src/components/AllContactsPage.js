import React, { useState, useEffect } from "react";
import API from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
      <tr>
        <td>
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" />
            <span class="custom-control-label"></span>
          </label>
        </td>
        <td>{contact.name}</td>
        <div id="hide-class">
          <td>{contact.phone}</td>
        </div>
        <td>
          <a id="remove-icon" onClick={() => deleteContact(contact.id)}>
            {" "}
            <FontAwesomeIcon icon={faTrashAlt} />
          </a>
        </td>
      </tr>
    );
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <main class="content">
      <div class="container-fluid p-0">
        <h1 id="header-h1" class="h3 mb-3">
          Sent Messages
        </h1>
        <div id="message-row">
          <div class="row">
            <div class="card">
              <div id="message-view">
                <div class="card-body">
                  <table id="datatables-basic" class="table table-striped">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>Name</th>
                        <div id="hide-class">
                          <th>Phone</th>
                        </div>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(contact => (
                        <ContactData
                          key={contact.id}
                          contact={contact}
                          deleteContact={deleteContact}
                        />
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => refreshPage()}>Refresh</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default App;
