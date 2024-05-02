// import React, { useState } from "react";
// import "./Sign.css";

// const SignIn= () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your validation logic and form submission here
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="sign__container">
//       <div className="signin-form">
//         <form className="form-flex" onSubmit={handleSubmit}>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//           />

//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//           />

//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//           />

//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//           />

//           <button type="submit">Sign Up</button>
//           <a href="#">Already have an account? Sign in</a>
//         </form>
//       </div>

//       <div className="solid-color"></div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Signin.css";
import { useNavigate } from "react-router";
import { useAuth } from "@/security/auth/AuthContext";
import { NavLink } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Assuming your login function expects an object with email and password
    const response = await auth.login({ email, password });

    if (response) {
      // Redirect to the dashboard or another route as needed
      navigate("/");
    } else {
      // Show an error message or indicate login failed
      alert("Login failed");
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  return (
    <>
      <div className="form__container">
        <div className="signin-form__signin">
          <form onSubmit={handleSubmit} id="form2">
            <h2>Sign in</h2>
            <label className="Signin_labelname-email">Email</label>
            {errors.email && (
              <p className="paragraph-red">{errors.email.message}</p>
            )}
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // className="px-4 py-2 rounded"
            />

            <label className="Signin_labelname">Password</label>
            {errors.password && (
              <p className="paragraph-red">{errors.password.message}</p>
            )}
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Password must contain at least 10 characters",
                },
              })}
              type="password"
              className="input"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              id="signin-button"
              disabled={isSubmitting}
              type="submit"
              className="green-colour-disabled:purple"
            >
              Submit
            </button>
            <div className="mt-5"><p>Don't have an account yet? <NavLink to={"/signup"} className={" text-blue-500"}>Signup</NavLink></p></div>
          </form>
        </div>
        <div className="background-image-right"></div>
      </div>
    </>
  );
}

export default Signin;
