import React, { useState } from "react";
import { identity } from "utils/appUtils";
import downIcon from "../../assets/downIcon.svg";
import Image from "../image";
import "./ShowMore.scss";

const ShowMore = (props) => {
	const { component = identity, key, min, type, data = [], ...rest } = props;
	const [showMore, setShowMore] = useState(false);
	console.log("Show More : ", data);
	return (
		<>
			{showMore ? (
				data.map((item, index) => component(item, index))
			) : (
				<div className={`show-more-false-container-${type}`}>
					{data.map((item, index) => component(item, index))}
				</div>
			)}
			<div className="show-more-container">
				<div
					className={`show-more-link ${rest["className"]}`}
					onClick={() => setShowMore(!showMore)}
				>
					{showMore ? "Show less" : "Show more"}
				</div>
				<Image
					src={downIcon}
					width={13}
					height={7}
					className={showMore ? "imageUp" : " "}
				/>
			</div>
		</>
	);
};
export default ShowMore;
