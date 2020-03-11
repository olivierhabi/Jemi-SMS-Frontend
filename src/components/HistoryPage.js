import React, { useState, useEffect } from "react";
import API from "./Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "../style/classic.scss";

const HistoryPage = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("auth-token");
  const options = {
    headers: { Authorization: token }
  };

  const fetchData = async () => {
    let mounted = true;
    await API.get("/history", options)
      .then(res => {
        if (mounted) {
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

  const HistoryData = ({ history, index }) => {
    return (
      <tr>
        <td>
          {index}. {history.transaction}
        </td>
        <td>{history.customer}</td>
        <td>{history.amount}</td>
        <td>{history.smsQuantity}</td>
        <div id="hide-class">
          <td>{history.createdAt}</td>
        </div>
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
                        <th>Action</th>
                        <th>User</th>
                        <th>amount</th>
                        <th>Qty</th>

                        <div id="hide-class">
                          <th>customer</th>
                        </div>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((history, index) => {
                        // eslint-disable-next-line no-redeclare
                        var index = index + 1;
                        return (
                          <HistoryData
                            key={history.id}
                            history={history}
                            index={index}
                          />
                        );
                      })}
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
};
export { HistoryPage as default };
