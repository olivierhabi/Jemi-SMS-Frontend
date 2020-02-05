import React, { useState, useEffect } from "react";
import getToken from "../helpers/jwt";
import API from "../components/Api";
import { useHistory } from "react-router-dom";

const Authenticated = props => {
  const [user, setUser] = useState({ user: undefined });
  const history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      history.push("/signin");
    }
    let mounted = true;

    const loadData = async () => {
      API.get("/account", {
        headers: { Authorization: token }
      })
        .then(res => {
          if (mounted) {
            setUser({ user: res.data });
          }
        })
        .catch(err => {
          localStorage.removeItem("auth-token");
          history.push("/signin");
        });
    };
    loadData();
    return () => {
      mounted = false;
    };
  }, [history]);
  if (user === undefined) {
    console.log("loading");
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }
  return <div>{props.children}</div>;
};
export default Authenticated;
