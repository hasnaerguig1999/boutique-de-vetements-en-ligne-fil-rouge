import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const isUser = () => {
  const user = JSON.parse(localStorage.getItem('userData'));


return user && user.role === 'user';
};

const UserRoute = ({ children }) => {
  const location = useLocation();

  return isUser() ? children : <Navigate to="/SignIn" state={{ from: location }} />;
};

export default UserRoute;