import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "./auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/landing" />;
};

export default ProtectedRoute;
