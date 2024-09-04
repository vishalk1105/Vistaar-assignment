import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const data = token !== null && jwt_decode(token);

  return data ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoute;
