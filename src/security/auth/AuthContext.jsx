import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
// import apiClient from "../client";

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
  const [userDetails, setUserDetails] = useState(() => {
    return JSON.parse(localStorage.getItem("userDetails")) || null;
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
        "http://localhost:8081/api/v1/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const authenticationResponse = await response.json();

      console.log("auth response:", authenticationResponse);

      if (authenticationResponse.token) {
        // Save token in local storage
        localStorage.setItem("token", authenticationResponse.token);

        // Assuming setUser, setAuthenticated, and setError are React state setter functions
        setUser(authenticationResponse);
        setAuthenticated(true);

        // Redirect based on user role
        switch (authenticationResponse.roles) {
          case "ROLE_CUSTOMER":
            // Redirect customer to customer dashboard
            // navigate("/");
            <Navigate to={"/"} />;
            break;
          case "ROLE_SERVICE_PROVIDER":
            // Redirect service provider to provider dashboard
            <Navigate to={"/"} />;
            break;
          case "ROLE_ADMIN":
            // Redirect admin to admin dashboard
            // history.push("/admin/dashboard");
			<Navigate to={"/admin-dashboard"} />;
            break;
          default:
            break;
        }

        return true;
      } else {
        setError("Authentication failed. Please check your credentials.");
        setAuthenticated(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      setError(`Login failed: ${error.message}`);
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

  // Define the AddressDTO
  const AddressDTO = ({ streetName, city, province, zipCode }) => ({
    streetName,
    city,
    province,
    zipCode,
  });

  // Adjust the register function to use AddressDTO
  // Adjust the register function to send data in the correct format
  const register = async ({
    name,
    surname,
    email,
    user_name,
    password,
    address,
  }) => {
    try {
      const response = await fetch("http://localhost:8081/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: user_name,
          email,
          password,
          firstName: name,
          lastName: surname,
          address: AddressDTO(address), // Convert address to AddressDTO
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get the error message from the response
        throw new Error(errorMessage); // Throw an error with the message
      }

      // If registration is successful, navigate to the sign-in page
      //   navigate("/signin");
      <Navigate to={"/signin"} />;

      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
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
    setUser,
    userDetails,
    setUserDetails,
    user,
    login,
    register,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
