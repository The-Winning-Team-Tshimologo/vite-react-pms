import React from "react";
import "./ReviewSummary.css";

// Mock data for the rating summary (this would usually come from a back-end or be calculated)
const ratingSummary = {
  totalReviews: 5,
  averageRating: 4.8,
  overrallCustomerPercpective:
    "Customers rated this pro highly for work quality, professionalism, and value.",
  ratingDistribution: {
    5: 94,
    4: 0,
    3: 0,
    2: 6,
    1: 0,
  },
  mentions: {
    work: 6,
    fixed: 3,
    issue: 3,
    installed: 2,
    problem: 1,
  },
};
const grade = (AverageRating) => {
  if (AverageRating <= 1) {
    return "Poor";
  } else if ((AverageRating = 2)) {
    return "Okay";
  } else if ((AverageRating = 3)) {
    return "Average";
  } else {
    return "Great";
  }
};
const stars = (AverageRating) => {
  if (AverageRating <= 1) {
    return "★☆☆☆☆";
  } else if ((AverageRating = 2)) {
    return "★★☆☆☆";
  } else if ((AverageRating = 3)) {
    return "★★★☆☆";
  } else if ((AverageRating = 4)) {
    return "★★★★☆";
  } else {
    return "★★★★★";
  }
};

const ReviewSummary = () => {
  return (
    <div className="review-summary__container">
      <h2 className="review-summary__title">Reviews</h2>
      <p>{ratingSummary.overrallCustomerPercpective}</p>
      <div className="review-summary__rating__container">
        <div>
          <div className="review-summary__rating-value">
            {grade(ratingSummary.averageRating)} {ratingSummary.averageRating}
          </div>
          <div className="review-summary__rating-stars">
            {stars(ratingSummary.averageRating)}
          </div>
          <div className="review-summary__total-reviews">
            {ratingSummary.totalReviews} reviews
          </div>
        </div>

        <div className="review-summary-horizontal-line">
      
        </div>

        <div className="review-summary__distribution">
          {Object.keys(ratingSummary.ratingDistribution).map((rating) => (
            <div key={rating} className="review-summary__distribution-row">
              <span className="review-summary__rating">{rating} ★</span>
              <div className="review-summary__bar-container">
                <div
                  className="review-summary__bar"
                  style={{
                    width: `${ratingSummary.ratingDistribution[rating]}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="review-summary__rating-overall">
       
        <div className="review-summary__total-reviews">
          {ratingSummary.totalReviews} reviews
        </div>
      </div> */}

      <div className="review-summary__mentions">
        <p>Read reviews that mention:</p>
        {Object.entries(ratingSummary.mentions).map(([mention, count]) => (
          <span key={mention} className="review-summary__mention">
            {mention} ({count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
