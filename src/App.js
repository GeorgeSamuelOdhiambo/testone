import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import { SandBox } from "./Components/SandBox";
import Home from "./Components/Home";

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/sandbox" element={<SandBox />} />
          </Route>
          <Route exact path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
