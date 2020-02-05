import React, { useState } from "react";
import API from "./Api";
import { NavLink } from "react-router-dom";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const singUp = e => {
    e.preventDefault();

    API.post("/users", {
      username: username,
      email: email,
      password: password,
      phone: phone
    }).then(
      response => {
        const { status, message } = response.data;
        setStatus(status);
        setMessage(message);
      },
      error => {
        const { status, message } = error.response.data;
        setStatus(status);
        setMessage(message);
      }
    );
    setUsername("");
    setEmail("");
    setPassword("");
    setPhone("");
  };

  return (
    <div className="SignUp">
      <p>Please Register</p>
      <p>{(status, message)}</p>
      <form onSubmit={singUp}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <input
          value={phone}
          onChange={e => setPhone(e.target.value)}
          type="phone"
          placeholder="phone"
        />
        <button>Register</button>
        <p>
          Have an account <NavLink to="/signin">Login</NavLink> Here!
        </p>
      </form>
    </div>
  );
};

export { SignupForm as default };
