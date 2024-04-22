import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  const fetchUserByEmail = async (email) => {
    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();

     



      if (users) {
        console.log("User found:", users);
        return user;
      } else {
        console.log("No user found with the email:", email);
        return null;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return null;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/users?email=" + encodeURIComponent(email)
      );
      const users = await response.json();
      console.log("All users: ", users )
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
        setAuthenticated(true);
        console.log("User found:", user);
        // navigate("/");
        // <Navigate to={"/"} />;
        return true;
      } else {
        setAuthenticated(false);
        setUser(null);
        // throw new Error(`HTTP error! status: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
    // fetchUserByEmail(email).then((user) => {
    //   if (user) {
    //     // User with email exists
    //     setUser(foundUser);
    //     setAuthenticated(true);
    //     // navigate("/");
    //     <Navigate to={"/"} />;
    //     return true;
    //   } else {
    //     // User with email does not exist
    //     setAuthenticated(false);
    //     setUser(null);
    //     return false;
    //   }
    // });
  };

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
        <Navigate to={"/"} />;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAuthenticated(false);
    <Navigate to={"/signin"} />;
  };

  // Remember to add user and logout to the value
  const value = {
    sidebarCollapsed,
    setSidebarCollapsed,
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
