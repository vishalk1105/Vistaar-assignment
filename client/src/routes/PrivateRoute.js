import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const data = token !== null && jwt_decode(token) && token !== undefined;

  return data ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
