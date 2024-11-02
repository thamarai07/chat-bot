import React from "react";
import { BreadCrumb } from "../../../components";
import Cover from "../../../components/cover/cover";
import { Typography } from "@mui/material";

const AboutCover = () => {
	return (
		<>
			<Cover className={"about-us"} />
			<div className="about-us-cover-container">
				<BreadCrumb />
				<Typography variant="h6" className="title">
					About Us
				</Typography>
			</div>
		</>
	);
};

export default AboutCover;
