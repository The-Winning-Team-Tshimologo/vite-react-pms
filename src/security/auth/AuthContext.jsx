import { createContext, useContext, useState, useEffect } from "react";
import { Navigate } from "react-router";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // Initialize state from local storage to maintain state after refresh
  const [isAuthenticated, setAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  });
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [error, setError] = useState(null);

  // const navigate = Navigate();

  useEffect(() => {
    // Store user and authentication status in local storage
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("user", JSON.stringify(user));

    if (user) {
      console.log("User found:", user);
      // <Navigate to={"/"} />;
    }
  }, [user, isAuthenticated]);

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(email)}`
      );
      const foundUser = await response.json();

      const verifiedUser = foundUser.find(
        (u) => u.email === email && u.password === password
      );

      if (verifiedUser) {
        setUser(verifiedUser);
        setAuthenticated(true);
        return true;
      } else {
        setError("User not verified.");
        setAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      setError(`Login failed: ${error}`);
      console.error("Login failed:", error);
      return false;
    }
  };

  // const register = async ({ username, email, password }) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ username, email, password }),
  //     });

  //     if (response.ok) {
  //       const newUser = await response.json();
  //       setUser(newUser);
  //       setAuthenticated(true);
  //     } else {
  //       setError("Registration failed.");
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Registration failed:", error);
  //     setError(`Registration failed: ${error}`);
  //     return false;
  //   }
  // };

  const register = async ({ username, email, password }) => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUser(newUser);
        setAuthenticated(true);
      } else {
        setError("Registration failed.");
        return false;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(`Registration failed: ${error}`);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setUser(null);
    setAuthenticated(false);
    <Navigate to={"/signin"} />;
  };

  const value = {
    sidebarCollapsed,
    setSidebarCollapsed,
    isAuthenticated,
    user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
