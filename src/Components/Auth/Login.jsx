import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/login`, {
        email: username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isAuthenticated", true);
        window.location.href = "/home";
      } else {
        console.error("Login failed:", response.data.message);
      }
      console.log("Response:", response.data.message);
    } catch (error) {
      console.log("Code:", error);
    }
  };

  const goToSignupPage = () => {
    window.location.href = "/signup";
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="col-md-6">
        <div className="text-center mb-4">
          <h2>Login</h2>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Enter Username</label>
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
        Login
        </button>
        <div className="text-center">
          <span>Don't have an account?</span>
          <br />
          <button className="btn btn-link" onClick={goToSignupPage}>
            Go to signup Page
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default Login;
