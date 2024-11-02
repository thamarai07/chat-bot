import { Image } from "components";
import { useEffect, useState } from "react";
import { feedbackImages } from "assets/homePage/feedbacks";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";

function ControlledCarousel({
	image,
	item,
	isActive,
	onNext,
	onPrevious,
	index,
}) {
	const slideStyle = { display: isActive ? "block" : "none" };

	return (
		<div style={slideStyle}>
			<div className={`columnFlex`} style={{ alignItems: "center" }}>
				<div className="flexWrap flexDisplay">
					<IconButton onClick={onPrevious} size="large">
						<ArrowBack />
					</IconButton>
					<div className="testimonial">
						<Image
							src={feedbackImages[index]}
							alt="student-pic"
							className="profile-image"
						/>
					</div>
					<IconButton onClick={onNext} size="large">
						<ArrowForward />
					</IconButton>
				</div>
				<div className="profile-name">{item.name}</div>
				<div className="profile-type"> {item.profile}</div>
			</div>
			<div className="feedback">{item.feedback}</div>
		</div>
	);
}

const Feedback = ({ appContent }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide(
				(prevSlide) => (prevSlide + 1) % appContent.feedbacks.length
			);
		}, 5000);

		return () => clearInterval(timer);
	}, [appContent.feedbacks]);

	return (
		<div className="componentContainer">
			<div className="componentSection">
				<div className="people-feedback-container">
					<div>
						<Typography variant="h5" className="fb-title">
							{appContent.title}
						</Typography>
					</div>
					<div className="testimonial-contianer">
						{appContent.feedbacks.map((item, index) => {
							return (
								<>
									<ControlledCarousel
										image={item.image}
										item={item}
										isActive={index === currentSlide}
										index={index}
										onNext={() => {
											setCurrentSlide(
												(currentSlide + 1) % appContent.feedbacks.length
											);
										}}
										onPrevious={() => {
											setCurrentSlide(
												(currentSlide - 1 < 0
													? appContent.feedbacks.length - 1
													: currentSlide - 1) % appContent.feedbacks.length
											);
										}}
									/>
								</>
							);
						})}
					</div>
				</div>
				{/* </div> */}
			</div>
		</div>
	);
};

export default Feedback;
