import React, { useState } from "react";
import API from "./Api";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faMoneyCheckAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import "../style/styles.scss";

const SignupForm = props => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [quantity, setQuantiy] = useState("");
  const [amount, setAmount] = useState("");
  const [tax, setTax] = useState();
  const [taxExcl, setTaxExcl] = useState("");
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState(false);
  const [respData, setRespData] = useState("");
  const [status, setStatus] = useState("");
  const history = useHistory();

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setPhone("");
    setAmount("");
    setRespData("");
    setResponse(false);
    setLoader(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const topUp = e => {
    e.preventDefault();
    setLoader(true);

    API.post("/pay", {
      phone: phone,
      amount: amount
    }).then(
      response => {
        const status = response.data.data.success;

        const data = response.data.data.message;
        setStatus(status);
        setResponse(true);
        setLoader(false);
        setRespData(data);
      },
      error => {
        if (!error.response) {
          const networkError = "Error: network error";
          setMessage(networkError);
        } else {
          const { message } = error.response.data;
          setMessage(message);
        }
      }
    );
  };

  function percentage(value) {
    return (18 * value) / 100;
  }
  function taxEcluded(value) {
    const tax = value - percentage(value);
    return tax;
  }
  if (loader) {
    return (
      <div>
        <button
          onClick={handleShow}
          id="topup-btn"
          class="btn btn-outline-light"
          type="submit"
        >
          <FontAwesomeIcon id="favicon" icon={faMoneyCheckAlt} />
          Topup
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Wait for Response</Modal.Title>
          </Modal.Header>
          <div id="spinner-modal">
            <div id="nb-spinner"></div>
          </div>
        </Modal>
      </div>
    );
  }
  if (response) {
    return (
      <div>
        <button
          onClick={handleShow}
          id="topup-btn"
          class="btn btn-outline-light"
          type="submit"
        >
          <FontAwesomeIcon id="favicon" icon={faMoneyCheckAlt} />
          Topup
        </button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Response</Modal.Title>
          </Modal.Header>
          <div id="response-modal">
            <p>
              <div class="inline-status">
                {status ? (
                  <FontAwesomeIcon id="check-icon" icon={faCheck} />
                ) : (
                  <FontAwesomeIcon id="error-icon" icon={faExclamationCircle} />
                )}
              </div>

              {respData}
            </p>
          </div>
        </Modal>
      </div>
    );
  }
  return (
    <div>
      <button
        onClick={handleShow}
        id="topup-btn"
        class="btn btn-outline-light"
        type="submit"
      >
        <FontAwesomeIcon id="favicon" icon={faMoneyCheckAlt} />
        Topup
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Topup</Modal.Title>
        </Modal.Header>

        <div id="signup-form-modal">
          <form onSubmit={topUp} class="needs-validation">
            <div class="form-row">
              <div id="username-input">
                <label id="username-label" for="usrename">
                  Payment Method
                </label>
                <input
                  defaultValue="MTN Mobile Money"
                  type="text"
                  class="form-control"
                  id="payment-topup"
                  placeholder="Username"
                  required
                  readOnly
                />
              </div>
              <div id="emailinput">
                <label id="email-label" for="email">
                  Phone Number
                </label>
                <input
                  maxlength="10"
                  value={phone}
                  onChange={e => {
                    const phone = e.target.value;
                    if (phone.match(/^[0-9]*$/)) {
                      setPhone(phone);
                    }
                  }}
                  type="text"
                  class="form-control"
                  id="phone-topup"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div id="emailinput">
                <label id="email-label" for="email">
                  Amount
                </label>
                <input
                  value={amount}
                  onChange={e => {
                    const amount = e.target.value;
                    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
                      setAmount(amount);
                    }
                    setQuantiy(e.target.value / 16);
                    setTax(percentage(e.target.value));
                    setTaxExcl(taxEcluded(e.target.value));
                    return;
                  }}
                  type=""
                  class="form-control"
                  id="amount-topup"
                  placeholder="Amount"
                  required
                />
              </div>
              <div id="price-info">
                <p>Price Information:</p>
                <div id="price-total" align="right">
                  <p>Unit price: 16 FRW</p>
                  <p>Quantity: {quantity || 0}</p>
                  <p>Price tax excl: {taxExcl || 0} FRW</p>
                  <p>VAT(18%): {tax || 0} FRW</p>
                  <p>Total price: {amount || 0} FRW</p>
                </div>
              </div>
            </div>
            <button id="signup-btn" class="btn btn-outline-light" type="submit">
              Send
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export { SignupForm as default };
