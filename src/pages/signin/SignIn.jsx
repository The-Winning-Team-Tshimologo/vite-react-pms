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

import React from "react";
import { useForm } from "react-hook-form";
import "./Signin.css";
import Application from "@/components/signin/application/Application";

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <>
      <div className="form__container">
        <div className="signin-form__signin">
          <form onSubmit={handleSubmit(onSubmit)} id="form2">
            <h1>Sign in</h1>
            <label className="Signin_labelname">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="Enter Email"
              className="px-4 py-2 rounded"
            />
            {errors.email && (
              <p className="paragraph-red">{errors.email.message}</p>
            )}

            <label className="Signin_labelname">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must contain at least 10 characters",
                },
              })}
              type="password"
              placeholder="Enter Password"
              className="px-4 py-2 rounded"
            />
            {errors.password && (
              <p className="paragraph-red">{errors.password.message}</p>
            )}

            <button
              id="signin-button"
              disabled={isSubmitting}
              type="submit"
              className="green-colour-disabled:purple"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="background-image-right"></div>
      </div>

      <Application />
    </>

    // <div class="split-screen">
    //   {/* <!-- Left content --> */}
    //   <div class="split-screen__half">...</div>

    //   {/* <!-- Right content --> */}
    //   <div class="split-screen__half">...</div>
    // </div>
  );
}

export default Signin;
