import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(true);

  const login = ({ email, password }) => {
    setAuthenticated(true);
    window.alert("2nd endpoint reached");
    <Navigate to={"/"} />;
  };

  const register = ({ username, email, password }) => {
    setAuthenticated(true);
    <Navigate to={"/"} />;
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
    <Navigate to={"/signin"} />;
  };

  const value = {
    sidebarCollapsed,
    setSidebarCollapsed,
    isAuthenticated,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
