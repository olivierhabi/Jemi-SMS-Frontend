import React, { useState, useEffect } from "react";
import API from "./Api";
import EditAccountModal from "./EditAccountModal";

const AccountPage = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };
  const fetchData = async () => {
    let mounted = true;
    await API.get("/users", options)
      .then(res => {
        if (mounted) {
          //   console.log(res.data.data.username);
          setEmail(res.data.data.email);
          setUsername(res.data.data.username);
          setPhone(res.data.data.phone);
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

  return (
    <main class="content">
      <div class="container-fluid p-0">
        <h1 id="header-h1" class="h3 mb-3">
          My Account
        </h1>
        <div id="message-row">
          <div class="card">
            <div id="signup-form">
              <form
                class="needs-validation"
                //    onSubmit={sendMessage}
              >
                <div class="form-row">
                  <div id="username-input">
                    <label id="username-label" for="usrename">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      placeholder="Sender"
                      //   onChange={e => setSender(e.target.value)}
                      class="form-control"
                      id="account"
                      readOnly
                    />
                  </div>
                  <div id="username-input">
                    <label id="username-label" for="usrename">
                      Email
                    </label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Sender"
                      //   onChange={e => setSender(e.target.value)}
                      class="form-control"
                      id="account"
                      readOnly
                    />
                  </div>
                  <div id="username-input">
                    <label id="username-label" for="usrename">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={phone}
                      placeholder="Sender"
                      //   onChange={e => setSender(e.target.value)}
                      class="form-control"
                      id="account"
                      readOnly
                    />
                  </div>
                  <div id="username-input">
                    <label id="username-label" for="usrename">
                      Pasword
                    </label>
                    <input
                      type="password"
                      value={email}
                      placeholder="Sender"
                      //   onChange={e => setSender(e.target.value)}
                      class="form-control"
                      id="account"
                      readOnly
                    />
                  </div>
                </div>
                <EditAccountModal />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
