import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea.jsx";
import "./Review.css";
import { useParams } from "react-router";
import axios from 'axios';

const Review = () => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedOval, setSelectedOval] = useState(null); // State to track selected oval
  const [errorMessage, setErrorMessage] = useState(""); // Initialize errorMessage state
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = useParams();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (rating === 0 || description.trim() === "") {
      setErrorMessage("Please provide both rating and description.");
      return;
    }

    // Reset error message
    setErrorMessage("");

    // Handle submission logic here
    console.log("Rating:", rating);
    console.log("Description:", description);
    console.log("id:", id);
    // You can submit the data to your backend or do any further processing here
    setErrorMessage("");
    setSuccessMessage("");

    const token = localStorage.getItem("token");

    const reviewData = {
      serviceRequestId: id,
      rating,
      feedback: description,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        `/review/service-provider/${id}`,
        reviewData,
        config
      );

      if (response.status === 200) {
        setSuccessMessage("Review submitted successfully.");
        setRating(0);
        setDescription("");
        setSelectedOval(null);
      } else {
        setErrorMessage(`Failed to submit review: ${response.data.message}`);
      }
    } catch (error) {
      setErrorMessage(`Failed to submit review: ${error.message}`);
    }
  };

  const handleOvalClick = (oval) => {
    setSelectedOval(oval);
  };

  return (
    <div className="review-container justify-center flex items-center">
      <div className="mt-[200px] bg-[#d9d9d9] review__bgColor w-[798px] h-[604px] rounded-lg">
        <div className="p-[80px] #">
          <h2 className="text-[25px]">Rate your recent experience</h2>

          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <span
                    key={index}
                    onClick={() => handleRatingChange(starValue)}
                    style={{
                      cursor: "pointer",
                      color: "#FFA500",
                      fontSize: "18px",
                      borderRadius: "50%",
                      backgroundColor: "#FFFFFF",
                      marginRight: "4px",
                    }}
                  >
                    {starValue <= rating ? "★" : "☆"}
                  </span>
                );
              })}
            </div>
            <div className="mt-6">
              <label htmlFor="description" style={{ color: "#000" }}>
                Tell us more about your experience
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-[560px] h-[126px] mt-8"
                style={{ color: "#000000" }}
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}
            <div className="oval-container">
              <div
                className={`oval-shape ${
                  selectedOval === "Issue" && "selected"
                }`}
                onClick={() => handleOvalClick("Issue")}
              >
                Issue
              </div>
              <div
                className={`oval-shape ${
                  selectedOval === "Fixed" && "selected"
                }`}
                onClick={() => handleOvalClick("Fixed")}
              >
                Fixed
              </div>
              <div
                className={`oval-shape ${
                  selectedOval === "Work" && "selected"
                }`}
                onClick={() => handleOvalClick("Work")}
              >
                Work
              </div>
              <div
                className={`oval-shape ${
                  selectedOval === "Problem" && "selected"
                }`}
                onClick={() => handleOvalClick("Problem")}
              >
                Problem
              </div>
              <div
                className={`oval-shape ${
                  selectedOval === "Installed" && "selected"
                }`}
                onClick={() => handleOvalClick("Installed")}
              >
                Installed
              </div>
            </div>
            <div className="mt-[70px] text-center">
              <button
                type="submit"
                style={{ color: "white", padding: "10px 50px" }}
                className="bg-[#1d1d1d]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
