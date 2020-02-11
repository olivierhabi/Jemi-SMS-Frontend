import React, { useState, useEffect } from "react";
import API from "./Api";

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
      <div>
        <li key={message.id}>
          {message.phone},{message.sender}, {message.message},
          <button onClick={() => deleteMessage(message.id)}> Remove</button>
        </li>
      </div>
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
    <div>
      <h1> My Sent Message</h1>
      <p>{message}</p>
      <li>
        {data.map(message => (
          <MessageData
            key={message.id}
            message={message}
            deleteMessage={deleteMessage}
          />
        ))}
      </li>
      <button onClick={() => refreshPage()}>Refresh</button>
    </div>
  );
}

export default AllMessagePage;
