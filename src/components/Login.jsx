import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
// import "./";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginInfo((currData) => {
      return {
        ...currData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(loginInfo);
    const { email, password } = loginInfo;
    if (!email || !password) {
      //client side validation
      return handleError("name, email and password are required");
    }
    try {
      const url = "http://localhost:3002/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          if (jwtToken) {
            window.location.href = "http://localhost:3001/";
          }
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError(err);
    }
    setLoginInfo({
      email: "",
      password: "",
    });
  };

  return (
    <div className="containerAuth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter a email"
            id="email"
            name="email"
            value={loginInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Enter a password"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Login;
