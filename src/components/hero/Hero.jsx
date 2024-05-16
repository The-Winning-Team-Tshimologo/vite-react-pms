import React from "react";
import "./Hero.css";
import Foto from "../../assets/pms-logo.png";
import heroImage from "../../assets/cover.jpg";
import { useNavigate } from "react-router";

function Hero() {
  const navigate = useNavigate();
  return (
		<>
			<div
				id='hero'
				className='hero'
			>
				<div className='hero__container'>
					<div className='hero__content'>
						<div className='hero__message'>
							<h2>Welcome to PMS Property Maintenance Service!</h2>{" "}
							<h3>
								Your Home, Expertly Maintained From emergency repairs to regular
								upkeep, trust us to keep your property at its best. Our team of
								certified professionals is here to provide prompt, reliable
								service tailored to your needs. Get started today — Contact us
								for a free consultation and discover how we can enhance the
								comfort and value of your property.
							</h3>
						</div>
						<div className='hero__buttons'>
							<button
								className='primary-btn-login'
								onClick={() => {
									navigate("/signin");
								}}
							>
								Login
							</button>
							<button
								className='primary-btn'
								onClick={() => {
									navigate("/signup");
								}}
							>
								Sign up
							</button>
						</div>
					</div>
					<div className='image-holder'>
						<img
							src={heroImage}
							alt=''
							className='hero__image'
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Hero;
