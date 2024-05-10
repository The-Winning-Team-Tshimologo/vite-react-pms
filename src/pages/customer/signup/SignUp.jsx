import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/security/auth/AuthContext";
import "./SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { helix } from "ldrs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const SignUp = () => {
  const { register } = useAuth(); // Accessing register function from AuthProvider
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    user_name: "",
    password: "",
    confirmPassword: "",
    address: {
      streetName: "",
      city: "",
      province: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const fieldName = name.split(".")[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: { ...prevFormData.address, [fieldName]: value },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "object") {
        // Check if any field in the address is empty
        const addressFields = Object.values(data[key]);
        if (addressFields.some((field) => field === "")) {
          newErrors.address = "All address fields are required";
        }
      } else if (!data[key] && key !== "confirmPassword") {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setFailed(false);
      setLoading(true); // Start loading
      helix.register();
      setTimeout(async () => {
        try {
          const response = await register(formData);
          if (response) {
            navigate("/signin");
          } else {
            throw new Error("Registration failed");
          }
        } catch (error) {
          console.error("Registration failed:", error);
          setErrors({ formError: error.message });
        }
      }, 3000);
    }
  };

  return (
    <div className="signup-container">
      {isLoading && (
        <>
          {/* <l-helix size="150" speed="1.5" color="black"></l-helix> */}
          <div className="loading-overlay">
            <l-helix size="150" speed="1.5" color="black"></l-helix>
          </div>
        </>
      )}
      <div className="signup-content">
        <h1>Welcome to Our Community</h1>
        <p>
          Your one-stop solution for home perfection. From plumbing and
          electrical repairs to pool maintenance and gardening expertise, Our
          team of skilled professionals is dedicated to delivering unparalleled
          craftsmanship, reliability, and efficiency in every repair and
          enhancement, bringing a touch of expertise to every corner of your
          homes
        </p>

        <br />
        <div className="image-stack">
          <img
            src="src\assets\register page pic1.png"
            alt="Community Member 3"
          />
          <p>1k plus people have joined our platform now it's your turn!</p>
        </div>
      </div>

      <div className="signup-form">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="formFiled">
            <label>
              Name{" "}
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="formFiled">
            <label>
              Surname{" "}
              {errors.surname && (
                <span className="error-message">{errors.surname}</span>
              )}
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </div>

          <div className="formFiled">
            <label>
              Email{" "}
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="formFiled">
            <label>
              Username{" "}
              {errors.user_name && (
                <span className="error-message">{errors.user_name}</span>
              )}
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </div>

          <div className="formFiled">
            <label className="flex gap-1">
              Address{" "}
              {errors.address && (
                <div className="error-message">{errors.address}</div>
              )}
            </label>

            <div className="signup-address__container">
              <div className="">
                <input
                  className=""
                  type="text"
                  placeholder={"Street Name"}
                  name="address.streetName"
                  value={formData.address.streetName}
                  onChange={handleChange}
                />
                {/* {errors.streetName && (
                  <span className="error-message">{errors.streetName}</span>
                )} */}
              </div>

              <div className="">
                <input
                  className=""
                  type="text"
                  placeholder="City"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                {/* {errors.city && (
                  <span className="error-message">{errors.city}</span>
                )} */}
              </div>

              <div className="">
                <input
                  className=""
                  type="text"
                  placeholder="Province"
                  name="address.province"
                  value={formData.address.province}
                  onChange={handleChange}
                />
                {/* {errors.province && (
                  <span className="error-message">{errors.province}</span>
                )} */}
              </div>

              <input
                className=""
                type="text"
                placeholder="Postal Code"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
              />
              {/* {errors.postalCode && (
                <span className="error-message">{errors.postalCode}</span>
              )} */}
            </div>
          </div>

          <div className="formFiled">
            <label>
              Password
              {errors.password && (
                <span className="error-message"> {errors.password}</span>
              )}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="icon-button"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="formFiled">
            <label>
              Confirm Password
              {errors.confirmPassword && (
                <span className="error-message">
                  {"  "}
                  {errors.confirmPassword}
                </span>
              )}
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="icon-button"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mt-5">
            <p>
              Have an account already?{" "}
              <NavLink to={"/signin"} className={" text-blue-500"}>
                Signin
              </NavLink>
            </p>
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
