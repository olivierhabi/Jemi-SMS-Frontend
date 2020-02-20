import React, { useState, useEffect } from "react";
import API from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function AllMessagePage() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };
  const fetchData = async () => {
    let mounted = true;
    await API.get("/message", options)
      .then(res => {
        if (mounted) {
          //   console.log(res.data.data);
          setData(res.data.data);
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

  const MessageData = ({ message, deleteMessage }) => {
    return (
      <tr>
        <td>
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" />
            <span class="custom-control-label"></span>
          </label>
        </td>
        <td>{message.phone}</td>
        <td>{message.sender}</td>
        <td>{message.message}</td>
        <td>
          <a id="remove-icon" onClick={() => deleteMessage(message.id)}>
            {" "}
            <FontAwesomeIcon icon={faTrashAlt} />
          </a>
        </td>
      </tr>
    );
  };

  const deleteMessage = async id => {
    await API.delete(`/message/${id}`, options)
      .then(res => {
        // console.log(res);
        setMessage(res.data.message);
        fetchData();
      })
      .catch(err => console.log(err));
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
                        <th>Phone</th>
                        <th>Sender</th>
                        <th>Message</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map(message => (
                        <MessageData
                          key={message.id}
                          message={message}
                          deleteMessage={deleteMessage}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AllMessagePage;
