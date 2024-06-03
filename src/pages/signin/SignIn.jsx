import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signin.css";
import { useNavigate } from "react-router";
import { useAuth } from "@/security/auth/AuthContext";
import { NavLink } from "react-router-dom";
import { helix } from "ldrs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Signin() {
  const auth = useAuth();

  const [isLoading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [inputType, setInputType] = useState("password"); // Add state for password input type

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const toggleInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const onSubmit = async (data) => {
    setFailed(false);
    setLoading(true); // Start loading
    helix.register();

    // Delay the login attempt for 3 seconds
    setTimeout(async () => {
      try {
        const response = await auth.login(data);
        if (response) {
          navigate("/"); // Redirect on success
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        setFailed(true);
        console.error(error.message);
      } finally {
        setLoading(false); // Stop loading after login attempt
      }
    }, 3000); // Delay for 3000 milliseconds (3 seconds)
  };

  return (
    <>
      <div className="form__container">
        {isLoading && (
          <div className="loading-overlay">
            <l-helix size="150" speed="1.5" color="black"></l-helix>
          </div>
        )}
        <div className="signin-form__signin">
          {failed && (
            <div className="mb-5">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>
                  Bad Credentials, please check your email and password
                </AlertDescription>
              </Alert>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} id="form2">
            <h2>Sign in</h2>
            <label className="Signin_labelname">
              Email{" "}
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </label>

            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter Email"
              className="input"
            />
            <label className="Signin_labelname">Password  {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}</label>
           
            <div className="password-container">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters",
                  },
                })}
                type={inputType} // Use the state for input type
                className="input"
                placeholder="Enter your Password"
              />
              <span onClick={toggleInputType} className="password-icon">
                {inputType === "password" ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            {/* <div>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must contain at least 8 characters",
                  },
                })}
                type={inputType} // Use the state for input type
                className="input"
                placeholder="Enter your Password" 
              />
              <span onClick={toggleInputType} className="">
                {inputType === "password" ? (
                  <FaEye className="" />
                ) : (
                  <FaEyeSlash className="" />
                )}
              </span>
            </div> */}

            {/* <div className="formFiled">
              <label>
                Password
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </label>
              <input
                type={inputType1}
                name="password"
                value={formData.password || ""}
                // onChange={(e) => handleChange("password", e)}
                onChange={handleChange}
              />
              <span onClick={toggleInputType1} className="icon-button">
                {inputType1 === "password" ? (
                  <FaEye className="icon-button__icon" />
                ) : (
                  <FaEyeSlash className="icon-button__icon" />
                )}
              </span>
            </div> */}

            <button
              id="signin-button"
              disabled={isSubmitting}
              type="submit"
              className=""
            >
              Submit
            </button>
            <div className="mt-5 flex items-center justify-center">
              <p>
                Don't have an account yet?{" "}
                <NavLink to={"/signup"} className={" text-blue-500"}>
                  Signup
                </NavLink>
              </p>
            </div>
          </form>
        </div>
        <div className="background-image-right"></div>
      </div>
    </>
  );
}

export default Signin;
