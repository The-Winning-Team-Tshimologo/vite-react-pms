import React from 'react';
import Vector9 from '../../assets/Vector9.svg';
import './Testimonial.css'; // Import your CSS file for styling

const Testimonial = () => {
    return (
        <div className="landing-page-inner">
            <div className="testimonials-wrapper">
                <h1 className="testimonials">Testimonials</h1>
            </div>
            <div className="frame-parent">
                <div className="frame-group">
                    <TestimonialCard />
                    <TestimonialCard />
                    <TestimonialCard />
                </div>
            </div>
        </div>
    );
};

const TestimonialCard = () => {
    return (
        <div className="vector-parent">
            <div className="frame-child">
                <img className="vector-image" loading="lazy" alt="" src={Vector9} />
                <div className="super-cool-app-container">
                    <p className="super-cool-app">Super Cool App</p>
                    <p className="super-cool-app-description">
                        Very convenient and easy to use. I love it!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
