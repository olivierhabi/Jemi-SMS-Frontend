import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import API from "./Api";

const LoginForm = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const history = useHistory();

  const Login = e => {
    e.preventDefault();

    API.post("/auth/signin", {
      email: email,
      password: password
    }).then(
      response => {
        const { status, message, token } = response.data;
        localStorage.setItem("auth-token", token);
        setStatus(status);
        setMessage(message);
        history.push("/account");
      },
      error => {
        if (!error.response) {
          const networkError = "Error: Network Error";
          setMessage(networkError);
        } else {
          const { status, message } = error.response.data;
          setStatus(status);
          setMessage(message);
        }
      }
    );
  };

  return (
    <div className="Login">
      <p>Please Signin</p>
      <p>{(status, message)}</p>
      <form onSubmit={Login}>
        <input
          value={email}
          onChange={e => setUsername(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button>Login</button>
        Don't Have an account <NavLink to="/signup">Signup</NavLink> Here!
      </form>
    </div>
  );
};

export default LoginForm;
