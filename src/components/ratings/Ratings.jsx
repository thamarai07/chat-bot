import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { identity } from "utils/appUtils";
import Rating from "@mui/material/Rating";
import "./Ratings.scss";

const Ratings = (props) => {
	const {
		ratingValue,
		onRatingChange = identity,
		showLabel,
		emptyStarClassName,
		className,
		precision = 1,
		totalRatings,
		name,
		...restProps
	} = props;
	return (
		<div className="d-inline-flex">
			<Rating
				name={name}
				value={ratingValue}
				precision={precision}
				onChange={onRatingChange}
				emptyIcon={
					<StarBorderIcon
						fontSize="inherit"
						className={`empty-star ${emptyStarClassName}`}
					/>
				}
				className={`ratings ${className}`}
				{...restProps}
			/>
			{showLabel && <span className="rating-count">{ratingValue}</span>}
			<span className="total-ratings">{totalRatings || 13} Ratings</span>
		</div>
	);
};

export default Ratings;
