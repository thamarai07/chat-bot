import { AppBar, CssBaseline, Typography, IconButton } from "@mui/material";
import { Menu, AccountCircle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/nts-logo.png";
// import Image from "../image";
import Logo from "./Logo";
import styled from "styled-components";
import "./Navbar.scss";
import Popover from "../popover/Popover";
import { MyAccountMenu } from "../myAccountMenu/MyAccountMenu";
import { SnackBarWithInfoAlert } from "components/infoComponents/ToastMessage";
import { palette } from "core/theme";
import Sidebar from "./Sidebar";
import { Hidden } from "@mui/material";
import { getDocData } from "databaseConfig/dbConfig";
import { STATICTEXT, staticDataDoc } from "constants/dbConstants";

function Navbar() {
	const filtersAnchorEl = React.useRef(null);
	const [open, setOpen] = React.useState(false);
	const [openMyAccountMenu, setMyAccountMenu] = React.useState(false);
	const [infoMessageOpen, setInfoMessageOpen] = React.useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const [staticText, setStaticText] = useState({});

	useEffect(() => {
		getDocData(STATICTEXT, staticDataDoc).then((resp) => {
			setStaticText(resp);
		});
	}, []);
	return (
		<>
			<SnackBarWithInfoAlert
				open={infoMessageOpen}
				alertSeverity={"success"}
				alertMessage={"You have logged out successfully"}
				handleClose={() => {
					setInfoMessageOpen(false);
				}}
			/>
			<div className="nav-bar-container">
				<StyledAppBar position="static" className="app-bar" location={location}>
					<CssBaseline />
					<div className="navbar">
						<Logo navigate={navigate} />
						<Hidden smDown>
							<div className="marquee-container">
								<marquee className="marquee-text">
									{staticText.welcomeText}
								</marquee>
							</div>
						</Hidden>
						<ul className="navbar-menu flexWrap">
							<Hidden mdDown>
								<li>
									<Typography
										variant={"body1"}
										className="pointer"
										style={{ padding: "0.5em", color: "white" }}
										onClick={() => navigate("/contact-us")}
									>
										Contact US
									</Typography>
								</li>
								<li>
									<Typography
										variant={"body1"}
										className="pointer"
										style={{ padding: "0.5rem", color: "white" }}
										onClick={() => navigate("/blogs")}
									>
										Blogs
									</Typography>
								</li>
								<li>
									<Typography
										variant={"body1"}
										className="pointer"
										style={{ padding: "0.5rem", color: "white" }}
										onClick={() => navigate("/gallery")}
									>
										Gallery
									</Typography>
								</li>
							</Hidden>
							<li>
								<IconButton
									aria-label="open drawer"
									edge="end"
									style={{ color: "white" }}
									size="large"
								>
									<Menu onClick={() => setOpen(!open)} />
								</IconButton>
							</li>
							<li className="userProfile">
								<IconButton
									ref={filtersAnchorEl}
									style={{ color: "white" }}
									onClick={() => setMyAccountMenu(!openMyAccountMenu)}
									size="large"
								>
									<AccountCircle />
								</IconButton>
								<div className="popoverContainer">
									<Popover
										open={openMyAccountMenu}
										anchorEl={filtersAnchorEl}
										render={
											<MyAccountMenu
												setOpen={setMyAccountMenu}
												onSignOut={() => setInfoMessageOpen(true)}
											></MyAccountMenu>
										}
										updateOpen={setMyAccountMenu}
									/>
								</div>
							</li>
						</ul>
					</div>
					<Hidden smUp>
						<div className="marquee-container">
							<marquee className="marquee-text">
								{staticText.welcomeText}
							</marquee>
						</div>
					</Hidden>
				</StyledAppBar>
				<Sidebar setOpen={setOpen} open={open} />
			</div>
		</>
	);
}

const StyledAppBar = styled(AppBar)`
	width: 100%;
	background: ${(props) => getAppBackground(props)};
	color: ${(props) => (props.color ? props.color : palette.white)};
`;

const getAppBackground = ({ location }) => {
	const pathname = location.pathname.split("/")[1];
	const transparentAppBars = [
		// "about-us",
		// "online-training",
		// "webDevelopment",
		// "blogs",
	];
	const blackColorAppBar = ["home"];
	if (transparentAppBars.includes(pathname)) {
		return "transparent";
	}
	if (pathname === "" || blackColorAppBar.includes(pathname)) {
		return palette.blackPrimary;
	}
	return "#18232B";
};

export default Navbar;
