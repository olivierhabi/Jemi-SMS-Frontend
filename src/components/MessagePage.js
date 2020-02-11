import React, { useState } from "react";
import API from "./Api";
import DropZone from "../lib/DropZone";

const MessagePage = () => {
  const [state, setState] = useState({
    jsonResult: null
  });
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const importContact = async e => {
    e.preventDefault();

    const token = localStorage.getItem("auth-token");
    const options = {
      headers: { Authorization: token }
    };
    const data = state.jsonResult;
    // console.log(data);
    // console.log(sender);
    // console.log(message);
    if (data === null) {
      setStatusMessage("Please Import your contact file");
      return;
    }
    for (var i = 0; i < data.length; i++) {
      const phone = data[0].phone;

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
          setStatusMessage("Message sent");
          setMessage("");
          setSender("");
        },
        error => {
          console.log(error);
          // const { status, message } = error.response.data;
          // setStatus(status);
          // setMessage(message);
        }
      );

      // console.log([
      //   {
      //     phone,
      //     sender,
      //     message
      //   }
      // ]);
    }
  };

  return (
    <div>
      <h1> Send Message </h1>
      <div style={{ width: 640, margin: "15px auto" }}>
        <div>
          <DropZone
            getJson={jsonResult => {
              setState({ jsonResult });
            }}
          >
            <p>Add a file and see for yourself</p>
          </DropZone>
        </div>
      </div>
      <div>
        <p>{statusMessage}</p>
        <form onSubmit={importContact}>
          {state.jsonResult ? (
            <div>
              {state.jsonResult.map(contact => (
                <div>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={contact.phone}
                  />
                </div>
              ))}
            </div>
          ) : null}
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
