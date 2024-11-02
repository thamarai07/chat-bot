import { Typography } from "@mui/material";
import React from "react";

export const IncludesPage = (props) => {
	console.log("Check the Includes Props : ", props);
	const includesData = props.courseData.includes;
	return props.courseData && props.courseData.includes ? (
		<>
			<div className="includes-container">
				<div
					className="youtube-content-demo margin1"
					style={{ margin: "1rem" }}
				>
					<Typography variant="h6">Demo Youtube Video</Typography>
					<iframe
						width="560"
						height="315"
						src={`https://www.youtube.com/embed/${
							includesData.videoId || includesData.youtubeLink
						}`}
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</div>
				{includesData.contentPdfLink && (
					<div className="pdf-content-demo margin1">
						<Typography variant="h6">Course Contents</Typography>
						<iframe
							src={includesData.contentPdfLink}
							width="600"
							height="400"
							title="PDF Content"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						/>
					</div>
				)}
			</div>
		</>
	) : (
		<>
			<Typography variant="h6" align="center">
				No Includes Found..
			</Typography>
		</>
	);
};

export default IncludesPage;
