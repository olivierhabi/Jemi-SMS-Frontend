import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();
  localStorage.removeItem("auth-token");
  history.push("/");
  return (
    <div>
      <p>Logout</p>
    </div>
  );
};

export { Logout as default };
