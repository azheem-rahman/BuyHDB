import React, { useState, useRef } from "react";
import { Navigate, NavLink } from "react-router-dom";

import LoginCreateAccountSideImage from "../assets/LoginCreateAccountSideImage.jpg";
import BuyHDBLogo2 from "../assets/BuyHDBLogo2.jpg";

const Login = () => {
  const inputUsernameRef = useRef();
  const inputPasswordRef = useRef();

  const [submitted, setSubmitted] = useState(false);
  const [successfulLogin, setSuccessfulLogin] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    setSubmitted(true);
    passLoginDetailsToBackend();
  };

  const passLoginDetailsToBackend = async () => {
    const url = "http://127.0.0.1:5001/user-login";
    const body = {
      username: inputUsernameRef.current.value,
      password: inputPasswordRef.current.value,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      console.log(response);

      // successful login
      if (response.status === "ok") {
        setSuccessfulLogin(true);
      }
      // unsuccessful login
      else {
        setSuccessfulLogin(false);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const displayInvalidInput = () => {
    if (submitted) {
      if (!successfulLogin) {
        return "Invalid username or password";
      } else {
        return "";
      }
    }
  };

  return (
    <div className="login-container">
      <div className="row" style={{ margin: 0, padding: 0 }}>
        <div className="col" style={{ margin: 0, padding: 0 }}>
          <img
            className="login-side-image"
            src={LoginCreateAccountSideImage}
            alt=""
          />
        </div>

        <div className="col" style={{ margin: 0, padding: 0 }}>
          <div
            className="login-entry-container"
            style={{ margin: 0, padding: 0 }}
          >
            <div className="row" style={{ margin: 0, padding: 0 }}>
              <img className="login-entry-hdb-logo" src={BuyHDBLogo2} alt="" />
            </div>

            <div className="row" style={{ margin: 0, padding: 0 }}>
              <span className="centered">Welcome back!</span>

              <form onSubmit={handleLogin}>
                <div className="row" style={{ margin: 0, padding: 0 }}>
                  <input
                    id="username"
                    type="username"
                    placeholder="username"
                    ref={inputUsernameRef}
                  />
                </div>

                <br />

                <div className="row" style={{ margin: 0, padding: 0 }}>
                  <input
                    id="password"
                    type="password"
                    placeholder="password"
                    ref={inputPasswordRef}
                  />
                  <span>
                    {submitted && !successfulLogin && displayInvalidInput()}
                  </span>
                </div>

                <br />

                <div className="row" style={{ margin: 0, padding: 0 }}>
                  <button type="submit">Login</button>
                </div>

                <div className="row" style={{ margin: 0, padding: 0 }}>
                  <span>
                    <NavLink to="/create-account">
                      Sign up for an account
                    </NavLink>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {successfulLogin && <Navigate to="/Homepage" />}
    </div>
  );
};

export default Login;
