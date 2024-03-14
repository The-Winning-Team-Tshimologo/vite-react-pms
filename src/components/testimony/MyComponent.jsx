// MyComponent.js
import React from 'react';
import Testimonial from './Testimonial';
import dummyTestimonialData from './dummyData';
import './Testimonial.css'

const MyComponent = () => {
    return (
        <div className="my-component-container">
            {dummyTestimonialData.map((testimonialData, index) => (
                <Testimonial
                    key={index}
                    testimonial={testimonialData.testimonial}
                    imageSrc={testimonialData.imageSrc}
                    tooltipText={testimonialData.tooltipText}
                />
            ))}
        </div>
    );
};

export default MyComponent;
