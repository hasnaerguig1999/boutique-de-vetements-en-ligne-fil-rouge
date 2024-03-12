import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('userData'));

  return user && user.role === 'admin';
};

const AdminRoute = ({ children }) => {
  const location = useLocation();

  return isAdmin() ? children : <Navigate to="/SignIn" state={{ from: location }} />;
};

export default AdminRoute;