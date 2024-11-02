import { StyledImageContainer } from "./TileView";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React from "react";

export const MobileSlider = ({ tiles }) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prevSlide) => (prevSlide + 1) % tiles.length);
		}, 7000);

		return () => clearInterval(timer);
	}, [tiles]);

	return (
		<>
			<div className="tile-container fullWidth">
				{tiles.map((item, index) => {
					return (
						<ControlledCarousel
							image={item.image}
							item={item}
							isActive={index === currentSlide}
							index={index}
							onNext={() => {
								setCurrentSlide((currentSlide + 1) % tiles.length);
							}}
							onPrevious={() => {
								setCurrentSlide(
									(currentSlide - 1 < 0 ? tiles.length - 1 : currentSlide - 1) %
										tiles.length
								);
							}}
						/>
					);
				})}
			</div>
		</>
	);
};

function ControlledCarousel({
	image,
	item,
	isActive,
	onNext,
	onPrevious,
	index,
}) {
	const slideStyle = { display: isActive ? "block" : "none", width: "100%" };
	const navigate = useNavigate();

	return (
		<div style={slideStyle}>
			<div className={`columnFlex`}>
				<div className="flexWrap flexDisplay">
					<IconButton
						onClick={onPrevious}
						className="mobile-arrow-icon"
						size="large"
					>
						<ArrowBack />
					</IconButton>
					<div
						className="hoverOverEffect pointer"
						style={{ width: "100%" }}
						onClick={() => navigate(item.url)}
					>
						<StyledImageContainer
							srcUrl={item.image}
							index={index}
							className={`tile-fit`}
						/>
						<div className="overlay"></div>
						<div className="mobile-footer-tileName">
							<Typography variant="h3" className="tile-footer-text h3">
								{item.label}
							</Typography>
						</div>
					</div>
					<IconButton
						onClick={onNext}
						className="mobile-arrow-icon"
						style={{ right: 0 }}
						size="large"
					>
						<ArrowForward />
					</IconButton>
				</div>
			</div>
		</div>
	);
}

export default MobileSlider;
