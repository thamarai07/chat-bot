import React from "react";
import { makeStyles } from "@mui/styles";

const usePlaceholderStyles = makeStyles((theme) => ({
	placeholder: {
		color: "#18232A",
		opacity: 0.4,
	},
}));

const Placeholder = ({ children }) => {
	const classes = usePlaceholderStyles();
	return <div className={classes.placeholder}>{children}</div>;
};

export default Placeholder;
