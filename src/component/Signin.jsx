import React from "react";
import { useForm } from "react-hook-form";
import "./Signin.css";

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
    <div className="form__container">
      <div className="signin-form__signin">
        <form
          onSubmit={handleSubmit(onSubmit)}

          id="form2">
          <h1>Sign in</h1>
          <label className="Signin_labelname">

         Email 
         </label>
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


        


     <label className="Signin_labelname">
   Password  
      
      </label>
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
            className="green-colour-disabled:purple">
            Submit
          </button>
        </form>
      </div>
      <div className="background-image-right"></div>
    </div>

    // <div class="split-screen">
    //   {/* <!-- Left content --> */}
    //   <div class="split-screen__half">...</div>

    //   {/* <!-- Right content --> */}
    //   <div class="split-screen__half">...</div>
    // </div>
  );
}

export default Signin;
