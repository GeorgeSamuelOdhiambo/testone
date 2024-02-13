// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// const isAuthenticated = () => {
//   // Check if user is authenticated (e.g., by checking JWT token in localStorage)
//   return localStorage.getItem('token') !== null;
// };

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     isAuthenticated() ? <Component {...props} /> : <Navigate to="/login" />
//   )} />
// );

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  var auth;
  if (token) {
    auth = true;
  } else {
    auth = false;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
