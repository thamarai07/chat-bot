import React from "react";
import { Typography } from "@mui/material";

const Overview = ({ appContent }) => {
	return (
		<div className="componentContainerDark">
			<div className="componentSection columnFlex">
				<div variant={"h6"} className="h3 gradientText aboutUs-title">
					{appContent.title}
				</div>
				<Typography variant={"body1"} className="about-us-description">
					{appContent.para1}
				</Typography>
			</div>
		</div>
	);
};

export default Overview;
