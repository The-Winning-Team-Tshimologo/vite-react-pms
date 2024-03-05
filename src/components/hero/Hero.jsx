import React from "react"
import "./Hero.css"
import Foto from "../../assets/logo.png"
import heroImage from "../../assets/cover.jpg"

function Hero(){
    return(
        <section className="frame-currents-pipes-vibes">
            <img
                className="property-management-system-hig-icon"
                loading="lazy"
                alt=""
                src={Foto}
            />
            <div className="frame-div">
                <div className="frame-parent1">
                    <div className="vector-quote-marker-parent">
                        <div className="vector-quote-marker">
                            <h1 className="currents-pipes-vibes-container">
                                <p className="currents-pipes-vibes">{`Currents, Pipes, Vibes, and Heights – `}</p>
                                <p className="weve-got-your">
                                    We've Got Your Space Wired Right
                                </p>
                            </h1>
                            <div className="logo-frame">
                                <button className="header-text">
                                    <img
                                        className="header-text-child"
                                        alt=""
                                        src="/rectangle-100.svg"
                                    />
                                    <div className="login">Login</div>
                                </button>
                                <button className="service-facilities">
                                    <div className="service-facilities-child" />
                                    <div className="sign-up">Sign up</div>
                                </button>
                            </div>
                        </div>
                        <img
                            className="testimonials-section-icon"
                            alt=""
                            src="/vector.svg"
                        />
                    </div>
                    <img
                        className="image-1-icon"
                        loading="lazy"
                        alt=""
                        src="/image-1@2x.png"
                    />
                </div>
                <input className="vector-line" type="checkbox" />
            </div>
        </section>
    )
}


export default Hero