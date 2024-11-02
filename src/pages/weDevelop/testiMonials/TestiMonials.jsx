import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import webDevelopment from "../../../assets/webDevelopment/testimonial1.png";
import { Image } from "../../../components";
import "./TestiMonials.scss";

function ControlledCarousel() {
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			<Carousel.Item>
				<div className="testimonial-contianer">
					<div className="testimonial">
						<div className="img">
							<Image src={webDevelopment} width={"490px"} height={"282px"} />
						</div>
						<div className="text-container">
							<div className="title">Title goes here</div>
							<div className="description">
								"I'm highly impressed with the quality of service provided by
								Nybble TechnoSoft. They delivered my website and mobile app in
								no time and with utmost care. Highly recommended!"
							</div>
						</div>
					</div>
				</div>
			</Carousel.Item>
		</Carousel>
	);
}

const TestiMonials = () => {
	return (
		<div className="testimonials-container">
			<div className="title">Testimonials</div>
			<ControlledCarousel />
		</div>
	);
};

export default TestiMonials;
