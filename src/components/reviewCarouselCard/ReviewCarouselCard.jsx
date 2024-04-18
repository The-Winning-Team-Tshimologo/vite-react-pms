import React, { useState } from "react";
import "./ReviewCarouselCard.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import "./ReviewCarouselCard.css";

// Mock data simulating retrieved data
const reviewData = [
  {
    userName: "Tim",
    userImage: "/src/assets/Ellipse25.png",
    rating: 3,
    date: "20 Apr 2024",
    title: "Geyser leakage",
    content:
      "I recently faced a geyser leakage issue at home and logged a plumbing service for help on the app. Their swift response and professional approach were impressive. The technician quickly identified and fixed the problem, ensuring a tidy workspace. They also provided valuable maintenance tips. The service was reasonably priced, and overall, it was a positive experience. I highly recommend their efficient and reliable plumbing services.",
    helpfulCount: 2,
  },
  {
    userName: "Jim",
    userImage: "/src/assets/Ellipse23.png",
    rating: 4,
    date: "1 May 2024",
    title: "Electrical Issue",
    content:
      "I recently faced an electrical issue with my stove at home and requested help from a service provider. He's swift response and professional approach were impressive. The technician quickly identified and fixed the problem, ensuring a tidy workspace. They also provided valuable maintenance tips.",
    helpfulCount: 2,
  },
  {
    userName: "Bill",
    userImage: "/src/assets/Ellipse24.png",
    rating: 4.5,
    date: "15 Jan 2024",
    title: "Geyser leakage",
    content:
      "I recently faced a geyser leakage issue at home and called a plumbing service for help.",
    helpfulCount: 4,
  },
];

const ReviewCarouselCard = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const [helpful, setHelpful] = useState(false);

  // const handleHelpfulClick = () => {
  //   // This would typically trigger a backend update to increment the helpful count
  //   setHelpful(true);
  // };

  // Helper function to convert rating to stars
  const renderStars = (rating) => {
    const fullStars = "★  ".repeat(Math.floor(rating));
    const halfStar = rating % 1 >= 0.5 ? "☆" : "";
    const emptyStars = "☆".repeat(5 - Math.ceil(rating));
    return fullStars + emptyStars + halfStar;
  };

  return (
    <div className="carousel__container">
      <Carousel className="carousel__container" setApi={setApi}>
        <CarouselContent>
          {reviewData.map((review, index) => (
            <CarouselItem key={index} className="basis-1/2">
              <div className="carousel__review-card">
                <div className="carousel__review-header">
                  <div className="carousel__review-header-left">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="carousel__user-image"
                    />
                    <h3 className="carousel__user-name">{review.userName}</h3>
                    <div className="carousel-vertical__divider"></div>
                    <div className="flex flex-row align-middle gap-4">
                      <div className="carousel__rating">
                        {renderStars(review.rating)}
                      </div>
                      <p>{review.rating}</p>
                    </div>
                  </div>
                  <div className="carousel__date">{review.date}</div>
                </div>
                <h4 className="carousel__title">{review.title}</h4>
                <p className="carousel__content">{review.content}</p>
                <div className="carousel-horizontal__divider"></div>
                <div className="carousel__footer">
                  <h3>Was this helpful?</h3>
                  <div className="carousel__footer-btns">
                    <button className="carousel__footer-btn">
                      <img src="/src/assets/smiley_11768538.png" alt="yes" /> <p>Yes</p>
                    </button>

                    <button className="carousel__footer-btn">
                      <img src="/src/assets/sad_11768469.png" alt="no" /> <p>No</p>
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-previous__btn" />
        <CarouselNext className="carousel-next__btn" />
      </Carousel>
      <div className="py-2 text-center text-sm ">
        Slide {current} of {reviewData.length}
      </div>
    </div>
  );
};

export default ReviewCarouselCard;
