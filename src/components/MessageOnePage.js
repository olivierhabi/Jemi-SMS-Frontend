import React, { useState } from "react";
import API from "./Api";
import { useHistory } from "react-router-dom";

const MessagePage = () => {
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [phone, setPhone] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const history = useHistory();

  const sendMessage = async e => {
    e.preventDefault();
    console.log(message, sender, phone);

    const token = localStorage.getItem("auth-token");
    const options = {
      headers: { Authorization: token }
    };

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
        // console.log(response.data.message);
        const { message } = response.data;
        setStatusMessage(message);
        setMessage("");
        setSender("");
        setPhone("");
        history.push("/messages");
      },
      error => {
        // console.log(error);
        const { message } = error.response.data;
        setMessage(message);
      }
    );
  };

  return (
    <div>
      <h1> Send Message </h1>

      <div>
        <p>{statusMessage}</p>
        <form onSubmit={sendMessage}>
          <label for="phone">Phone Number</label>
          <input
            type="text"
            value={phone}
            placeholder="Phone number"
            onChange={e => setPhone(e.target.value)}
          />
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
    </div>
  );
};

export default MessagePage;
