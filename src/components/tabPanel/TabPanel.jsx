import React from "react";
import { Box } from "@mui/material";

const TabPanel = (props) => {
	const { children, value, index, ...restProps } = props;
	const shouldShowChildren = value === index;
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...restProps}
		>
			{shouldShowChildren && <Box>{children}</Box>}
		</div>
	);
};

export default TabPanel;
