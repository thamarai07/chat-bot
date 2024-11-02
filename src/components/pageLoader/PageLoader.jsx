import React from "react";
import loader from "../../assets/loader.gif";
import "./PageLoader.scss";
import WarningMsg from "../warningMsg/WarningMsg";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Paper } from "@mui/material";
import styled from "styled-components";
import { Backdrop } from "@mui/material";

export const PageLoader = (props) => {
	if (props.error) {
		return <WarningMsg message="Sorry, there was a problem loading the page" />;
	}
	return (
		<div className="modal-wrapper">
			<div className="modal-backdrop">
				<div className="modal fade show" tabIndex="-1" role="dialog">
					<div className="loader">
						<img src={loader} alt="loading" />
					</div>
				</div>
			</div>
		</div>
	);
};

export const CircularLoader = ({ containerHeight }) => {
	return (
		<Box
			sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<StyledPaper containerheight={containerHeight} sx={{ display: "flex" }}>
				<CircularProgress />
			</StyledPaper>
		</Box>
	);
};

const StyledPaper = styled(Paper)`
	min-height: ${(props) => props.containerheight || "20rem"};
	width: 100%;
	align-items: center;
	place-content: center;
`;

export const BackdropLoader = ({ open }) => {
	return (
		<Backdrop
			sx={{
				color: "#fff",
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default CircularLoader;
