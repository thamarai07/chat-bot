import React from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/lab/Alert";

const CustomisedAlert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

export const SnackBarWithInfoAlert = ({
	handleClose,
	open,
	autoHideDuration = 6000,
	snackbarMessage = "",
	position = {
		vertical: "top",
		horizontal: "center",
	},
	key = "snackBar-alert",
	id,
	action = null,
	alertSeverity,
	alertMessage,
	alertAction = null,
	alertStyle,
	alertProps,
	...rest
}) => {
	return (
		<>
			<Snackbar
				anchorOrigin={position}
				open={open}
				autoHideDuration={autoHideDuration}
				onClose={handleClose}
				message={snackbarMessage}
				key={key}
				id={id}
				action={action}
				{...rest}
			>
				<div>
					<AlertInfo
						alertMessage={alertMessage}
						alertSeverity={alertSeverity}
						handleClose={handleClose}
						alertAction={alertAction}
						alertStyle={alertStyle}
						{...alertProps}
					/>
				</div>
			</Snackbar>
		</>
	);
};

export const SnackBar = ({
	handleClose,
	open,
	autoHideDuration = 6000,
	snackbarMessage = "",
	position = {
		vertical: "top",
		horizontal: "center",
	},
	key = "snackBar-alert",
	id,
	action = null,
	...rest
}) => {
	return (
		<>
			<Snackbar
				anchorOrigin={position}
				open={open}
				autoHideDuration={autoHideDuration}
				onClose={handleClose}
				message={snackbarMessage}
				key={key}
				id={id}
				action={action}
				{...rest}
			>
				<div>{snackbarMessage}</div>
			</Snackbar>
		</>
	);
};

export const AlertInfo = ({
	handleClose,
	alertAction,
	alertMessage,
	alertSeverity,
	alertStyle,
	...rest
}) => {
	return (
		<>
			<CustomisedAlert
				action={alertAction}
				onClose={handleClose}
				severity={alertSeverity}
				sx={alertStyle}
				{...rest}
			>
				{alertMessage}
			</CustomisedAlert>
		</>
	);
};
