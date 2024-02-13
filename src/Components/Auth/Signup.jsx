import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/register`, {
        name,
        email: username,
        password,
      });
      console.log(response.data);
      if (response.data) {
        window.location.href = "/login";
      } else {
        console.error("Login failed:", response.data);
      }
      console.log("Response:", response.data.message);
    } catch (error) {
      console.log("Code:", error);
    }
  };

  const goToLoginPage = () => {
    window.location.href = "/login";
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <h2 className="text-center mb-4">Signup</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={handleSignup}>
          Signup
        </button>
        <div className="text-center">
          <span>Already have an account?</span>
          <br />
          <button className="btn btn-link" onClick={goToLoginPage}>
            Go to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
