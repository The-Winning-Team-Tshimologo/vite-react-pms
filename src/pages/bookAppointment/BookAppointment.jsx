import Calendar from "@/components/calendar/Calendar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import Header from "@/components/header/Header";

export const BookAppointment = () => {
  const [formData, setFormData] = useState({
    message: "",
    selectedDate: dayjs(),
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setErrors(errors);
      // navigate("/");
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    for (const key in data) {
      if (!data[key]) {
        errors[key] = `${
          ", " + key.charAt(0).toUpperCase() + key.slice(1)
        } is required `;
      }
    }

    return errors;
  };

  return (
    <div>
      <Header/>
      <form className="appointment__container flex" onSubmit={handleSubmit}>
        <div className="flex-1">
          <h2 className="px-10">Book your appointment now</h2>
          <p className="px-10">So our team can reach out to you on time</p>
          <div className="p-10">
            <p>
              {" "}
              Share your message{" "}
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </p>
            <Textarea
              name={"message"}
              value={formData.message}
              onChange={handleChange}
              className="custom-border bg-gray-100"
              rows={20}
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Adjusted to center the Calendar and Submit button vertically */}
          <Calendar name={formData.selectedDate} />
          {/* <button className="mt-4 ">Submit</button> */}
          <div className="flex justify-center margin-center w-96">
            <Button type="submit" variant="custom">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
