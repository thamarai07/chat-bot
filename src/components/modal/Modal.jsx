import React from "react";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./Modal.scss";

const styles = (theme) => {};

export const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle
			disableTypography
			classes={{ root: "modal-title" }}
			{...other}
		>
			<div className="fullWidth justifySpaceBetween">
				<Typography variant="h6" className="modal-title-text">
					{children}
				</Typography>
				{onClose ? (
					<IconButton
						aria-label="close"
						className="modal-close-button"
						onClick={onClose}
						size="large"
					>
						<CloseIcon className="modal-close-icon" />
					</IconButton>
				) : null}
			</div>
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const Modal = ({
	title,
	open,
	children,
	handleClose,
	className,
	footer,
	...restProps
}) => {
	return (
		<div className={`modal ${className}`}>
			<Dialog
				aria-labelledby="customized-dialog-title"
				open={open}
				classes={{ paper: "modal-container" }}
				onClose={handleClose}
				{...restProps}
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					{title}
				</DialogTitle>
				<DialogContent dividers className="modal-content">
					{children}
				</DialogContent>
				{footer && <div className="modal-footer">{footer}</div>}
			</Dialog>
		</div>
	);
};

export default Modal;
