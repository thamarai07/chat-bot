import React from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./Input.scss";

const useStyles = makeStyles({
	underline: {
		"&&&:before": {
			borderBottom: "none",
		},
		"&&:after": {
			borderBottom: "none",
		},
		"&:hover:before": {
			borderBottom: ["none", "!important"],
		},
	},
});

const Input = (props) => {
	const {
		className,
		placeholder,
		id,
		onChange,
		value,
		type,
		InputProps,
		...restProps
	} = props;
	const classes = useStyles();
	const customInputProps = InputProps || { classes };
	return (
		<TextField
			className={className}
			placeholder={placeholder}
			InputProps={customInputProps}
			onChange={onChange}
			value={value}
			type={type}
			{...restProps}
		/>
	);
};

export default Input;
